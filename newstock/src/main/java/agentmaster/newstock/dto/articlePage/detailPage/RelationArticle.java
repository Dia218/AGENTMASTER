package AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.detailPage;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RelationArticle {
    private Long articleId;
    private String title;
}
