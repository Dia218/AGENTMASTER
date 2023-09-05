package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RealViewArticle {
    private Long articleId;
    private String title;
    private String company;
    private String repoter;
    private Boolean isScrap;
}
