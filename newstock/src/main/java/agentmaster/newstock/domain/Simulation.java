package agentmaster.newstock.domain;

import agentmaster.newstock.user.entitiy.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Simulation {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "simulation_id")
    private Long id;

    private int simulReturn;

    //이것과 rankRange의 차이점을 모르겠음. 따라서 수정을 현재는 안했으나 두개가 같다면 db를 정리하여 엔티티 수정예정
    private double simulRange;

    private int simulHoldings;
    private int purchaseAmount;
    private int averagePrice;

    /**
     * fetch = FetchType.LAZY
     * 이것은 지연로딩이다.
     * 동작과정은 다음과 같다. simulation은 db에 쿼리가 날라가고 영속성 컨텍스트에 저장된다.
     * 허나 user와 stock은 proxy(가짜) 객체가 저장되고 실제 사용될 시 영속성 컨텍스트에서 초기화 하여 작업을 진행한다.
     * 따라서 다음을 주의해야한다.
     * 작업할 때 영속성 컨텍스트(EntityManeger)를 지우거나 defetch를 할경우 에러가 바로 발생하므로 주의
     */
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "user_id")
    private User user;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "stock_id")
    private Stock stock;

}
