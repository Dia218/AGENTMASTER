package agentmaster.newstock.repository;

import agentmaster.newstock.domain.*;
import agentmaster.newstock.dto.articlePage.detailPage.RealViewArticle;
import agentmaster.newstock.dto.articlePage.detailPage.RealViewArticleInfo;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.articlePage.searchPage.SearchArticle;
import agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.dto.userPage.ScrapArticle;

import java.util.List;

public interface ArticleRepository {

    //뉴스 메인 페이지 뉴스 프리뷰 DB SELECT
    public List<PreviewArticle> findArticleForPreview();

    //뉴스 검색 페이지 사용자 검색 키워드에 따른 기사 정보 DB SELECT
    public List<SearchArticle> findArticleBySearch(String search);

    //
    public List<RealViewArticle> findArticle(Article article, User user);

    //뉴스 상세페이지 기사 상세 정보 DB SELECT
    public List<RealViewArticleInfo> findArticleByDetail(Article article);

    //특정 사건에 대한 사건 흐름 요약 정보 DB SELECT
    public List<ArticleSummary> findArticleByFlowSummary(Article article);

    //기사 스크랩 여부 DB SELECT
    public Boolean findArticleScrapState(Article article, User user);

    //기사 스크랩 추가 DB insert
    public void insertScrapeState(Article article, User user);

    //기사 스크랩 추가 DB delete
    public void deleteScrapState(Article article, User user);

    //사용자 페이지 사용자 스크랩 기사 정보 DB SELECT
    public List<ScrapArticle> findArticleByScrap(User user);

    //주식 상세 페이지 주식 관련 정보 DB SELECT
    public List<ArticleByStock> findArticleByStock(Stock stock);

    //주식 메인 페이지 오늘의 뉴스 정보 DB SELECT
    public List<TodayArticle> findTodayArticle();

    public List<Field> findField();
}
