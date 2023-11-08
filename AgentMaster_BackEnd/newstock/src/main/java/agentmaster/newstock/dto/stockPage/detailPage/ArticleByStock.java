package agentmaster.newstock.dto.stockPage.detailPage;



import lombok.Builder;
import lombok.Getter;


@Getter
public class ArticleByStock {
    private final Long id;
    private final String title;
    private final String publisher;
    private String summary;
    public ArticleByStock(Long articleId, String title, String company){
        this.id = articleId;
        this.title = title;
        this.publisher = company;
    }

    public void setSummary(String summary){
        this.summary = summary;
    }
}
