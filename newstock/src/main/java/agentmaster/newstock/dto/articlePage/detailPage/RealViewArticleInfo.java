package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RealViewArticleInfo {
    private String articleSummary;
    private String link;
}
