package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.StockDetail;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.ChartData;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.StockBase;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.KeywordStock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.StockRanking;


import java.util.List;

public interface StockService {
    List<StockBase> provideStockByBase(Stock stock);
    List<StockRanking> provideStockByTopRate();
    List<StockRanking> provideStockByBottomRate();
    List<StockRanking> provideStockByTopReturn();
    List<StockRanking> provideStockByBottonReturn();
    List<StockRanking> provideStockByVolume();
    List<ChartData> provideStockByChartData(Stock stock);
    List<StockDetail> provideStockByMoreInfo(Stock stock);

    List<KeywordStock> provideSearchStock(Stock stock);
    void parsingStockData();

}
