package agentmaster.newstock.user.repository;

import agentmaster.newstock.user.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    User findByName(String name);
    Boolean existByName(String name);
}
