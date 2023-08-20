package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Simul;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface SimulService {
    List<Simul> provideAccountInfo(Customer customer);
    boolean buyStock(Customer customer,Simul simul);
    boolean saleStock(Customer customer, Simul simul);
    void resetAccount(Customer customer);

    Map<Stock, Simul> provideHoldingStockInfo(Stock stock);

    Map<Customer, Simul> provideRanking();

}
