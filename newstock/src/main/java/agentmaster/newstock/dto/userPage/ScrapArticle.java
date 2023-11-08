package agentmaster.newstock.dto.userPage;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Getter
public class ScrapArticle {
    private final Long id;
    private final String title;
    private final String author;
    private final LocalDateTime date;
    private final String url;

    public ScrapArticle(Long articleId, String title, String reporter, LocalDateTime firstPub, String url){
        this.id = articleId;
        this.title = title;
        this.author = reporter;
        this.date = firstPub;
        this.url = url;
    }
}
