package agentmaster.newstock.simulationstock.service;

import agentmaster.newstock.ranking.service.RankingService;
import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.simulationstock.repository.SimulationStockRepository;
import agentmaster.newstock.simulationstock.response.Holdings;
import agentmaster.newstock.simulationstock.response.ResetResponse;
import agentmaster.newstock.simulationstock.response.SimulationStockDto;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.exception.UserNotFoundException;
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
    private final RankingService rankingService;

    public Holdings getSimulationStocks(User user) {
        List<SimulationStock> simulationStocks = simulationStockRepository.findByUser(user);
        BigDecimal totalTradePrice = BigDecimal.valueOf(0);
        Integer simulationStockCount = Integer.valueOf(0);

        for (SimulationStock simulationStock : simulationStocks) {
            totalTradePrice = totalTradePrice.add(new BigDecimal(simulationStock.getPrice()).multiply(BigDecimal.valueOf(simulationStock.getVolume())));
            simulationStockCount += simulationStock.getVolume().intValue();
        }

        return new Holdings(new UserDto(userRepository.findByNameFetch(user.getName())),
                simulationStocks.stream()
                        .map(SimulationStockDto::new)
                        .collect(Collectors.toList()), totalTradePrice, simulationStockCount
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

    public ResetResponse resetAccount(UserDto userDto) {
        User user = userRepository.findByNameFetch(userDto.getName());

        if (user == null) {
            throw new UserNotFoundException();
        }

        user.setAvailableAsset(BigDecimal.valueOf(100000));

        List<SimulationStock> simulationStocks = simulationStockRepository.findByUser(user);
        for (SimulationStock simulationStock : simulationStocks) {
            deleteSimulationStock(user, simulationStock.getStockCode());
        }

        rankingService.initRankings();

        userRepository.save(user);

        return new ResetResponse(user.getId());
    }
}
