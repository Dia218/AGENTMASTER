package agentmaster.newstock.controller;

import agentmaster.newstock.dto.stockPage.mainPage.KeyWordStock;
import agentmaster.newstock.repository.StockRepositoryImpl;
import agentmaster.newstock.service.StockService;
import agentmaster.newstock.service.StockServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class StockController {
    StockService stockService = new StockServiceImpl(new StockRepositoryImpl());
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
    @GetMapping("/test2")
    public Map<String, Object> testJson(){
        Map<String, Object> result = new HashMap<>();

        //result.put("test2",stockService.provideStockByTopRate());
        result.put("test",1);

        return result;
    }


}
