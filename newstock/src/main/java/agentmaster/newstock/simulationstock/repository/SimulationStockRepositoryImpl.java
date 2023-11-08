package agentmaster.newstock.simulationstock.repository;

import agentmaster.newstock.simulation.entity.QSimulation;
import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.simulationstock.entity.QSimulationStock;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.user.entitiy.QUser;
import agentmaster.newstock.user.entitiy.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static agentmaster.newstock.simulationstock.entity.QSimulationStock.*;
import static agentmaster.newstock.user.entitiy.QUser.*;

@Repository
@RequiredArgsConstructor
public class SimulationStockRepositoryImpl implements SimulationStockRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SimulationStock> findByUser(User user) {
        return jpaQueryFactory.selectFrom(simulationStock)
                .leftJoin(simulationStock.user, QUser.user).fetchJoin()
                .leftJoin(simulationStock.simulation, QSimulation.simulation).fetchJoin()
                .where(simulationStock.user.eq(user))
                .fetch();
    }

    @Override
    public SimulationStock findBySimulation(Simulation simulation) {
        return jpaQueryFactory.selectFrom(simulationStock)
                .leftJoin(simulationStock.user, user).fetchJoin()
                .leftJoin(simulationStock.simulation, QSimulation.simulation).fetchJoin()
                .where(simulationStock.simulation.eq(simulation))
                .fetchOne();
    }

    @Override
    public SimulationStock findByIdFetch(Long id) {
        return jpaQueryFactory.selectFrom(simulationStock)
                .leftJoin(simulationStock.user, user).fetchJoin()
                .leftJoin(simulationStock.simulation, QSimulation.simulation).fetchJoin()
                .where(simulationStock.id.eq(id))
                .fetchOne();
    }
}
