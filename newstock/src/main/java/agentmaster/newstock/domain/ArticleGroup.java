package agentmaster.newstock.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"Article_group\"")
@Getter @Setter
public class ArticleGroup {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "article_group_id")
    private Long id;

    @Column (name = "group_name")
    private String groupName;

    @OneToMany (mappedBy = "articleGroup")
    private List<Article> articles = new ArrayList<>();
}
