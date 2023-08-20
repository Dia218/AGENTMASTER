package AgentMasterBackEnd.AgentMasterBackEnd.repository;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;

import java.util.List;

public interface StockRepository {
    List<Stock> findStockByBase();
    List<Stock> findStockByTopRate();
    List<Stock> findStockByBottomRate();
    List<Stock> findTopReturn();
    List<Stock> findBottomReturn();
    List<Stock> findStockByChartData();
    List<Stock> findStockByMoreInfo();

    void createStockData();

}
