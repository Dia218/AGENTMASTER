package agentmaster.newstock.domain;

import lombok.Cleanup;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Clob;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"Article\"")
@Getter @Setter
public class Article {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "article_id")
    private Long id;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "article_link_id")
    private ArticleLink articleLink;

    @Column (name = "company")
    private String company;

    @Column (name = "reporter")
    private String reporter;


    @Column (name = "title",columnDefinition = "TEXT")
    private String title;

    @Column (name = "first_pub")
    private LocalDateTime firstPub;

    @Column (name = "last_pub")
    private LocalDateTime lastPub;

    private String body;


    //@OneToOne (mappedBy = "article", fetch = FetchType.LAZY)


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
