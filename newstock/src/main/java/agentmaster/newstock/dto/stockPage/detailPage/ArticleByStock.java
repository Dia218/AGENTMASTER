package agentmaster.newstock.dto.stockPage.detailPage;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ArticleByStock {
    private Long articleId;
    private String title;
}
