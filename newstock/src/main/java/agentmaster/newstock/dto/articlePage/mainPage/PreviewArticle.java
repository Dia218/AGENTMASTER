package AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.mainPage;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PreviewArticle {
    private Long articleId;
    private String company;
    private String title;
    private String fieldName;
}
