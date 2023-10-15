package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TodayArticle {
    private final Long articleId;
    private final String title;
    private final String summary;

    public TodayArticle(Long articleId,String title, String summary){
        this.articleId = articleId;
        this.title = title;
        this.summary =summary;
    }
}
