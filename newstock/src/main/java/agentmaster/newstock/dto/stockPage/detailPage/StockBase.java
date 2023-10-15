package agentmaster.newstock.dto.stockPage.detailPage;


import lombok.Builder;
import lombok.Getter;

import java.sql.Date;


//주식 상세 페이지 주식 정보 반환

@Getter
public class StockBase {
    private final Date stockDate;
    private final Integer stockPrice;
    private final Integer stockDiff;
    private final Double stockRange;
    private final Integer stockStartPrice;
    private final Integer stockhighPrice;
    private final Integer stocklowPrice;
    private final Long stockTradingAmount;
    private final Long stockTradingTotalPrice;



    @Builder
    public StockBase(Date stockDate, Integer stockPrice, Integer stockDiff, Double stockRange, Integer startPrice, Integer highPrice, Integer lowPrice, Long tradingVolume, Long transactionAmount){
        this.stockDate = stockDate;
        this.stockPrice = stockPrice;
        this.stockDiff = stockDiff;
        this. stockRange =stockRange;
        this.stockStartPrice = startPrice;
        this.stockhighPrice = highPrice;
        this.stocklowPrice = lowPrice;
        this.stockTradingAmount = tradingVolume;
        this.stockTradingTotalPrice = transactionAmount;
    }
}
