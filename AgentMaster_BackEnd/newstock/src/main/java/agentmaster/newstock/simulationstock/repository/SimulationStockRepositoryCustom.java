package agentmaster.newstock.simulationstock.repository;

import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.user.entitiy.User;

import java.util.List;

public interface SimulationStockRepositoryCustom {
    List<SimulationStock> findByUser(User user);
    SimulationStock findBySimulation(Simulation simulation);
    SimulationStock findByIdFetch(Long id);
}
