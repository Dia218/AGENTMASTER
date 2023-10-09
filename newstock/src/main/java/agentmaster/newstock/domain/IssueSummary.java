package agentmaster.newstock.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class IssueSummary {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "issue_summary_id")
    private Long id;

    private String issueKeyword;
    private String issueSummary;

    @OneToMany(mappedBy = "issueSummary")
    private List<Article> articles = new ArrayList<>();
}
