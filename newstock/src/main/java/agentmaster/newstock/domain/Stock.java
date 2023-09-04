package agentmaster.newstock;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Stock {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "stock_id")
    private Long id;

    /**
     * 개체-관계다이어그램에서는 아래 2개를 유니크로 지정하였다.
     * 지정하려면 할 수 있으나 보통은 일대일 관계일 때 외래키에 유니크를 같이 집어넣는 것이 디폴트값이다.
     * 혼란이 생길 수 있으므로 우선은 제약조건을 DB에서만 지정하고 JPA에서는 지정하지 않으려 한다.
     */
    private String stockCode;
    private String stockName;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "field_id")
    private Field field;

    /**
     * 아래는 우선 주식테이블은 모의투자 테이블을 참조할 필요가 없을 것이라고 생각하였기에 주석처리 하였으나
     * 이는 판단에 맡기도록 하겠다.
     */
//    @OneToMany (mappedBy = "stock")
//    private List<Simulation> simulations = new ArrayList<>();

    /**
     *  주식정보 테이블과 생명주기를 일치시켰다
     *  즉 주식테이블만 저장되어도 주식정보 테이블도 같이 저장되고
     *  주식테이블이 삭제되면 주식정보테이블 내용도 삭제된다.
     */
    @OneToMany (mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StockInfo> stockInfos = new ArrayList<>();


}
