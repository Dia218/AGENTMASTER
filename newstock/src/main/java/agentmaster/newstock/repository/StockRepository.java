package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;

import java.util.List;

public interface StockRepository {

    //종목명을 토대로 주식 ID를 DB SELECT
    List<Stock> findIdByName(Stock stock);

    //종목 코드를 토대로 주식 ID를 DB SELECT
    List<Stock> findIdByCode(Stock stock);

    //주식 메인 페이지 상승 순으로 정렬된 DB SELECT
    List<StockRanking> findStockByTopReturn();

    //주식 메인 페이지 하락 순으로 정렬된 DB SELECT
    List<StockRanking> findStockByBottomReturn();

    //주식 메인 페이지 상승률 순으로 정렬된 DB SELECT
    List<StockRanking> findStockByTopRate();

    //주식 메인 페이지 하락률 순으로 정렬된 DB SELECT
    List<StockRanking> findStockByBottomRate();

    //주식 메인 페이지 거래량 순으로 정렬된 DB SELECT
    List<StockRanking> findStockByTopVolume();

    //검색어에 따른 검색 자동 완성 결과 정보 DB SELECT
    List<KeyWordStock> findStockBySearch(String search);

    //주식ID를 통해 주식 차트 데이터 정보 DB SELECT
    List<ChartData> findStockByChartData(Stock stock);

    //주식 상세페이지 주식 정보 DB SELECT
    List<StockBase> findStockByBase(Stock stock);

    //모의투자 주식 상세 정보 DB SELECT
    List<StockDetail> findStockByMoreInfo(Stock stock);

    //뉴스 메인 페이지 주식 증시 정보 DB SELECT
    List<FluctuationStockInfo> findStockByFluctuation();

    //주기적으로 주식 API 정보 DB저장
    void insertStock(Stock stock);
}
