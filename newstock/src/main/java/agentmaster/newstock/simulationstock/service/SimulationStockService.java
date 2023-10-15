package agentmaster.newstock.simulationstock.service;

import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.simulationstock.repository.SimulationStockRepository;
import agentmaster.newstock.user.entitiy.User;
import agentmaster.newstock.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class SimulationStockService {

    private final SimulationStockRepository simulationStockRepository;
    private final UserRepository userRepository;

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
