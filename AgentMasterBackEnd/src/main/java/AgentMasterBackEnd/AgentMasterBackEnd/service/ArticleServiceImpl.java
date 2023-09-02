package AgentMasterBackEnd.AgentMasterBackEnd.service;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Article;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.TodayArticle;
import AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage.ArticleByStock;

import java.util.ArrayList;
import java.util.List;

public class ArticleServiceImpl implements ArticleService {
    @Override
    public List<Article> provideArticlesByBase(Article article) {
        return null;
    }

    @Override
    public List<Article> provideFullArticles(Article article) {
        return null;
    }

    @Override
    public List<Article> provideArticlesByKeyword(Article article) {
        return null;
    }

    @Override
    public List<Article> provideArticlesByScrap(Article article) {
        return null;
    }

    @Override
    public List<Article> provideArticlesByField(Article article) {
        return null;
    }

    @Override
    public List<Article> provideArticlesByFlow(Article article) {
        return null;
    }

    @Override
    public List<TodayArticle> provideArticlesTodayArticle() {
        List<TodayArticle> articles = new ArrayList<>();

        for(int i = 0; i<5;i++){
            TodayArticle article = new TodayArticle();
            article.setTitle("new"+(i+1));
            article.setSummary("new" +(i+1) + " 요약문");
            articles.add(article);
        }
        return articles;
    }

    @Override
    public List<ArticleByStock> provideArticlesByStock(Stock stock) {
        List<ArticleByStock> result = new ArrayList<>();
        for(int i = 1 ; i<6;i++){
            ArticleByStock abs = new ArticleByStock();
            abs.setArticleId("1234");
            abs.setArticleTitle("제목"+i);
            result.add(abs);
        }
        return result;
    }

    @Override
    public List<Article> provideFlowArticles(Article article) {
        return null;
    }

    @Override
    public void saveArticleScrap() {

    }

    @Override
    public void deleteArticleScrap() {

    }
}
