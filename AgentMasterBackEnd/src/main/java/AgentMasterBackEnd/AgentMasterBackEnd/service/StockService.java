package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;


import java.util.List;

public interface StockService {
    List<Stock> provideStockByBase(Stock stock);
    List<Stock> provideStockByTopRate();
    List<Stock> provideStockByBottomRate();
    List<Stock> provideStockByTopReturn();
    List<Stock> provideStockByBottonReturn();
    List<Stock> provideStockByVolume();
    List<Stock> provideStockByChartData(Stock stock);
    List<Stock> provideStockByMoreInfo(Stock stock);

    void parsingStockData();

}
