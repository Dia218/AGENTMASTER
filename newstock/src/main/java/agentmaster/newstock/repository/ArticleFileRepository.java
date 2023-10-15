package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.dto.articlePage.detailPage.FlowArticle;

import java.util.List;

public interface ArticleFileRepository {

        List<FlowArticle> findArticleByFlow(Article article);

}
