package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FlowArticle {

    private final Long articleId;
    private final String title;
    private final String articleSummary;

    public FlowArticle(Long id, String title, String articleSummary){
        this.articleId = id;
        this.title = title;
        this.articleSummary = articleSummary;
    }
}
