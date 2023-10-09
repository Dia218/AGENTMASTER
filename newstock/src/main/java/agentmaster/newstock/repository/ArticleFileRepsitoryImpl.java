package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.dto.articlePage.detailPage.FlowArticle;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ArticleFileRepsitoryImpl implements ArticleFileRepository {
    @Override
    public List<FlowArticle> findArticleByFlow(Article article) {
        return null;
    }
}
