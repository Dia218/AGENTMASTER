package agentmaster.newstock.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class ArticleGroup {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "artice_gropu_id")
    private Long id;

    private String groupName;

    @OneToMany (mappedBy = "articleGroup")
    private List<Article> articles = new ArrayList<>();
}
