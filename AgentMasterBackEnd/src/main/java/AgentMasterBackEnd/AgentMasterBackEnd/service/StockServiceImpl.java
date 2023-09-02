package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.StockDetail;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.ChartData;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.StockBase;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.KeywordStock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.StockRanking;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;

public class StockServiceImpl implements StockService{

    @Override
    public List<StockBase> provideStockByBase(Stock stock) {
        List<StockBase> result = new ArrayList<>();
        StockBase sb = new StockBase();
        sb.setStockDiff(1000);
        sb.setStockStartPrice(3000);
        sb.setStockTradingAmount(123142);
        sb.setStockhighPrice(4200);
        sb.setStocklowPrice(2900);
        sb.setStockTradingTotalPrice(2112212);
        result.add(sb);
        return result;
    }

    @Override
    public List<StockRanking> provideStockByTopRate() {
        List<StockRanking> stockRankings = new ArrayList<>();
        for(int i = 0; i<10;i++){
            StockRanking sR = new StockRanking();
            sR.setStockId("TopRatestock"+(i+1));
            sR.setStockName("TopRateStockname"+(i+1));
            sR.setStockPrice(10000);
            sR.setStockDiff(1000);
            sR.setStockField("Field");
            sR.setStockRange(10.0);
            stockRankings.add(sR);
        }
        return stockRankings;
    }

    @Override
    public List<StockRanking> provideStockByBottomRate() {
        List<StockRanking> stockRankings = new ArrayList<>();
        for(int i = 0; i<10;i++){
            StockRanking sR = new StockRanking();
            sR.setStockId("BottomRatestock"+(i+1));
            sR.setStockName("BottomRateStockname"+(i+1));
            sR.setStockPrice(10000);
            sR.setStockDiff(1000);
            sR.setStockField("Field");
            sR.setStockRange(10.0);
            stockRankings.add(sR);
        }
        return stockRankings;
    }

    @Override
    public List<StockRanking> provideStockByTopReturn() {
        List<StockRanking> stockRankings = new ArrayList<>();
        for(int i = 0; i<10;i++){
            StockRanking sR = new StockRanking();
            sR.setStockId("TopReturnStock"+(i+1));
            sR.setStockName("TopReturnStockname"+(i+1));
            sR.setStockPrice(10000);
            sR.setStockDiff(1000);
            sR.setStockField("Field");
            sR.setStockRange(10.0);
            stockRankings.add(sR);
        }
        return stockRankings;
    }

    @Override
    public List<StockRanking> provideStockByBottonReturn() {
        List<StockRanking> stockRankings = new ArrayList<>();
        for(int i = 0; i<10;i++){
            StockRanking sR = new StockRanking();
            sR.setStockId("BottomReturnstock"+(i+1));
            sR.setStockName("BottomReturnStockname"+(i+1));
            sR.setStockPrice(10000);
            sR.setStockDiff(1000);
            sR.setStockField("Field");
            sR.setStockRange(10.0);
            stockRankings.add(sR);
        }
        return stockRankings;
    }

    @Override
    public List<StockRanking> provideStockByVolume() {
        List<StockRanking> stockRankings = new ArrayList<>();
        for(int i = 0; i<10;i++){
            StockRanking sR = new StockRanking();
            sR.setStockId("Volumestock"+(i+1));
            sR.setStockName("VolumeStockname"+(i+1));
            sR.setStockPrice(10000);
            sR.setStockDiff(1000);
            sR.setStockField("Field");
            sR.setStockRange(10.0);
            stockRankings.add(sR);
        }
        return stockRankings;
    }

    @Override
    public List<ChartData> provideStockByChartData(Stock stock) {
        List<ChartData> ChartDatas = new ArrayList<>();
        for(int i = 1 ; i<11;i++){
            ChartData cd = new ChartData();
            cd.setStockName("name"+i);
            cd.setStockDate("2023-08-"+(i+9));
            cd.setStockId("stockId"+i);
            cd.setStockField("field");
            cd.setStockRange(5.0);
            cd.setStockPrice(10000+i*1000);
            cd.setStockDiff(1000);
            ChartDatas.add(cd);
        }
        return ChartDatas;

    }

    @Override
    public List<StockDetail> provideStockByMoreInfo(Stock stock) {
        List<StockDetail> result = new ArrayList<>();
        StockDetail sd = new StockDetail();

        sd.setStockAmount(123012);
        sd.setStockPrice(10000);
        sd.setStockHighPrice(12000);
        sd.setStockLowPrice(9000);
        sd.setStockStartPrice(9500);
        sd.setStockRange(5.0);
        result.add(sd);
        return result;
    }

    @Override
    public List<KeywordStock> provideSearchStock(Stock stock) {
        List<KeywordStock> result = new ArrayList<>();
        for(int i = 0 ; i<5;i++){
            KeywordStock kS = new KeywordStock();
            kS.setStockId("12"+i);
            kS.setStockName("삼"+i+"전자");
            result.add(kS);
        }
        return result;
    }

    @Override
    public void parsingStockData() {

    }
}
