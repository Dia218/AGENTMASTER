package AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.searchPage;


import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Builder
@Getter
public class SearchArticle {
    private Long articleId;
    private String company;
    private Timestamp firstPub;
    private String title;
}
