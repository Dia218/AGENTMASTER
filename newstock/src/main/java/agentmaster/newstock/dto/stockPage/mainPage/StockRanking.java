package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

import java.sql.Date;




@Getter
public class StockRanking {
    private final Integer rank;
    private final String stockCode;
    private final String stockName;
    private final String fieldName;
    private final Date stockDate;
    private final Integer stockPrice;
    private final Integer stockDiff;
    private final Double stockRange;
    private final Long stockVolume;

    public StockRanking(Integer rank,String stockCode, String stockName, String fieldName,Date stockDate ,Integer stockprice, Integer stockDiff, Double stockRange, Long stockVolume){
        this.rank = rank;
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.fieldName = fieldName;
        this.stockDate =stockDate;
        this.stockPrice = stockprice;
        this.stockDiff = stockDiff;
        this.stockRange = stockRange;
        this.stockVolume = stockVolume;
    }
}
