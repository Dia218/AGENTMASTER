package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;

import lombok.Getter;


@Getter
public class FlowArticleSummary {
    private final String issueSummary;

    public FlowArticleSummary(String issueSummary){
        this.issueSummary = issueSummary;
    }
}
