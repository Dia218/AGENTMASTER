package agentmaster.newstock.repository;

import agentmaster.newstock.domain.*;
import agentmaster.newstock.dto.articlePage.detailPage.*;
import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.articlePage.searchPage.SearchArticle;
import agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.dto.userPage.ScrapArticle;
import org.springframework.stereotype.Repository;
import agentmaster.newstock.user.entitiy.User;
import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Flow;

@Repository
public class ArticleRepositoryImpl implements ArticleRepository{

    @PersistenceContext
    EntityManager em;
    @Override
    public List<PreviewArticle> findArticleForPreview() {

//        SELECT article_id, company, title, field_id
//        FROM "AGENTMASTER"."Article"
//        ORDER BY RANDOM()
//        LIMIT 5;


        String jpql = "SELECT NEW agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle(a.id, a.company, a.title, a.field.fieldName) " +
                "FROM Article a " +
                "ORDER BY FUNCTION('RANDOM') ";

        TypedQuery<PreviewArticle> query = em.createQuery(jpql, PreviewArticle.class);
        query.setMaxResults(5);

        List<PreviewArticle> result = query.getResultList();


//        String nativeQueries = "SELECT article_id, company, title, field_id "
//                + "FROM \"AGENTMASTER\".\"Article\" "
//                + "ORDER BY RANDOM() "
//                + "LIMIT 5";
//        List<Object[]> results = em.createNativeQuery(nativeQueries).getResultList();
//
//        List<PreviewArticle> result = new ArrayList<>();
//
//        for(int i = 0 ; i < results.size();i++){
//            result.add(new PreviewArticle(((BigInteger)(results.get(i)[0])).longValue(),(String)results.get(i)[1],(String)results.get(i)[2],((BigInteger)results.get(i)[3]).longValue()));
//        }
        return result;
    }

    @Override
    public List<SearchArticle> findArticleBySearch(String search) {
//        SELECT article_id, company, first_pub, last_pub, title
//          FROM "AGENTMASTER"."Article"
//         WHERE title LIKE '%{keyword}%'
//            OR (SELECT issue_keyword
//                  FROM "AGENTMASTER"."Issue_summary"
//                 WHERE "AGENTMASTER"."Issue_summary".issue_summary_id = "AGENTMASTER"."Article".issue_summary_id) LIKE
//               '%{keyword}%';
        String jpql = "SELECT NEW agentmaster.newstock.dto.articlePage.searchPage.SearchArticle(a.id, a.company, a.firstPub, a.lastPub, a.title) "
                + "FROM Article a "
                + "WHERE a.title LIKE :keyword1 "
                + "OR ("
                + "(SELECT b.issueKeyword FROM IssueSummary b "
                + "WHERE b.id = a.issueSummary.id) "
                + "LIKE :keyword2)";

        TypedQuery<SearchArticle> query = em.createQuery(jpql, SearchArticle.class);
        String need = "%"+search+"%";
        System.out.println("keyword : " + search +"\nneed : " + need);
        query.setParameter("keyword1", need);
        query.setParameter("keyword2", need);
        List<SearchArticle> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public List<RealViewArticle> findArticle(Article article, User user) {
//        SELECT article.article_id, article.title, article.company, article.reporter,
//       CASE WHEN EXISTS (SELECT
//                           FROM "AGENTMASTER"."Article_scrap"
//                          WHERE article_id = '{article_id}' AND user_id = '{username}') THEN TRUE
//            ELSE FALSE END AS isscrap
//  FROM "AGENTMASTER"."Article" AS article
// WHERE article_id = '{article_id}';

//        String jpql = "SELECT NEW agentmaster.newstock.dto.articlePage.detailPage.RealViewArticle(a.id, a.title, a.company, a.reporter, " +
//                "(CASE WHEN EXISTS (SELECT b.id " +
//                "FROM ArticleScrap b " +
//                "WHERE b.id = :articleId AND b.user.name = :userId ) " +
//                "THEN 1 ELSE 0 END)) as isscrap " +
//                "FROM Article a " +
//                "WHERE a.id = :articleId2";

//        TypedQuery<RealViewArticle> query = em.createQuery(jpql, RealViewArticle.class);
//        query.setParameter("articleId", article.getId());
//        query.setParameter("articleId2", article.getId());
//        query.setParameter("userId", user.getName());

        String nativeQuery = "SELECT article.article_id, article.title, article.company, article.reporter, " +
                "CASE WHEN EXISTS (SELECT FROM \"AGENTMASTER\".\"Article_scrap\" " +
                "WHERE article_id = " + article.getId() + " AND user_id = " + user.getId() + ") THEN TRUE " +
                "ELSE FALSE END AS isscrap " +
                "FROM \"AGENTMASTER\".\"Article\" AS article " +
                "WHERE article_id = " + article.getId();

        Query query = em.createNativeQuery(nativeQuery);

        List<Object[]> results = query.getResultList();

        List<RealViewArticle> result = new ArrayList<>();

        for(Object[] resultList : results){
            result.add(new RealViewArticle(((BigInteger) resultList[0]).longValue(), (String) resultList[1], (String) resultList[2], (String) resultList[3],(Boolean) resultList[4]));
        }

        return result;
    }

    @Override
    public List<RealViewArticleInfo> findArticleByDetail(Article article) {
//        SELECT summary.article_summary, article.article_link_id
//          FROM "AGENTMASTER"."Article" AS article
//                   LEFT JOIN "AGENTMASTER"."Article_summary" AS summary
//                   ON article.article_id = summary.article_id
//         WHERE article.article_id = '{article_id}';

        String jpql = "SELECT NEW agentmaster.newstock.dto.articlePage.detailPage.RealViewArticleInfo(summary.articleSummary, article.articleLink.link) " +
                "FROM Article article " +
                "LEFT JOIN ArticleSummary summary " +
                "ON article.id = summary.article.id " +
                "WHERE article.id = :articleId";

        TypedQuery<RealViewArticleInfo> query = em.createQuery(jpql, RealViewArticleInfo.class);
        query.setParameter("articleId", article.getId());
        List<RealViewArticleInfo> resultList = query.getResultList();


        return resultList;
    }

    @Override
    public List<RelationArticle> findArticleByRelation(Article article) {
//        SELECT article2.article_id, article2.title
//          FROM "AGENTMASTER"."Article" AS article1
//                   LEFT JOIN "AGENTMASTER"."Article" AS article2
//                   ON article1.article_group_id = article2.article_group_id
//         WHERE article1.article_id = '{article_id}'
//           AND article2.article_id <> '{article_id}'
//           AND article2.article_group_id IS NOT NULL
//         ORDER BY RANDOM()
//         LIMIT 5;

        String nativeQueries = "SELECT article2.article_id, article2.title "
                + "FROM \"AGENTMASTER\".\"Article\" AS article1 "
                        + "LEFT JOIN \"AGENTMASTER\".\"Article\" AS article2 "
                        + "ON article1.article_group_id = article2.article_group_id "
                + "WHERE article1.article_id = " + article.getId()+" "
                    + "AND article2.article_id <> " + article.getId()+" "
                    + "AND article2.article_group_id IS NOT NULL "
                + "ORDER BY RANDOM() ";

        Query query = em.createNativeQuery(nativeQueries).setMaxResults(10);
        List<Object[]> results = query.getResultList();

        List<RelationArticle> result = new ArrayList<>();
        for(int i = 0; i<results.size();i++){
            RelationArticle ra = new RelationArticle(((BigInteger)results.get(i)[0]).longValue(), (String)results.get(i)[1]);
            result.add(ra);
        }

        return result;
    }

    //아직 미완성
    @Override
    public List<FlowArticleSummary> findArticleByFlowSummary(Article article) {
        Article article1 = em.find(Article.class, article.getId());

        System.out.println("\n\n\n\n" +
                article1.getIssueSummary().getId() +
                "\n\n\n\n\n");
        FlowArticleSummary flowArticleSummary = new FlowArticleSummary(article1.getIssueSummary().getIssueSummary());
        List<FlowArticleSummary> result = new ArrayList<>();

        result.add(flowArticleSummary);

        return result;
    }


    @Override
    public Boolean findArticleScrapState(Article article, User user) {
        //SELECT "AGENTMASTER"."Article".article_id, "AGENTMASTER"."Article".title, "AGENTMASTER"."Article".reporter,
        //       "AGENTMASTER"."Article".first_pub
        //  FROM "AGENTMASTER"."Article"
        //           JOIN "AGENTMASTER"."Article_scrap"
        //           ON "AGENTMASTER"."Article".article_link_id = "AGENTMASTER"."Article_scrap".article_link_id
        // WHERE user_id = '{user_id}';

        Boolean isscrap = findArticle(article, user).get(0).getIsScrap();

        return isscrap;

    }


    @Override

    public void insertScrapeState(Article article, User user) {
        //INSERT INTO "AGENTMASTER"."Article_scrap" (user_id, article_link_id)
        //VALUES ('{customer_id}', '{article_id}');
        ArticleScrap articleScrap = new ArticleScrap();
        User users = em.find(User.class, user.getId());
        Article articles = em.find(Article.class, article.getId());
        ArticleLink articlelink = articles.getArticleLink();
        articleScrap.setUser(users);
        articleScrap.setArticleLink(articlelink);

        em.persist(articleScrap);
    }

    @Override
    public void deleteScrapState(Article article, User user) {
        Article article1 = em.find(Article.class, article.getId());

        //DELETE
        //  FROM "AGENTMASTER"."Article_scrap"
        // WHERE user_id = '{customer_id}'
        //   AND article_link_id = '{article_id}';
        String jpql = "DELETE "
                + "FROM ArticleScrap articlescrap "
                + "WHERE articlescrap.user.id = :customerId "
                + "AND articlescrap.articleLink.id = :articleLinkid";
        Query query = em.createQuery(jpql);

        query.setParameter("customerId", user.getId());
        query.setParameter("articleLinkid", article1.getArticleLink().getId());
        int rowsDeleted = query.executeUpdate();

    }

    @Override
    public List<ScrapArticle> findArticleByScrap(User user) {
        //SELECT "AGENTMASTER"."Article".article_id, "AGENTMASTER"."Article".title, "AGENTMASTER"."Article".reporter,
        //       "AGENTMASTER"."Article".first_pub
        //  FROM "AGENTMASTER"."Article"
        //           JOIN "AGENTMASTER"."Article_scrap"
        //           ON "AGENTMASTER"."Article".article_link_id = "AGENTMASTER"."Article_scrap".article_link_id
        // WHERE user_id = '{user_id}';

        String jpql = "SELECT NEW agentmaster.newstock.dto.userPage.ScrapArticle(article.id, article.title, article.reporter, article.firstPub) "
                + "FROM Article article "
                + "Join ArticleScrap articleScrap "
                + "On article.articleLink.id = articleScrap.articleLink.id "
                + "WHERE articleScrap.user.id = :userId";

        TypedQuery<ScrapArticle> query = em.createQuery(jpql, ScrapArticle.class);

        query.setParameter("userId", user.getId());

        List<ScrapArticle> resultList = query.getResultList();

        return resultList;

    }

    @Override
    public List<ArticleByStock> findArticleByStock(Stock stock) {
//        SELECT art.article_id, art.title, art.company
//        FROM "AGENTMASTER"."Stock" AS sto
//        INNER JOIN "AGENTMASTER"."Article" AS art
//        ON sto.field_id = art.field_id
//        WHERE sto.stock_id = '{stock_id}'
//        ORDER BY art.last_pub DESC
//        LIMIT 5;
//

        String jpql = "SELECT NEW agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock(article.id, article.title,article.company) "
                + "FROM Article article "
                + "Join Stock sto "
                + "ON sto.field.id = article.field.id "
                + "WHERE sto.id = :stockId "
                + "ORDER BY article.lastPub DESC";

        TypedQuery<ArticleByStock> query = em.createQuery(jpql, ArticleByStock.class);
        query.setParameter("stockId", stock.getId());
        query.setMaxResults(4);
        List<ArticleByStock> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public List<TodayArticle> findTodayArticle() {
//        SELECT arti.company, summ.article_summary
//          FROM "AGENTMASTER"."Article" AS arti
//                   INNER JOIN "AGENTMASTER"."Article_summary" AS summ
//                   ON arti.article_id = summ.article_id
//         WHERE arti.last_pub = (SELECT last_pub FROM "AGENTMASTER"."Article" ORDER BY last_pub DESC LIMIT 1)
//         ORDER BY RANDOM()
//         LIMIT 5;

//        String jpql = "SELECT NEW agentmaster.newstock.dto.stockPage.mainPage.TodayArticle(a.company, s.articleSummary)"
//                + " FROM Article a "
//                + "INNER JOIN ArticleSummary s "
//                + "ON a.id = s.article.id "
//                + "WHERE a.lastPub = ("
//                + "SELECT MAX(art.lastPub) FROM Article art) "
//                + "ORDER BY FUNCTION('RAND') "
//                ;

        String jpql = "SELECT NEW agentmaster.newstock.dto.stockPage.mainPage.TodayArticle(a.id,a.title, s.articleSummary) "+
                "FROM Article a "+
                "INNER JOIN ArticleSummary s ON a.id = s.article.id "+
                "WHERE a.lastPub = (SELECT MAX(a2.lastPub) FROM Article a2) "+
                "ORDER BY FUNCTION('RAND')";

        TypedQuery<TodayArticle> query = em.createQuery(jpql, TodayArticle.class);
        query.setMaxResults(5);

        List<TodayArticle> resultList = query.getResultList();

        return resultList;

    }

    @Override
    public Long findUserIdByName(User user) {
        String jpql = "SELECT u.id "
                + "From User u "
                + "Where u.name = :userName";

        TypedQuery<Long> query = em.createQuery(jpql,Long.class);
        query.setParameter("userName", user.getName());

        List<Long> result = query.getResultList();
        System.out.println("\n\n\n\n\nuser name : " + user.getName()+"\n\n\n\n\n");
        return result.get(0);
    }


}
