package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class RealView {
    private final Long articleId;
    private final String title;
    private final String company;
    private final String repoter;
    private final Boolean isScrap;
    private final String articleSummary;
    private final String link;

}
