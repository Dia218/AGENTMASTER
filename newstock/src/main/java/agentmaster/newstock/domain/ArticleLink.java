package agentmaster.newstock.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class ArticleLink {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "article_link_id")
    private Long id;

    @OneToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "article_id")
    private Article article;

    @Lob
    private String link;

}
