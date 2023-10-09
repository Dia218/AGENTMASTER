package agentmaster.newstock.dto.stockPage.detailPage;



import lombok.Builder;
import lombok.Getter;


@Getter
public class ArticleByStock {
    private final Long articleId;
    private final String summary;

    public ArticleByStock(Long articleId, String summary){
        this.articleId = articleId;
        this.summary = summary;
    }
}
