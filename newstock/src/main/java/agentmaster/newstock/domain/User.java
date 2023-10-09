package agentmaster.newstock.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class User {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "user_id")
    private Long id;

    @Column (name = "user_name")
    private String name;
    private String password;
    @Lob // DB타입이 TEXT이므로 값이 굉장히 크기에 이를 사용 (Lob은 내부에서 String 타입일 경우 CLob으로 변경 됨
    @Column (name = "e_mail")
    private String email;
    private int totalMoney;
    private int yesterdayMoney;
    private int simulMoney;
    private int stockMoney;
    private int totalReturn;
    private double rankRange;

    @OneToMany (mappedBy = "user")
    private List<Simulation> simulations = new ArrayList<>();

    @OneToMany (mappedBy = "user")
    private List<ArticleScrap> articleScraps = new ArrayList<>();
}
