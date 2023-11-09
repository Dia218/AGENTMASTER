package agentmaster.newstock.dto.articlePage.detailPage;


import lombok.Builder;
import lombok.Getter;


@Getter
public class RelationArticle {
    private final Long articleId;
    private final String title;

    public RelationArticle(Long articleId, String title){
        this.articleId = articleId;
        this.title = title;
    }
}
