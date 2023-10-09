package agentmaster.newstock.controller;

import agentmaster.newstock.dto.articlePage.detailPage.*;
import agentmaster.newstock.service.ArticleService;
import agentmaster.newstock.service.TestService;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;
 //   private final ArticleService articleService;



    @GetMapping("/test/stockDTO")
    @ResponseBody
    public Map<String, Object> stockDto(@RequestParam("stockCode") String stockCode){
        Map<String, Object> result = new HashMap<>();

        result.put("stockDTO", testService.testDTOstock());

        return result;
    }


    @GetMapping("/testBuilder")
    @ResponseBody
    public Map<String, Object> BuilderTest(){
        Map<String, Object> result= new HashMap<>();
        A  a = A.builder().a(1).b(1).build();
        result.put("builder",a);
        return result;
    }


    @GetMapping("/testArticle123")
    @ResponseBody
    public Map<String, Object> articleTest(){
        Map<String, Object> result = new HashMap<>();
       // result.put("Stock", testService.testArticleRepository());
        result.put("Stock1", testService.testDTOstock());
        return result;
    }

    @GetMapping("/testfindall")
    @ResponseBody
    public Map<String, Object> findallTest(){
        Map<String, Object> result = new HashMap<>();
        // result.put("Stock", testService.testArticleRepository());
        result.put("Stock1", testService.findAllDto());
        return result;
    }
}


@Getter
class A{
    Integer a;
    Integer b;
    Integer c;

    @Builder
    public A(Integer a, Integer b){
        this.a = a;
        this.b = b;
    }
}
