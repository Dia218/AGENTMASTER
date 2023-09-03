package AgentMasterBackEnd.AgentMasterBackEnd.dto.userPage;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;

@Builder
@Getter
public class ScrapArticle {
    private Long articleId;
    private String title;
    private String reporter;
    private Timestamp first_pub;
}
