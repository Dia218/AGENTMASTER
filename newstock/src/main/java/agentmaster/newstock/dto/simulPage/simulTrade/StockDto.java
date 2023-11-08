package agentmaster.newstock.dto.simulPage.simulTrade;


import lombok.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StockDto {

    private String stockCode; // 주식코드
    private String stockName; // 주식이름
    private Integer stockPrice; // 현재가
    private Integer highPrice; // 고가
    private Integer lowPrice; // 저가
    private BigInteger tradingVolume; // 총 거래대금
    private BigInteger transactionAmount; // 총 거래량
    private BigDecimal stockRange; // 변화율
    private Integer diffFromPreday; // 변화금액
    private LocalDateTime stockDate; // 거래 날짜



    public String getStockCode(){
        return this.stockCode;
    }

    public BigDecimal getTradePrice(){
        return BigDecimal.valueOf(this.stockPrice);
    }


}

