package agentmaster.newstock.dto.userPage;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Getter
public class ScrapArticle {
    private final Long articleId;
    private final String title;
    private final String reporter;
    private final LocalDateTime firstPub;

    public ScrapArticle(Long articleId, String title, String reporter, LocalDateTime firstPub){
        this.articleId = articleId;
        this.title = title;
        this.reporter = reporter;
        this.firstPub = firstPub;
    }
}
