package AgentMasterBackEnd.AgentMasterBackEnd.repository;

import AgentMasterBackEnd.AgentMasterBackEnd.domain.Article;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Customer;
import AgentMasterBackEnd.AgentMasterBackEnd.domain.Stock;

import java.util.List;

public interface ArticleRepository {
    //기본 뉴스 기사 반환 변수
    public List<Article> findArticlesByBase();


    //기사 상세 페이지 기사 정보 반환
    public List<Article> findFullArticle(Article article);

    //기사 검색 페이지 기사 정보 반환
    public List<Article> findArticlesByKeyword(Article article);
    //스크랩 기사 반환
    public List<Article> findArticlesByScrap(Customer customer);
    //연관(동일 분야) 기사 반환
    public List<Article> findArticlesByField(Article article);
    //동일 사건 흐름 기사 반환
    public List<Article> findArticlesByFlow(Article article);

    //오늘의 기사 반환
    public List<Article> findTodayArticles();

    //주식 관련 기사 반환
    public List<Article> findArticlesByStock(Stock stock);
    //사건 흐름 정보 반환
    public List<Article> findFlowArticles(Article article);

    //스크랩 
    public void createArticleScrap();
    //스크랩 취소
    public void deleteArticleScrap();
}
