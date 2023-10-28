package agentmaster.newstock.user.repository;

import agentmaster.newstock.user.entitiy.User;

import java.util.List;

public interface UserRepositoryCustom {
    List<User> findAllFetch();
    User findByIdFetch(Long id);
    List<User> findAllFetchByRankings();
}
