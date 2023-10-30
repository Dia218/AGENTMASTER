package agentmaster.newstock.user.entitiy;

import agentmaster.newstock.common.converter.BooleanToYnConverter;
import agentmaster.newstock.common.entity.BaseEntity;
import agentmaster.newstock.ranking.entity.Ranking;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "\"User\"")
public class User {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "user_id")
    private Long id;

    private String name;
    private String password;
    private String email;
    private BigDecimal availableAsset;
    private BigDecimal stockMoney;
    private String role;


    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ranking_id")
    private Ranking ranking;

    @Builder
    public User(String name, String password, String email, BigDecimal availableAsset, BigDecimal stockMoney, String role, Ranking ranking) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.availableAsset = availableAsset;
        this.role = role;
        this.ranking = ranking;
    }

    public void buy(String price, Double volume) {
        this.availableAsset = this.availableAsset.subtract(BigDecimal.valueOf(Double.valueOf(price) * volume));
    }

    public void sell(String price, Double volume) {
        this.availableAsset = this.availableAsset.add(BigDecimal.valueOf(Double.valueOf(price) * volume));
    }

    public static User createNullUser() {
        return new User();
    }
}
