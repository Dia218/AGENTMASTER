package agentmaster.newstock.simulationstock.repository;

import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.user.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationStockRepository extends JpaRepository<SimulationStock, Long>, SimulationStockRepositoryCustom {

    SimulationStock findByUserAndStockCode(User user, String stockCode);
    boolean existsByUserAndStockCode(User user, String stockCode);
}
