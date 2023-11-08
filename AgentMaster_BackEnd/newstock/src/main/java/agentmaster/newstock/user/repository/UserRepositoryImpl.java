package agentmaster.newstock.user.repository;

import agentmaster.newstock.ranking.entity.QRanking;
import agentmaster.newstock.user.entitiy.QUser;
import agentmaster.newstock.user.entitiy.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static agentmaster.newstock.ranking.entity.QRanking.*;
import static agentmaster.newstock.user.entitiy.QUser.*;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;


    @Override
    public List<User> findAllFetch() {
        return jpaQueryFactory.selectFrom(user)
                .leftJoin(user.ranking, ranking).fetchJoin()
                .fetch();
    }

    @Override
    public User findByNameFetch(String name) {
        return jpaQueryFactory.selectFrom(user)
                .leftJoin(user.ranking, ranking).fetchJoin()
                .where(user.name.eq(name))
                .fetchOne();
    }

    @Override
    public List<User> findAllFetchByRankings() {
        return jpaQueryFactory.selectFrom(user)
                .leftJoin(user.ranking, ranking).fetchJoin()
                .orderBy(user.ranking.rank.asc())
                .fetch();
    }
}
