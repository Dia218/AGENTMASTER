package agentmaster.newstock.simulation.repository;

import agentmaster.newstock.simulation.entity.QSimulation;
import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.user.entitiy.QUser;
import agentmaster.newstock.user.entitiy.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static agentmaster.newstock.simulation.entity.QSimulation.*;
import static agentmaster.newstock.user.entitiy.QUser.*;

@Repository
@RequiredArgsConstructor
public class SimulationRepositoryImpl implements SimulationRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Simulation findByIdFetch(Long simulationId) {
        return jpaQueryFactory.selectFrom(simulation)
                .leftJoin(simulation.user, user).fetchJoin()
                .where(simulation.id.eq(simulationId))
                .fetchOne();
    }

    @Override
    public List<Simulation> findByUserAndStatus(User user, String status) {
        return jpaQueryFactory.selectFrom(simulation)
                .where(simulation.user.eq(user), simulation.status.eq(status))
                .fetch();
    }
}
