package agentmaster.newstock.dto.articlePage.mainPage;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PreviewArticle {
    private Long articleId;
    private String company;
    private String title;
    private Long fieldId;

    public PreviewArticle(Long articleId, String company, String title, Long fieldId){
        this.articleId = articleId;
        this.company = company;
        this.title = title;
        this.fieldId = fieldId;
    }
}
