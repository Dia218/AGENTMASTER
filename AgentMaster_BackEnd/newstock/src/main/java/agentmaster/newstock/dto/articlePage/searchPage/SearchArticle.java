package agentmaster.newstock.dto.articlePage.searchPage;


import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Getter
public class SearchArticle {
    private final Long articleId;
    private final String company;
    private final LocalDateTime firstPub;
    private final LocalDateTime lastPub;
    private final String title;

    public SearchArticle(Long articleId, String company, LocalDateTime firstPub, LocalDateTime lastPub, String title){
        this.articleId = articleId;
        this.company = company;
        this.firstPub = firstPub;
        this.lastPub = lastPub;
        this.title = title;
    }
}
