package agentmaster.newstock.dto.articlePage.mainPage;


import lombok.Builder;
import lombok.Getter;

@Getter
public class FluctuationStockInfo {
    private final String stockId;
    private final String stockName;
    private final Integer stockPrice;
    private final Integer diffFromPrevday;
    private final Double range;

    public FluctuationStockInfo(String stockCode, String stockName, Integer stockPrice, Integer stockDiff, Double stockRange){
        this.stockId = stockCode;
        this.stockName = stockName;
        this.stockPrice = stockPrice;
        this.diffFromPrevday = stockDiff;
        this.range = stockRange;
    }

}
