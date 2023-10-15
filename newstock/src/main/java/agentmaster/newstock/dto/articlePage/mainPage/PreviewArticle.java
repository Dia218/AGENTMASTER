package agentmaster.newstock.dto.articlePage.mainPage;


import lombok.Builder;
import lombok.Getter;

import javax.persistence.Lob;

@Builder
@Getter
public class PreviewArticle {
    private Long articleId;
    private String company;

    private String title;
    private String fieldName;

    public PreviewArticle(Long articleId, String company, String title, String fieldName){
        this.articleId = articleId;
        this.company = company;
        this.title = title;
        this.fieldName = fieldName;
    }
}
