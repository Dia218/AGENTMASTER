package agentmaster.newstock.repository;

import agentmaster.newstock.domain.*;
import agentmaster.newstock.dto.articlePage.detailPage.RealViewArticle;
import agentmaster.newstock.dto.articlePage.detailPage.RealViewArticleInfo;
    import agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle;
import agentmaster.newstock.dto.articlePage.searchPage.SearchArticle;
import agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock;
import agentmaster.newstock.dto.stockPage.mainPage.TodayArticle;
import agentmaster.newstock.dto.userPage.ScrapArticle;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
        String jpql = "SELECT NEW agentmaster.newstock.dto.articlePage.mainPage.PreviewArticle(a.id, a.company, a.title, a.field.id) " +
                "FROM Article a " +
                "ORDER BY FUNCTION('RANDOM') ";

        TypedQuery<PreviewArticle> query = em.createQuery(jpql, PreviewArticle.class);
        query.setMaxResults(5);
        return query.getResultList();
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
        query.setParameter("keyword1", "'%" + search + "%'");
        query.setParameter("keyword2", "'%" + search + "%'");
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

        String jpql = "SELECT NEW agentmaster.newstock.dto.articlePage.detailPage.RealViewArticle(a.id, a.title, a.company, a.repoter, " +
                "(CASE WHEN EXISTS (SELECT b.id " +
                "FROM ArticleScrap b " +
                "WHERE b.id = :articleId AND b.user.id = :userId ) " +
                "THEN TRUE ELSE FALSE END)) as isscrap " +
                "FROM Article a " +
                "WHERE a.id = :articleId2";

        TypedQuery<RealViewArticle> query = em.createQuery(jpql, RealViewArticle.class);
        query.setParameter("articleId", "'"+article.getId()+"'");
        query.setParameter("articleId2", "'"+article.getId()+"'");
        query.setParameter("userId", "'"+user.getId()+"'");

        List<RealViewArticle> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public List<RealViewArticleInfo> findArticleByDetail(Article article) {
        //SELECT summary.article_summary, article.article_link_id
        //  FROM "AGENTMASTER"."Article" AS article
        //           LEFT JOIN "AGENTMASTER"."Article_summary" AS summary
        //           ON article.article_id = summary.article_id
        // WHERE article.article_id = '{article_id}';

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

    //아직 미완성
    @Override
    public List<ArticleSummary> findArticleByFlowSummary(Article article) {
        return null;
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

        String jpql = "SELECT NEW agentmaster.newstock.dto.userPage.ScrapArticle(article.id, article.title, article.repoter, article.firstPub) "
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
//        SELECT "AGENTMASTER"."Article".article_id, article_summary
//          FROM "AGENTMASTER"."Article"
//                   JOIN "AGENTMASTER"."Article_summary"
//                   ON "AGENTMASTER"."Article_summary".article_id = "AGENTMASTER"."Article".article_id
//         WHERE (SELECT issue_summary
//                  FROM "AGENTMASTER"."Issue_summary"
//                 WHERE "Article".issue_summary_id = "AGENTMASTER"."Article".issue_summary_id) LIKE '{keyword}'
//         ORDER BY RANDOM()
//         LIMIT 1;

        String jpql = "SELECT NEW agentmaster.newstock.dto.stockPage.detailPage.ArticleByStock(article.id, article.body) "
                + "FROM Article article "
                + "Join ArticleSummary articlesummary "
                + "ON articlesummary.article.id = article.id "
                + "WHERE (SELECT i.issueSummary "
                    + "FROM IssueSummary i "
                    + "WHERE article.issueSummary.id = i.id ) Like :keyword "
                + "ORDER BY FUNCTION('RAND') ";

        TypedQuery<ArticleByStock> query = em.createQuery(jpql, ArticleByStock.class);
        query.setParameter("keyword", stock.getStockName());
        query.setMaxResults(1);
        List<ArticleByStock> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public List<TodayArticle> findTodayArticle() {
        //q

        /*String jpql = "SELECT NEW agentmaster.newstock.dto.stockPage.mainPage.TodayArticle(a.company, s.articleSummary)"
                + " FROM Article a "
                + "INNER JOIN ArticleSummary s "
                + "ON a.id = s.article.id "
                + "WHERE a.lastPub = ("
                + "SELECT MAX(art.lastPub) FROM Article art) "
                + "ORDER BY FUNCTION('RAND') "
                ;*/

        String jpql = "SELECT a.company, s.articleSummary "+
                "FROM Article a "+
                "INNER JOIN ArticleSummary s ON a.id = s.article.id "+
                "WHERE a.lastPub = (SELECT MAX(a2.lastPub) FROM Article a2) "+
                "ORDER BY FUNCTION('RAND')";

        TypedQuery<TodayArticle> query = em.createQuery(jpql, TodayArticle.class);
        query.setMaxResults(5);

        List<TodayArticle> resultList = query.getResultList();

        return null;

    }

    @Override
    public List<Field> findField(){
        if(em ==null) System.out.println("em 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\nem 없ㅡㅇ\n");

        TypedQuery<Object[]> query = em.createQuery("Select m From Field m",Object[].class);
        return null;
    }
}
