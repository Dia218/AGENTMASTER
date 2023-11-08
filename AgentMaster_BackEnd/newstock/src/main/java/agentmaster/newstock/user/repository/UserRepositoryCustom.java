package agentmaster.newstock.user.repository;

import agentmaster.newstock.user.entitiy.User;

import java.util.List;

public interface UserRepositoryCustom {
    List<User> findAllFetch();
    User findByNameFetch(String name);
    List<User> findAllFetchByRankings();
}
