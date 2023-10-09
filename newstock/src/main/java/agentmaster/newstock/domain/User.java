package agentmaster.newstock.domain;

import lombok.Cleanup;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="\"User\"")
@Getter @Setter
public class User {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "user_id")
    private Long id;

    @Column (name = "user_name")
    private String name;

    @Column (name = "password")
    private String password;
    @Column (name = "e_mail")
    private String email;

    @Column (name = "total_money")
    private int totalMoney;

    @Column (name = "yesterday_money")
    private int yesterdayMoney;

    @Column (name = "simul_money")
    private int simulMoney;

    @Column (name = "stock_money")
    private int stockMoney;

//    @Column (name = "total_return")
//    private int totalReturn;

    @Column (name = "rank_range")
    private double rankRange;

    @OneToMany (mappedBy = "user")
    private List<Simulation> simulations = new ArrayList<>();

    @OneToMany (mappedBy = "user")
    private List<ArticleScrap> articleScraps = new ArrayList<>();
}
