package agentmaster.newstock.simulationstock.controller;

import agentmaster.newstock.dto.simulPage.simulMain.StockHoldingData;
import agentmaster.newstock.simulationstock.response.Holdings;
import agentmaster.newstock.simulationstock.service.SimulationStockService;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.response.UserDto;
import agentmaster.newstock.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class SimulationStockController {
    private final UserService userService;
    private final SimulationStockService simulationStockService;

    @ApiOperation("회원 계좌 정보 조회")
    @GetMapping("/AccountInfo")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> getUserAccount(@RequestParam("userName") String userName) {

        User user = userService.getUser(userName);

        Map<String, Object> result = new HashMap<>();
        List<Holdings> resultin = new ArrayList<>();

        resultin.add(simulationStockService.getSimulationStocks(user));
        result.put("AccountInfo", resultin);
        return result;
    }

    @ApiOperation("회원 보유 주식 정보 조회")
    @GetMapping("/getHoldingInfo")
    public Map<String, Object> holdingStockInfo(@RequestParam("userName") String userName) {
        User user = userService.getUser(userName);

        Map<String, Object> result = new HashMap<>();
        List<Holdings> resultin = new ArrayList<>();

        resultin.add(simulationStockService.getSimulationStocks(user));
        result.put("HoldingInfo", resultin);
        return result;
    }

    @ApiOperation("회원  특정 보유 주식 정보 조회")
    @GetMapping("/simulTrade/stockInvestInput")
    public Map<String, Object> holdingStockInfo(@RequestParam("userId") String userName,@RequestParam("keyword") String keyword) {
        User user = userService.getUser(userName);
        Map<String, Object> result = new HashMap<>();
        List<Holdings> resultin = new ArrayList<>();

        resultin.add(simulationStockService.getSimulationStocks(user));
        StockHoldingData stockHoldingData;
        for(int i = 0; i<resultin.get(0).getSimulationStocks().size();i++){
            if(resultin.get(0).getSimulationStocks().get(i).getStockName().equals(keyword)){
                stockHoldingData = StockHoldingData.builder()
                        .simulHoldingsum(resultin.get(0).getSimulationStocks().get(i).getVolume())
                        .AvailableAsset(resultin.get(0).getUser().get(0).getAvailableAsset().intValue())
                        .PurchasePrice((Double.valueOf(resultin.get(0).getSimulationStocks().get(i).getPrice()) * Double.valueOf(resultin.get(0).getSimulationStocks().get(i).getVolume()) ))
                        .simulRange(0.0)
                        .stockAveragePrice(Double.valueOf(resultin.get(0).getSimulationStocks().get(i).getPrice()))
                        .simulReturn(Double.valueOf(resultin.get(0).getSimulationStocks().get(i).getPrice()))
                        .build();
            }
            else{
                stockHoldingData = StockHoldingData.builder()
                        .AvailableAsset(resultin.get(0).getUser().get(0).getAvailableAsset().intValue())
                        .simulHoldingsum(0.0)
                        .build();
            }
            result.put("StockHodingData", stockHoldingData);
        }
        return result;
    }
}
