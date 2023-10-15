package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.dto.articlePage.detailPage.FlowArticle;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;


@Repository
public class ArticleFileRepsitoryImpl implements ArticleFileRepository {

    @PersistenceContext
    EntityManager em;
    @Override
    public List<FlowArticle> findArticleByFlow(Article article) {
        List<FlowArticle> result = new ArrayList<>();

        return result;

    }
}
