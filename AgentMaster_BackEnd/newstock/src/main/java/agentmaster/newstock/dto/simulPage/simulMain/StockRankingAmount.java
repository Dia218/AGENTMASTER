package agentmaster.newstock.dto.simulPage.simulMain;

import lombok.Getter;

@Getter
public class StockRankingAmount {
    private final Long stockId;
    private final String stockCode;
    private final String stockName;
    private final Integer stockPrice;
    private final Integer stockDiff;
    private final Double stockRange;

    public StockRankingAmount(Long stockId, String stockCode, String stockName, Integer stockPrice, Integer stockDiff, Double stockRange){
        this.stockId = stockId;
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.stockPrice =stockPrice;
        this.stockDiff = stockDiff;
        this.stockRange = stockRange;
    }
}