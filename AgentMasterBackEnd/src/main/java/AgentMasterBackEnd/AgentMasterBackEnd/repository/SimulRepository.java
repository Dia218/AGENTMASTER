package AgentMasterBackEnd.AgentMasterBackEnd.repository;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Simul;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;

import java.util.List;

public interface SimulRepository {

    List<Simul> findAccount(Customer customer);

    void updateSimul(Stock stock ,Simul simul);
    void deleteSimul(Simul simul);
    void createSimul(Simul simul);

    void formatAccount(Customer customer);

    List<Simul> findHoldStock();

}
