package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;


@Getter
public class RealViewArticle {
    private final Long articleId;
    private final String title;
    private final String company;
    private final String repoter;
    private final Boolean isScrap;

    public RealViewArticle(Long articleId, String title, String company, String repoter, Boolean isScrap){
        this.articleId = articleId;
        this.title = title;
        this.company = company;
        this.repoter = repoter;
        this.isScrap = isScrap;
    }
}
