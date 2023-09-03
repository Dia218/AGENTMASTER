package AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FlowArticle {
    private Long articleId;
    private String title;
    private String articleSummary;
}
