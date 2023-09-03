package agentmaster.newstock;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Article {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "article_id")
    private Long id;

    private String company;
    private String repoter;
    @Lob
    private String title;
    private LocalDateTime firstPub;
    private LocalDateTime lastPub;
    @Lob
    private String body;

    @OneToOne (mappedBy = "article", fetch = FetchType.LAZY)
    private ArticleLink articleLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "issue_summary_id")
    private IssueSummary issueSummary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "article_group_id")
    private ArticleGroup articleGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name = "field_id")
    private Field field;

    @OneToMany (mappedBy = "article")
    private List<ArticleSummary> articleSummaries = new ArrayList<>();
}
