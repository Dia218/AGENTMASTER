package agentmaster.newstock.repository;

import agentmaster.newstock.domain.Article;
import agentmaster.newstock.dto.articlePage.detailPage.FlowArticle;
import org.json.JSONTokener;
import org.json.JSONObject;
import org.json.JSONArray;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

import java.io.IOException;


@Repository
public class ArticleFileRepsitoryImpl implements ArticleFileRepository {

    @PersistenceContext
    EntityManager em;
    @Override
    public List<FlowArticle> findArticleByFlow(Article article) {
        List<FlowArticle> results = new ArrayList<>();
        Article target =  em.find(Article.class, article.getId());

        try{
            String filePath = "C:/sample/files/issue_"+target.getIssueSummary().getIssueKeyword()+".json";
            try  {
                FileReader reader = new FileReader(filePath);

                JSONTokener tokener = new JSONTokener(reader);
                JSONObject jsonObject = new JSONObject(tokener);

                // JSON 데이터에서 원하는 필드 추출
                JSONArray jsonArray = new JSONArray();

                jsonArray = (JSONArray) jsonObject.get("list");

                if(jsonArray.length()>0){

                    for(int i =0 ; i< jsonArray.length();i++){

                        JSONObject jsonObject1 = (JSONObject) jsonArray.get(i);
                        System.out.println("\n\n\n\n\n\n정상작동"+jsonObject1.getLong("id")+"\n"+filePath+"\n"+target.getIssueSummary().getIssueKeyword()+"\n\n\n\n\n");

                        Article flowArticle = em.find(Article.class, jsonObject1.getLong("id"));

                        FlowArticle result = new FlowArticle(flowArticle.getId(), flowArticle.getTitle(), flowArticle.getArticleSummaries().get(0).getArticleSummary());
                        results.add(result);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        catch (Exception e){}

        return results;
    }
}
