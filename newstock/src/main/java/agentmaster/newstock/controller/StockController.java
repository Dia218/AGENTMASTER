package agentmaster.newstock.controller;

import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.dto.articlePage.mainPage.FluctuationStockInfo;
import agentmaster.newstock.dto.stockPage.detailPage.ChartData;
import agentmaster.newstock.dto.stockPage.detailPage.StockBase;
import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.dto.stockPage.mainPage.StockRanking;
import agentmaster.newstock.repository.StockRepositoryImpl;
import agentmaster.newstock.service.ParsingStockInfo;
import agentmaster.newstock.service.StockService;
import agentmaster.newstock.service.StockServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;
    private final ParsingStockInfo parsingStockInfo;
    //주식 메인페이지 주식 검색 자동완성 요청부
    @ResponseBody
    @GetMapping("/stockMain/search")
    public Map<String, Object> searchStockJson(@RequestParam("search") String search){
        List<KeyWordStock> A =  stockService.provideSearchStock(search);
        Map<String, Object> result = new HashMap<>();
        result.put("search",A);
        result.put("test",1);
        return result;
    }

    @ResponseBody
    @GetMapping("/TopReturn")
    public Map<String, Object> topReturnStockJson(){
        List<StockRanking> topReturn = stockService.provideStockByTopReturn();
        Map<String, Object> result = new HashMap<>();

        result.put("TopRate", topReturn);
//        result.put("topReturn", topReturn);
        return result;
    }

    @ResponseBody
    @GetMapping("/BottomReturn")
    public Map<String, Object> bottomReturnStockJson(){
        List<StockRanking> bottomReturn = stockService.provideStockByBottomReturn();
        Map<String, Object> result = new HashMap<>();

        result.put("TopRate", bottomReturn);
//        result.put("BottomReturn", bottomReturn);
        return result;
    }

    @ResponseBody
    @GetMapping("/TopRate")
    public Map<String, Object> topRateStockJson(){
        List<StockRanking> topRate = stockService.provideStockByTopRate();
        Map<String, Object> result = new HashMap<>();
        result.put("TopRate", topRate);
        return result;
    }
    @ResponseBody
    @GetMapping("/BottomRate")
    public Map<String, Object> bottomRateStockJson(){
        List<StockRanking> bottomRate = stockService.provideStockByBottomRate();
        Map<String, Object> result = new HashMap<>();
        result.put("TopRate", bottomRate);
//        result.put("BottomRate", bottomRate);
        return result;
    }

    @ResponseBody
    @GetMapping("/TopVolume")
    public Map<String, Object> topVolumeStockJson(){
        List<StockRanking> topVolume = stockService.provideStockByTopVolume();
        Map<String, Object> result = new HashMap<>();
        result.put("TopRate", topVolume);
//        result.put("TopVolume", topVolume);
        return result;
    }

    @ResponseBody
    @GetMapping("/Stock/Search")
    public Map<String, Object> SearchStockJson(@RequestParam("search") String search){
        List<KeyWordStock> keyWordStocks = stockService.provideSearchStock(search);
        Map<String, Object> result = new HashMap<>();
        result.put("KeywordStock",keyWordStocks);

        return result;
    }

    @ResponseBody
    @GetMapping("/ChartData")
    public Map<String, Object> ChartDataJson(@RequestParam("stockId") String stockCode){
        Stock stock = new Stock();
        if(stockCode.charAt(0)>='0' && stockCode.charAt(0)<='9')
           stock.setStockCode(stockCode);
        else
            stock.setStockName(stockCode);
        List<ChartData> ChartDatas = stockService.provideStockByChartData(stock);
        Map<String, Object> result = new HashMap<>();

        result.put("ChartData", ChartDatas);
        return result;
    }

    @ResponseBody
    @GetMapping("/stockData")
    public Map<String, Object> StockDataJson(@RequestParam("stockCode") String stockCode){
        Stock stock = new Stock();
        stock.setStockName(stockCode);
        List<StockBase> stockBases = stockService.provideStockByBase(stock);
        Map<String, Object> result = new HashMap<>();

        result.put("StockBase", stockBases);
        return result;
    }

    @ResponseBody
    @GetMapping("/newsMain/stockChart")
    public Map<String, Object> FluctuationStock(){
        Map<String, Object> result = new HashMap<>();
        List<FluctuationStockInfo> fluctuationStock = stockService.provideStockByFluctuation();

        result.put("FluctuationStockInfo", fluctuationStock);
        return result;
    }


    @ResponseBody
    @GetMapping("/start")
    public void StartStockInfo() throws IOException, ParseException {
        parsingStockInfo.parsing();
    }





}
