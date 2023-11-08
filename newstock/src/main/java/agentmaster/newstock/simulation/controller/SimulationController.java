package agentmaster.newstock.simulation.controller;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.repository.StockRepository;
import agentmaster.newstock.simulation.request.OrderRequest;
import agentmaster.newstock.simulation.request.SimulationRequest;
import agentmaster.newstock.simulation.response.SimulationResponse;
import agentmaster.newstock.simulation.service.SimulationService;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/simulTrade")
public class SimulationController {
    private final UserService userService;
    private final SimulationService simulationService;
    private final StockRepository stockRepository;

    @ApiOperation("매수")
    @PostMapping("/Buy")
    @ResponseStatus(HttpStatus.OK)
    public SimulationResponse buySimulation(@RequestBody @Validated OrderRequest orderRequest) {
        SimulationRequest simulationRequest = new SimulationRequest();
        Stock stock = new Stock();

        User user = userService.getUser(orderRequest.getUserId());
        stock.setStockName(orderRequest.getStockName());
        String stockCode = stockRepository.findIdByName(stock).get(0).getStockCode();

        simulationRequest.setStockName(orderRequest.getStockName());
        simulationRequest.setPrice(orderRequest.getCurrentPrice());
        simulationRequest.setVolume(orderRequest.getAmount());
        simulationRequest.setStockCode(stockCode);
        simulationRequest.setType("buy");

        return simulationService.simulation(simulationRequest, user);
    }

    @ApiOperation("매도")
    @PostMapping("/sell")
    public SimulationResponse sellSimulation(@RequestBody @Validated OrderRequest orderRequest) {
        SimulationRequest simulationRequest = new SimulationRequest();
        Stock stock = new Stock();

        User user = userService.getUser(orderRequest.getUserId());
        stock.setStockName(orderRequest.getStockName());
        String stockCode = stockRepository.findIdByName(stock).get(0).getStockCode();

        simulationRequest.setStockName(orderRequest.getStockName());
        simulationRequest.setPrice(orderRequest.getCurrentPrice());
        simulationRequest.setVolume(orderRequest.getAmount());
        simulationRequest.setStockCode(stockCode);
        simulationRequest.setType("sell");

        return simulationService.simulation(simulationRequest, user);
    }
}
