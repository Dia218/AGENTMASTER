package AgentMasterBackEnd.AgentMasterBackEnd.domain;

import lombok.Data;

import java.util.Date;

@Data
public class Article {
    private Integer articleId;
    private String title;
    private String repoter;
    private String company;
    private String scrap;
    private String flowSummary;
    private String fieldName;
    private Date firstPub;
    private Date lastPub;
    private String link;
}
