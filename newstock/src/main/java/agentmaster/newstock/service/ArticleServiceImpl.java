package agentmaster.newstock.service;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.domain.Field;
import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.domain.User;
import agentmaster.newstock.dto.articlePage.detailPage.*;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.articlePage.searchPage.SearchArticle;
import agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.dto.userPage.ScrapArticle;
import agentmaster.newstock.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.Flow;

@Service
@Transactional
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final ArticleFileRepository articleFileRepository;
    private final StockRepository stockRepository;
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
    public RealView provideArticleByDetail(Article article, User user) {
        user.setId(articleRepository.findUserIdByName(user));
        List<RealViewArticle> realViewArticles = articleRepository.findArticle(article, user);
        List<RealViewArticleInfo> realViewArticleInfos = articleRepository.findArticleByDetail(article);
        RealView result = RealView.builder()
                .articleId(realViewArticles.get(0).getArticleId())
                .articleSummary(realViewArticleInfos.get(0).getArticleSummary())
                .company(realViewArticles.get(0).getCompany())
                .title(realViewArticles.get(0).getTitle())
                .link(realViewArticleInfos.get(0).getLink())
                .repoter(realViewArticles.get(0).getRepoter())
                .isScrap(realViewArticles.get(0).getIsScrap()).build();

        return result;
    }

    @Override
    public List<FlowArticle> provideArticleByFlow(Article article) {


        List<FlowArticle> result = articleFileRepository.findArticleByFlow(article);

        return result;
    }

    @Override
    public List<RelationArticle> provideArticleByRelation(Article article) {
        List<RelationArticle> result = articleRepository.findArticleByRelation(article);

        return result;
    }

    @Override
    public List<FlowArticleSummary> provideArticleByFlowSummary(Article article) {
        List<FlowArticleSummary> result = articleRepository.findArticleByFlowSummary(article);
        return result;
    }

    @Override
    public boolean scrapArticle(Article article, User user) {

        //추후 userRepository에서 findUser가 있다면 그를 활용할 생각.
        user.setId(articleRepository.findUserIdByName(user));
        boolean now = articleRepository.findArticleScrapState(article, user);

        if(!now){
            articleRepository.insertScrapeState(article, user);
        }
        else{
            articleRepository.deleteScrapState(article, user);
        }

        return true;
    }

    @Override
    public List<ScrapArticle> provideArticleByScrap(User user) {
        List<ScrapArticle> result = articleRepository.findArticleByScrap(user);

        return result;
    }

    @Override
    public List<ArticleByStock> provideArticleByStock(Stock stock) {
//        stock.setId((stockRepository.findIdByCode(stock)).get(0).getId());
        stock.setId((stockRepository.findIdByName(stock)).get(0).getId());
        List<ArticleByStock> result = articleRepository.findArticleByStock(stock);
        for(int i = 0 ; i<result.size();i++){
            Article article = new Article();
            article.setId(result.get(0).getId());
            result.get(i).setSummary(articleRepository.findArticleByDetail(article).get(0).getArticleSummary());
        }
        return result;
    }

    @Override
    public List<TodayArticle> provideTodayArticle() {

        return articleRepository.findTodayArticle();
    }

}
