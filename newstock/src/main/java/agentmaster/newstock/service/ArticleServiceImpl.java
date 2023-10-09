package agentmaster.newstock.service;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.domain.Field;
import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.domain.User;
import agentmaster.newstock.dto.articlePage.detailPage.FlowArticle;
import agentmaster.newstock.dto.articlePage.detailPage.FlowArticleSummary;
import agentmaster.newstock.dto.articlePage.detailPage.RealViewArticle;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.articlePage.searchPage.SearchArticle;
import agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.dto.userPage.ScrapArticle;
import agentmaster.newstock.repository.ArticleFileRepository;
import agentmaster.newstock.repository.ArticleFileRepsitoryImpl;
import agentmaster.newstock.repository.ArticleRepository;
import agentmaster.newstock.repository.ArticleRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final ArticleFileRepository articleFileRepository;
    @Override
    public List<PreviewArticle> provideArticlesForPreview() {
        List<PreviewArticle> result = articleRepository.findArticleForPreview();

        return result;
    }

    @Override
    public List<SearchArticle> provideArticleBySearch(String search) {
        List<SearchArticle> result = articleRepository.findArticleBySearch(search);

        return result;
    }

    @Override
    public List<RealViewArticle> provideArticleByDetail(Article article) {
        User user = new User();
        user.setName("기본값");
        List<RealViewArticle> result = articleRepository.findArticle(article, user);
        return result;
    }

    @Override
    public List<FlowArticle> provideArticleByRelation(Article article) {
        return null;
    }

    @Override
    public List<FlowArticleSummary> provideArticleByFlowSummary(Article article) {
        return null;
    }

    @Override
    public boolean scrapArticle(Article article, User user) {
        return false;
    }

    @Override
    public List<ScrapArticle> provideArticleByScrap(User user) {
        return null;
    }

    @Override
    public List<ArticleByStock> provideArticleByStock(Stock stock) {
        return null;
    }

    @Override
    public List<TodayArticle> provideTodayArticle() {

        return articleRepository.findTodayArticle();
    }

    @Override
    public List<Field> provideField(){
        return articleRepository.findField();
    }
}
