package agentmaster.newstock.repository;

import agentmaster.newstock.domain.*;
import agentmaster.newstock.dto.stockPage.mainPage.UserRanking;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TestRepository {

    @PersistenceContext
    EntityManager em;

    public List<Article> findArticles(){
        String jpql = "SELECT a FROM Article a";

        List<Article> result = em.createQuery(jpql,Article.class).getResultList();

        return result;
    }


    public List<Field> findField (){
        String jpql = "SELECT f FROM Field f";

        List<Field> result = em.createQuery(jpql,Field.class).getResultList();

        return result;
    }


    public List<ArticleGroup> findArticleGroup (){
        String jpql = "SELECT a FROM ArticleGroup a";

        List<ArticleGroup> result = em.createQuery(jpql,ArticleGroup.class).getResultList();

        return result;
    }

    public List<ArticleLink> findArticleLink (){
        String jpql = "SELECT a FROM ArticleLink a";

        List<ArticleLink> result = em.createQuery(jpql,ArticleLink.class).getResultList();

        return result;
    }

    public List<ArticleScrap> findArticleScrap (){
        String jpql = "SELECT a FROM ArticleScrap a";

        List<ArticleScrap> result = em.createQuery(jpql,ArticleScrap.class).getResultList();

        return result;
    }

    public List<ArticleSummary> findArticleSummary (){
        String jpql = "SELECT a FROM ArticleSummary a";

        List<ArticleSummary> result = em.createQuery(jpql,ArticleSummary.class).getResultList();

        return result;
    }

    public List<IssueSummary> findIssueSummary (){
        String jpql = "SELECT i FROM IssueSummary i";

        List<IssueSummary> result = em.createQuery(jpql,IssueSummary.class).getResultList();

        return result;
    }

    public List<Simulation> findSimulation (){
        String jpql = "SELECT s FROM Simulation s";

        List<Simulation> result = em.createQuery(jpql,Simulation.class).getResultList();

        return result;
    }

    public List<Stock> findStock (){
        String jpql = "SELECT s FROM Stock s";

        List<Stock> result = em.createQuery(jpql,Stock.class).getResultList();

        return result;
    }

    public List<StockInfo> findStockInfo (){
        String jpql = "SELECT s FROM StockInfo s";

        List<StockInfo> result = em.createQuery(jpql,StockInfo.class).getResultList();

        return result;
    }

    public List<User> findUser (){
        String jpql = "SELECT u FROM User u";

        List<User> result = em.createQuery(jpql,User.class).getResultList();

        return result;
    }

    public List<UserRanking> findRank(){

//        SELECT u.user_name, u.rank_range, u.ranking
//          FROM (SELECT user_id, user_name, rank_range, ROW_NUMBER() OVER (ORDER BY rank_range DESC) AS ranking
//                  FROM "AGENTMASTER"."User") AS u
//         WHERE user_id = '{user_id}';

//        String jpql = "SELECT user_id, user_name, rank_range, " +
//                "ROW_NUMBER() OVER (ORDER BY rank_range DESC) AS ranking " +
//                "FROM \"AGENTMASTER\".\"User\" ";


        String jpql = "SELECT u.user_name, u.rank_range, u.ranking" +
                " FROM (SELECT user_id, user_name, rank_range, ROW_NUMBER() OVER (ORDER BY rank_range DESC) AS ranking" +
                    " FROM \"AGENTMASTER\".\"User\") AS u" +
                " WHERE user_id = 5";

        Query query = em.createNativeQuery(jpql).setMaxResults(10);
        List<Object[]> results = query.getResultList();

        List<UserRanking> result = new ArrayList<>();

        for(int i=0 ; i< results.size();i++){
            UserRanking ur = new UserRanking((String)results.get(i)[0],((BigDecimal)results.get(i)[1]).doubleValue(),((BigInteger)results.get(i)[2]).intValue());
            result.add(ur);
        }

        return result;
    }

    public List<Stock> testStock(){
        String jpql = "SELECT s " +
                "FROM Stock s " +
                "WHERE s.stockName LIKE :search";

        TypedQuery<Stock> query= em.createQuery(jpql,Stock.class);
        query.setParameter("search", "삼성"+"%");

        List<Stock> queryResult = query.getResultList();

        return  queryResult;
    }
}
