package agentmaster.newstock.controller;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.etc.ScrapRequest;
import agentmaster.newstock.service.ArticleService;
import agentmaster.newstock.user.entitiy.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@CrossOrigin
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;


    //뉴스 메인 페이지 오늘의 기사 전달부
    @ResponseBody
    @GetMapping("/newsMain/randomNews")
    public Map<String, Object> randomNewsJson(){
        Map<String, Object> result = new HashMap<>();
        result.put("PreviewNews", articleService.provideArticlesForPreview());
        return result;
    }


    //뉴스 상세 페이지 기사 정보 전달부( 요약문등)
    @ResponseBody
    @GetMapping("/newsDetail/newsSummary")
    public Map<String, Object> newsSummaryJson(@RequestParam("newsId") Long articleId, @RequestParam("userId") String userName ){
        Map<String, Object> result = new HashMap<>();
        Article article = new Article();
    
        User user = User.builder().name(userName).build();
        article.setId(articleId);
        if(userName.equals("null")) {
            user.setName("exdadabmausr");
            result.put("RealViewArticle", articleService.provideArticleByDetail(article,user));
        }
        else{
            user.setName(userName);
            result.put("RealViewArticle", articleService.provideArticleByDetail(article,user));
        }
        return result;
    }

    @ResponseBody
    @GetMapping("/newsDetail/relatedArticle")
    public Map<String, Object> relatedArticleJson(@RequestParam("newsId")Long articleId){
        Map<String, Object> result = new HashMap<>();
        Article article = new Article();
        article.setId(articleId);
        result.put("RelationArticle", articleService.provideArticleByRelation(article));

        return result;
    }

    @ResponseBody
    @GetMapping("/newsDetail/flowList")
    public Map<String, Object> flowListJson(@RequestParam("newsId") Long articleId){
        Map<String, Object> result = new HashMap<>();
        Article article = new Article();
        article.setId(articleId);

        result.put("FlowList", articleService.provideArticleByFlow(article));

        return result;
    }

    @ResponseBody
    @GetMapping("/newsDetail/flowIssue")
    public Map<String, Object> flowIssueJson(@RequestParam("newsId") Long articleId){
        Map<String, Object> result = new HashMap<>();
        Article article = new Article();
        article.setId(articleId);

        result.put("IssueSummary", articleService.provideArticleByFlowSummary(article));

        return result;
    }

    @ResponseBody
    @PostMapping("/newsDetail/scrap")
    public Map<String, Object> requestScrap(@RequestBody ScrapRequest request){
        Map<String, Object> result = new HashMap<>();
        Article article = new Article();
        User user = User.builder().name(request.getUserName()).build();
        System.out.println(request.getArticleId());
        System.out.println(request.getUserName());

        article.setId(request.getArticleId());
        user.setName(request.getUserName());
        articleService.scrapArticle(article,user);
        result.put("result",true);
        return result;
    }

    @ResponseBody
    @GetMapping("/ChartMain/TodayNews")
    public Map<String, Object> TodayArticleJson(){
        Map<String, Object> result = new HashMap<>();
        result.put("Today", articleService.provideTodayArticle());
        return result;
    }

    @ResponseBody
    @GetMapping("/article")
    public Map<String, Object> sameFieldArticleJson(@RequestParam("stockCode") String stockCode){
        Map<String, Object> result = new HashMap<>();

        Stock stock = new Stock();
        //프론트에 맞춰서 수정(stockCode->stock Name)
        stock.setStockCode(stockCode);
        stock.setStockName(stockCode);
        System.out.println("\n\n\n\n\n\n\n\n\nstockCode = "+stock.getStockCode());

        System.out.println("stockCode = "+stock.getStockName()+"\n\n\n\n\n\n\n\n\n");
        result.put("articles", articleService.provideArticleByStock(stock));

        return result;
    }

    @ResponseBody
    @GetMapping("/searchList")
    public Map<String, Object> searchArticleJson(@RequestParam("keyword") String keyword){
        Map<String, Object> result = new HashMap<>();

        result.put("SearchNewsInfo",articleService.provideArticleBySearch(keyword));
        return result;
    }
}
