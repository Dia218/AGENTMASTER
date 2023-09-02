package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Article;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.TodayArticle;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.ArticleByStock;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ArticleService {
    List<Article> provideArticlesByBase(Article article);
    List<Article> provideFullArticles(Article article);
    List<Article> provideArticlesByKeyword(Article article);
    List<Article> provideArticlesByScrap(Article article);
    List<Article> provideArticlesByField(Article article);
    List<Article> provideArticlesByFlow(Article article);;
    List<TodayArticle> provideArticlesTodayArticle();;
    List<ArticleByStock> provideArticlesByStock(Stock stock);

    List<Article> provideFlowArticles(Article article);

    void saveArticleScrap();
    void deleteArticleScrap();

}
