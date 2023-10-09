package agentmaster.newstock.service;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.domain.Field;
import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.domain.User;
import agentmaster.newstock.dto.articlePage.detailPage.*;
import agentmaster.newstock.dto.articlePage.searchPage.SearchArticle;
import agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.dto.userPage.ScrapArticle;

import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;

import java.util.List;

public interface ArticleService {
    //뉴스 메인 페이지 뉴스 프리뷰 전달부
    public List<PreviewArticle> provideArticlesForPreview();

    //뉴스 검색 페이지 검색 키워드에 따른 결과 전달부
    public List<SearchArticle> provideArticleBySearch(String search);

    //뉴스 상세페이지 기사 상세 정보 전달부
    public RealView provideArticleByDetail(Article article, User user);


    //특정 사건에 대한 사건 흐름 기사들 전달부
    public List<FlowArticle> provideArticleByFlow(Article article);

    //뉴스 상세 페이지 기사 연관 기사 전달부
    public List<RelationArticle> provideArticleByRelation(Article articel);

    //특정 사건에 대한 전체 요약문 전달부
    public List<FlowArticleSummary> provideArticleByFlowSummary(Article article);

    //기사 상세 페이지 기사 스크랩 기능
    public boolean scrapArticle(Article article, User user);

    //사용자 페이지 사용자 스크랩 기사 전달부
    public List<ScrapArticle> provideArticleByScrap(User user);

    //주식 상세 페이지 주식 관련 기사 전달부
    public List<ArticleByStock> provideArticleByStock(Stock stock);

    //주식 메인 페이지 오늘의 뉴스 전달부
    public List<TodayArticle> provideTodayArticle();



}
