package AgentMasterBackEnd.AgentMasterBackEnd.controller;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Article;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Simul;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.TodayArticle;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerAccount;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.CustomerRanking;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain.StockHoldings;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.StockDetail;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade.StockSameField;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.ArticleByStock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.ChartData;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.StockBase;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.CustomerRanker;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.KeywordStock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.Preview;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage.StockRanking;
import AgentMasterBackEnd.AgentMasterBackEnd.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.JobKOctets;
import javax.websocket.OnClose;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class StockPageController {
    private final ArticleService articleService = new ArticleServiceImpl();
    private final MemberService memberService = new MemberServiceImpl();
    private final SimulService simulService = new SimulServiceImpl();
    private final StockService stockService = new StockServiceImpl();

    @ResponseBody
    @RequestMapping("/stock/mainPage")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> stockMainPage(){
       Map<String, Object> result = new HashMap<String, Object>();
       ArrayList<TodayArticle> todayArticle = (ArrayList<TodayArticle>) articleService.provideArticlesTodayArticle();
       result.put("Today", todayArticle);
       ArrayList<StockRanking> stocks = (ArrayList<StockRanking>) stockService.provideStockByTopRate();
       result.put("TopRate", stocks);
       ArrayList<CustomerRanker> simuls = (ArrayList<CustomerRanker>) simulService.provideRanking();
       result.put("Ranking", simuls);
       return result;
    }

    @GetMapping("/stock/mainPage/topRate")
    public Map<String, Object> topRateStock(){
        Map<String, Object> result = new HashMap<String, Object>();
        ArrayList<StockRanking> stocks = (ArrayList<StockRanking>) stockService.provideStockByTopRate();
        result.put("TopRate", stocks);
        return result;
    }

    @GetMapping("/stock/mainPage/bottomRate")
    public Map<String, Object> bottomRateStock(){
        Map<String, Object> result = new HashMap<String, Object>();
        ArrayList<StockRanking>  stocks = (ArrayList<StockRanking>) stockService.provideStockByBottomRate();
        result.put("BottomRate", stocks);
        return result;
    }

    @GetMapping("/stock/mainPage/topReturn")
    public Map<String, Object> topReturnStock(){
        Map<String, Object> result = new HashMap<String, Object>();
        ArrayList<StockRanking> stocks = (ArrayList<StockRanking>) stockService.provideStockByTopReturn();
        result.put("TopReturn", stocks);
        return result;
    }
    @GetMapping("/stock/mainPage/bottomReturn")
    public Map<String, Object> bottomReturnStock(){
        Map<String, Object> result = new HashMap<String, Object>();
        ArrayList<StockRanking>  stocks = (ArrayList<StockRanking>) stockService.provideStockByBottonReturn();
        result.put("BottomReturn", stocks);
        return result;
    }

    @GetMapping("/stock/mainPage/topVolume")
    public Map<String, Object> topVolumeStock(){
        Map<String, Object> result = new HashMap<String, Object>();
        ArrayList<StockRanking>  stocks = (ArrayList<StockRanking>) stockService.provideStockByVolume();
        result.put("Volume", stocks);
        return result;
    }

    @GetMapping("/stock/searchStock")
    public Map<String, Object> searchStock(){
        Map<String, Object> result = new HashMap<>();
        ArrayList<KeywordStock> kS = (ArrayList<KeywordStock>) stockService.provideSearchStock(new Stock());
        result.put("searchStock", kS);
        return result;
    }
    @ResponseBody
    @RequestMapping("/stock/detailPage")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> stockDetailPage(@RequestParam("si") Integer Id, @RequestParam("sn") String name){
        Stock stock = new Stock();
        stock.setStockId(String.valueOf(Id));
        stock.setStockName(name);
        Map<String, Object> result = new HashMap<>();
        ArrayList<ChartData> chartData = (ArrayList<ChartData>) stockService.provideStockByChartData(stock);
        result.put("ChartData", chartData);
        ArrayList<StockBase> stocks = (ArrayList<StockBase>) stockService.provideStockByBase(stock);
        result.put("StockData", stocks);
        ArrayList<ArticleByStock> articles = (ArrayList<ArticleByStock>) articleService.provideArticlesByStock(stock);
        result.put("articles",articles);
        return result;
    }

    @GetMapping("/stock/compareStockChartData")
    @ResponseStatus(HttpStatus.FOUND)
    public Map<String, Object> compareStockChartData(){
        Map<String, Object> result = new HashMap<>();
        ArrayList<ChartData> stocks = (ArrayList<ChartData>) stockService.provideStockByChartData(new Stock());
        result.put("ChartData", stocks);
        return result;
    }

    @GetMapping("/stock/simulPage")
    public Map<String, Object> simulPageEnter(){
        Map<String, Object> result = new HashMap<>();
        ArrayList<StockRanking> sR = (ArrayList<StockRanking>) stockService.provideStockByVolume();
        result.put("Volum", sR);
        ArrayList<CustomerRanking> cR = (ArrayList<CustomerRanking>) simulService.provideCustomerRankInfo(new Customer());
        result.put("RankInfo",cR);
        ArrayList<CustomerAccount> cA = (ArrayList<CustomerAccount>) simulService.provideAccountInfo(new Customer());
        result.put("AccountInfo", cA);
        ArrayList<StockHoldings> sH = (ArrayList<StockHoldings>) simulService.provideHoldingAllStockInfo(new Customer());
        result.put("HoldingInfo",sH);
        return result;
    }

    @GetMapping("/stock/tradePage")
    public Map<String, Object> tradePageEnter(){
        Map<String, Object> result = new HashMap<>();
        ArrayList<ChartData> cD = (ArrayList<ChartData>) stockService.provideStockByChartData(new Stock());
        result.put("ChartData", cD);
        ArrayList<StockDetail> sD = (ArrayList<StockDetail>) stockService.provideStockByMoreInfo(new Stock());
        result.put("StockInfo", sD);
        ArrayList<StockHoldings> sH = (ArrayList<StockHoldings>) simulService.provideHoldingStockInfo(new Customer(), new Stock());
        result.put("StockHodingData", sH);
        ArrayList<StockSameField> ssF = (ArrayList<StockSameField>) simulService.provideSameFieldStock(new Customer(), new Stock());
        result.put("sameFieldStock",ssF);
        return result;
    }
    @PostMapping("/stock/buyStockTry")
    public Map<String, Object> buyStockTry(){

    }

    @PostMapping("/stock/saleStockTry")
    public Map<String, Object> saleStockTry(){
        return null;
    }
}
