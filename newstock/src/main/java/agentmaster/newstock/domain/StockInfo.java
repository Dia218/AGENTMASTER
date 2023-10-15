package agentmaster.newstock.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class StockInfo {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue
    @Column (name = "stock_info")
    private Long id;

    private LocalDateTime stockDate;
    private int stockPrice;
    private int diffFromPrevday; //이게 뭔지를 모르겠다.
    private double stockRange;
    private int highPrice;
    private int lowPrice;
    private int tradingVolume;
    private int transactionAmount;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "stock_id")
    private Stock stock;
}
