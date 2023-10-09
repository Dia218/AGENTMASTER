package agentmaster.newstock.service;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.domain.User;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDetail;
import agentmaster.newstock.dto.simulPage.simulTrade.StockDto;
import agentmaster.newstock.repository.ArticleRepository;
import agentmaster.newstock.repository.StockRepository;
import agentmaster.newstock.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.websocket.OnClose;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;
    private final ArticleRepository articleRepository;

    private final StockRepository stockRepository;

    public Map<String, Object> provideRanking(){
        Map<String, Object> result = new HashMap<>();
        result.put("Raking",testRepository.findRank());
        return result;
    }

    public Map<String, Object> findAllDto(){
        Map<String, Object> result = new HashMap<>();
        result.put("DTO",stockRepository.findAll());
        return result;
    }
    public Map<String, Object> testAllTable(){
        Map<String, Object> result = new HashMap<>();

        result.put("User", testRepository.findUser());
        result.put("Article",testRepository.findArticles());
        result.put("ArticleGroup",testRepository.findArticleGroup());
        result.put("link",testRepository.findArticleLink());
        result.put("scrap",testRepository.findArticleScrap());
        result.put("summary",testRepository.findArticleSummary());
        result.put("stock",testRepository.findStock());
        result.put("stockInfo",testRepository.findStockInfo());
        result.put("Field",testRepository.findField());
        result.put("Simulation",testRepository.findSimulation());
        result.put("IssueSummary",testRepository.findIssueSummary());


        return result;

    }

    public Map<String, Object> testArticleRepository(){
        Map<String, Object> result = new HashMap<>();
        Article article = new Article();
        article.setId(1L);
        User user = new User();
        user.setId(1L);
        Stock stock = new Stock();
        stock.setId(1L);
//        result.put("article",articleRepository.findArticle(article, user));
//        result.put("FlowSummary",articleRepository.findArticleByFlowSummary(article));
          result.put("search",articleRepository.findArticleBySearch(new String("Title")));
//        result.put("Today",articleRepository.findTodayArticle());
//        result.put("Preview",articleRepository.findArticleForPreview());
//        result.put("Detail",articleRepository.findArticleByDetail(article));
//        result.put("Relation",articleRepository.findArticleByRelation(article));
//        result.put("Scrap",articleRepository.findArticleByScrap(user));
//        result.put("Stock",articleRepository.findArticleByStock(stock));
//        result.put("ScrapState",articleRepository.findArticleScrapState(article,user));
        result.put("stock",testRepository.testStock());
        return result;
    }

    public List<StockDto> testDTOstock() {
        Stock stock = new Stock();
        stock.setId(2L);
        List<StockDto> result = stockRepository.findByStockId(stock);

        return result;
    }
}
