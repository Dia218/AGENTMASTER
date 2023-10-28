package agentmaster.newstock.simulationstock.service;

import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.simulationstock.repository.SimulationStockRepository;
import agentmaster.newstock.simulationstock.response.Holdings;
import agentmaster.newstock.simulationstock.response.SimulationStockDto;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.repository.UserRepository;
import agentmaster.newstock.user.response.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SimulationStockService {

    private final SimulationStockRepository simulationStockRepository;
    private final UserRepository userRepository;

    public Holdings getSimulationStocks(User user) {
        List<SimulationStock> simulationStocks = simulationStockRepository.findByUser(user);
        BigDecimal totalTradePrice = BigDecimal.valueOf(0);

        for (SimulationStock simulationStock : simulationStocks) {
            totalTradePrice.add(new BigDecimal(simulationStock.getPrice()).multiply(BigDecimal.valueOf(simulationStock.getVolume())));
        }

        return new Holdings(new UserDto(userRepository.findByIdFetch(user.getId())),
                simulationStocks.stream()
                        .map(SimulationStockDto::new)
                        .collect(Collectors.toList()), totalTradePrice
                );
    }

    public void deleteSimulationStock(User user, String stockCode) {
        SimulationStock simulationStock = simulationStockRepository.findByUserAndStockCode(user, stockCode);
        simulationStockRepository.delete(simulationStock);
    }

    public void saveSimulationStock(Simulation simulation) {
        SimulationStock simulationStock = SimulationStock.builder()
                .stockName(simulation.getStockName())
                .stockCode(simulation.getStockCode())
                .type(simulation.getType())
                .price(simulation.getPrice())
                .volume(simulation.getVolume())
                .user(simulation.getUser())
                .simulation(simulation)
                .build();

        simulationStockRepository.save(simulationStock);
    }
}
