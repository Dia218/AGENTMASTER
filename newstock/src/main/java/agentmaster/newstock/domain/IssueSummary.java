package agentmaster.newstock.domain;

import agentmaster.newstock.domain.Article;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"Issue_summary\"")
@Getter @Setter
public class IssueSummary {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "issue_summary_id")
    private Long id;

    @Column (name = "issue_keyword")
    private String issueKeyword;

    @Column (name = "issue_summary")
    private String issueSummary;

    @OneToMany(mappedBy = "issueSummary")
    private List<Article> articles = new ArrayList<>();
}
