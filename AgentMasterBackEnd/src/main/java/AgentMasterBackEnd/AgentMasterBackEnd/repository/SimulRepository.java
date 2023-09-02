package AgentMasterBackEnd.AgentMasterBackEnd.repository;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Simul;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerAccount;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.TradeCheck;

import java.util.List;

public interface SimulRepository {

    List<CustomerAccount> findAccount(Customer customer);

    List<Simul> findHoldStock();

    List<TradeCheck> checkTradable(Customer customer, Stock stock);
    void updateSimul(Stock stock ,Simul simul);
    void deleteSimul(Simul simul);
    void createSimul(Simul simul);

    void formatAccount(Customer customer);


}
