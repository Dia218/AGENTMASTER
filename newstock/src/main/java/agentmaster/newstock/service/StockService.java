package agentmaster.newstock.service;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;

import java.util.List;

public interface StockService {

    //종목명을 토대로 주식 ID를 받아오는 함수
    Long provideStockByName(Stock stock);

    //종목코드를 토대로 주식 ID를 받아오는 함수
    Long provideStockByCode(Stock stock);

    //주식 메인 페이지 상승 순으로 정렬된 주식 전달부
    List<StockRanking> provideStockByTopReturn();

    //주식 메인 페이지 하락 순으로 정렬된 주식 전달부
    List<StockRanking> provideStockByBottomReturn();

    //주식 메인 페이지 상승률 순으로 정렬된 주식 전달부
    List<StockRanking> provideStockByTopRate();

    //주식 메인 페이지 하락률 순으로 정렬된 주식 전달부
    List<StockRanking> provideStockByBottomRate();

    //주식 메인 페이지 거래향 순으로 정렬된 주식 전달부
    List<StockRanking> provideStockByTopVolume();

    //검색어에 따른 검색 자동 완선 결과 주식 전달부
    List<KeyWordStock> provideSearchStock(String search);

    //주식 ID를 통한 주식 차트 데이터 전달부
    List<ChartData> provideStockByChartData(Stock stock);

    //주식 상세페이지 주식 정보 전달부
    List<StockBase> provideStockByBase(Stock stock);

    //모의투자 거래 페이지 주식 추가 정보 전달부
    List<StockBase> provideStockByMoreInfo(Stock stock);

    //모의투자 거래 페이지 주식 그래프 정보 전달부(주식 상세의 그래프와 다름)
    List<StockBase> provideStockBySimulChartData(Stock stock);

    //뉴스 메인 페이지 증시 부분 주식 전달부
    List<FluctuationStockInfo> provideStockByFluctuation();

}
