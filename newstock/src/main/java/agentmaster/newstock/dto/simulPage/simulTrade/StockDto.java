package agentmaster.newstock.dto.simulPage.simulTrade;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class StockDto {

    private String stockCode; // 주식코드
    private String stockName; // 주식이름
    private BigDecimal stockPrice; // 현재가
    private BigDecimal highPrice; // 고가
    private BigDecimal lowPrice; // 저가
    private BigDecimal tradingVolume; // 총 거래대금
    private BigDecimal transactionAmount; // 총 거래량
    private BigDecimal stockRange; // 변화율
    private BigDecimal diffFromPreday; // 변화금액
    private LocalDateTime stockDate; // 거래 날짜

    @Builder
    public StockDto(String stockCode, String stockName, BigDecimal stockPrice, BigDecimal highPrice, BigDecimal lowPrice, BigDecimal tradingVolume, BigDecimal transactionAmount, BigDecimal stockRange, BigDecimal diffFromPreday) {
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.stockPrice = stockPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.tradingVolume = tradingVolume;
        this.transactionAmount = transactionAmount;
        this.stockRange = stockRange;
        this.diffFromPreday = diffFromPreday;
        this.stockDate = LocalDateTime.now();
    }

    public String getStockCode(){
        return this.stockCode;
    }

    public BigDecimal getTradePrice(){
        return this.stockPrice;
    }


}

