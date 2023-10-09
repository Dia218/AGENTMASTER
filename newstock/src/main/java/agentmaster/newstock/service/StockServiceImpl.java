package agentmaster.newstock.service;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;
import agentmaster.newstock.repository.StockRepository;
import agentmaster.newstock.repository.StockRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
//@Transactional(readOnly = true)
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
        return null;
    }

    @Override
    public List<StockRanking> provideStockByBottomReturn() {
        return null;
    }

    @Override
    public List<StockRanking> provideStockByTopRate() {
        return stockRepository.findStockByTopRate();
    }

    @Override
    public List<StockRanking> provideStockByBottomRate() {
        return null;
    }

    @Override
    public List<StockRanking> provideStockByTopVolume() {
        return null;
    }

    @Override
    public List<KeyWordStock> provideSearchStock(String search) {
        return null;
    }

    @Override
    public List<ChartData> provideStockByChartData(Stock stock) {
        return null;
    }

    @Override
    public List<StockBase> provideStockByBase(Stock stock) {
        return null;
    }

    @Override
    public List<StockDetail> provideStockByMoreInfo(Stock stock) {
        return null;
    }

    @Override
    public List<FluctuationStockInfo> provideStockByFluctuation() {
        return null;
    }
}
