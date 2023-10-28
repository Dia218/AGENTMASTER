package agentmaster.newstock.simulation.repository;

import agentmaster.newstock.simulation.entity.Simulation;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimulationRepository extends JpaRepository<Simulation, Long>, SimulationRepositoryCustom {
}
