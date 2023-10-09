package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TodayArticle {
    private final String company;
    private final String articleSummary;

    public TodayArticle(String company, String articleSummary){
        this.company = company;
        this.articleSummary =articleSummary;
    }
}
