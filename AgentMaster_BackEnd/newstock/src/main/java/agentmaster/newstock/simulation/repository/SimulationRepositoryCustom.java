package agentmaster.newstock.simulation.repository;

import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.user.entitiy.User;

import java.util.List;

public interface SimulationRepositoryCustom {
    Simulation findByIdFetch(Long simulationId);
    List<Simulation> findByUserAndStatus(User user, String status);
}
