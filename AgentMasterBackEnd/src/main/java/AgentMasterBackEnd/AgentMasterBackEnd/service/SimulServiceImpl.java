package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Simul;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerAccount;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerRanking;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.StockHoldings;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.BuyCheck;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.StockSameField;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.TradeCheck;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.TradeRequest;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.CustomerRanker;
import AgentMasterBackEnd.AgentMasterBackEnd.repository.SimulRepository;

import java.util.ArrayList;
import java.util.List;

public class SimulServiceImpl implements SimulService{
    SimulRepository simulRepository;

    //사용자 계좌 정보(총자산, 주식자산, 가용자산, 보유 주식 수) 반환
    @Override
    public List<CustomerAccount> provideAccountInfo(Customer customer) {
        List<CustomerAccount> result = simulRepository.findAccount(customer);
        return result;
    }


    @Override
    public boolean buyStock(Customer customer, TradeRequest tradeRequest) {
        Stock stock = new Stock();
        stock.setStockId(tradeRequest.getStockId());
        List<BuyCheck> query =simulRepository.checkTradable(customer, stock);

        TradeCheck tC = query.get(0);
        if(tC.getCustomerSimulMoney() < tradeRequest.getTradeAmount()* tradeRequest.getTradePrice()){ return false; }
        return true;

    }

    @Override
    public boolean saleStock(Customer customer, TradeRequest tradeRequest) {
        return false;
    }

    @Override
    public void resetAccount(Customer customer) {
        simulRepository.formatAccount(customer);
    }


    @Override
    public List<StockHoldings> provideHoldingAllStockInfo(Customer customer) {
        List<StockHoldings> result = new ArrayList<>();
        for(int i = 1 ; i < 5;i++){
            StockHoldings sh = new StockHoldings();
            sh.setStockName("stock"+i);
            sh.setSimulHoldingsnum(5);
            sh.setSimulRange(32.0);
            sh.setSimulReturn(602);
            sh.setStockAveragePrice(400);
            result.add(sh);
        }
        return result;
    }

    @Override
    public List<StockSameField> provideSameFieldStock(Customer customer, Stock stock) {
        List<StockSameField> result = new ArrayList<>();
        for(int i = 0 ; i<4;i++){
            StockSameField ssf = new StockSameField();
            ssf.setStockName("Name"+(i+1));
            ssf.setSimulReturn(1000);
            ssf.setStockPrice(10000);
            ssf.setSimulRate(23.2);
            result.add(ssf);
        }
        return result;
    }

    @Override
    public List<StockHoldings> provideHoldingStockInfo(Customer customer, Stock stock) {
        List<StockHoldings> result = new ArrayList<>();
        StockHoldings sH = new StockHoldings();
        sH.setStockName("Name");
        sH.setStockAveragePrice(5000);
        sH.setSimulReturn(100);
        sH.setSimulRange(10.0);
        sH.setSimulHoldingsnum(5);
        result.add(sH);
        return result;
    }

    @Override
    public List<CustomerRanker> provideRanking() {
        List<CustomerRanker> result = new ArrayList<>();
        for(int i = 0 ; i<10;i++){
            CustomerRanker cR = new CustomerRanker();
            cR.setRank(i+1);
            cR.setCustomerId(String.valueOf(i+1000));
            cR.setRankRankge(50-i);
            result.add(cR);
        }
        return result;
    }

    @Override
    public List<CustomerRanking> provideCustomerRankInfo(Customer customer) {
        List<CustomerRanking> result = simulRepository.;
        CustomerRanking cR = new CustomerRanking();
        cR.setCustomerId("ID");
        cR.setCustomerRank("23");
        cR.setCustomerRankRange(40.0);
        result.add(cR);
        return result;
    }
}
