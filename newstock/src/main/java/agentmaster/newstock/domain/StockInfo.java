package agentmaster.newstock.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "\"Stock_info\"")
@Getter @Setter
public class StockInfo {

    // 현재 DB는 H2를 이용하기에 AUTO(디폴트 값)을 이용중 추후 POSTGRE를 이용시 다음과 같이 수정
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "stock_info_id")
    private Long id;

    //Time을 쓰지 않음으로 LocalDateTime 보단 LocalDate가 나음
    @Column (name = "stock_date")
    private LocalDate stockDate;
    @Column (name = "stock_price")
    private int stockPrice;
    @Column (name = "diff_from_prevday")
    private int diffFromPrevday; //이게 뭔지를 모르겠다.
    @Column (name = "stock_range")
    private double stockRange;

    //설계상으로 존재하는 값이기때문에 필요함.
    @Column (name = "start_price")
    private double startPrice;
    @Column (name = "high_price")
    private int highPrice;
    @Column (name = "low_price")
    private int lowPrice;
    @Column (name = "trading_volume")
    private Long tradingVolume;
    @Column (name = "transaction_amount")
    private Long transactionAmount;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "stock_id")
    private Stock stock;
}
