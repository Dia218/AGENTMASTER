package agentmaster.newstock.service;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.simulPage.simulTrade.StockSameField;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;
import agentmaster.newstock.repository.StockRepository;
import agentmaster.newstock.repository.StockRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StockServiceImpl implements StockService{

    private final StockRepository stockRepository;

    @Override
    public Long provideStockByName(Stock stock) {
        return null;
    }

    @Override
    public Long provideStockByCode(Stock stock) {
        return null;
    }

    @Override
    public List<StockRanking> provideStockByTopReturn() {
        return stockRepository.findStockByTopReturn();
    }

    @Override
    public List<StockRanking> provideStockByBottomReturn() {
        return stockRepository.findStockByBottomReturn();
    }

    @Override
    public List<StockRanking> provideStockByTopRate() {
        return stockRepository.findStockByTopRate();
    }

    @Override
    public List<StockRanking> provideStockByBottomRate() {
        return stockRepository.findStockByBottomRate();
    }

    @Override
    public List<StockRanking> provideStockByTopVolume() {
        return stockRepository.findStockByTopVolume();
    }

    @Override
    public List<KeyWordStock> provideSearchStock(String search) {
        return stockRepository.findStockBySearch(search);
    }

    @Override
    public List<ChartData> provideStockByChartData(Stock stock) {
        Stock target;
        if(stock.getStockCode() == null){
            target = stockRepository.findIdByName(stock).get(0);
        }
        else{
            target = stockRepository.findIdByCode(stock).get(0);
        }
        List<ChartData> results = stockRepository.findStockByChartData(target);
        List<ChartData> result = new ArrayList<>();
        for(int i = results.size()-1 ; i>=0;i--){
            result.add(results.get(i));
        }
        return result;
    }

    @Override
    public List<StockBase> provideStockByBase(Stock stock) {
        Stock target = stockRepository.findIdByName(stock).get(0);
        return stockRepository.findStockByBase(target);
    }

    @Override
    public List<StockSameField> provideStockBuSamefield(Stock stock) {
        Stock target = stockRepository.findIdByName(stock).get(0);
        target.setStockName(stock.getStockName());
        return stockRepository.findStockBySameField(target);
    }

    @Override
    public List<StockBase> provideStockByMoreInfo(Stock stock) {
        Stock target = stockRepository.findIdByName(stock).get(0);
        return stockRepository.findStockByMoreInfo(target);
    }

    @Override
    public List<StockBase> provideStockBySimulChartData(Stock stock) {
        Stock targer = stockRepository.findIdByCode(stock).get(0);
        return stockRepository.findStockBySimulChartData(stock);
    }

    @Override
    public List<FluctuationStockInfo> provideStockByFluctuation() {
        return stockRepository.findStockByFluctuation();
    }

}
