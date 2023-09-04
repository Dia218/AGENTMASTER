package AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TodayArticle {
    private String company;
    private String article_summary;
}
