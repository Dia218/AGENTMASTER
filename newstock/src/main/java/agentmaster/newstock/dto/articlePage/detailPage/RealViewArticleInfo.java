package agentmaster.newstock.dto.articlePage.detailPage;

import lombok.Builder;
import lombok.Getter;


@Getter
public class RealViewArticleInfo {
    private final String articleSummary;
    private  String link;

    public RealViewArticleInfo(String articleSummary, String link){
        this.articleSummary = articleSummary;
        this.link = link;
    }

    public void setLink(String link){
        this.link =link;
    }
}
