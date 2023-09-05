package agentmaster.newstock.service;

import agentmaster.newstock.repository.ArticleFileRepository;
import agentmaster.newstock.repository.ArticleRepository;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;

import java.util.List;

public interface ArticleService {
    ArticleRepository articleRepository = null;
    ArticleFileRepository articleFileRepository = null;

    //뉴스 메인 페이지 뉴스 프리뷰 전달부
    public List<PreviewArticle> provideArticlesForPreview();
}
