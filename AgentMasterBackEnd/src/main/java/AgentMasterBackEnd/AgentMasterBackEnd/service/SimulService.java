package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Simul;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerAccount;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerRanking;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.StockHoldings;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.StockSameField;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.TradeRequest;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.CustomerRanker;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface SimulService {
    List<CustomerAccount> provideAccountInfo(Customer customer);


    boolean buyStock(Customer customer, TradeRequest tradeRequest);

    boolean saleStock(Customer customer, TradeRequest tradeRequest);
    void resetAccount(Customer customer);

    List<StockHoldings> provideHoldingAllStockInfo(Customer customer);

    List<StockSameField> provideSameFieldStock(Customer customer, Stock stock);

    List<StockHoldings> provideHoldingStockInfo(Customer customer, Stock stock);

    List<CustomerRanker> provideRanking();

    List<CustomerRanking> provideCustomerRankInfo(Customer customer);

}
