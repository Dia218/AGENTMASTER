package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

import java.sql.Date;




@Getter
public class StockRanking {
    private final String stockCode;
    private final String stockName;
    private final String fieldName;
    private final Date stockDate;
    private final Integer stockPrice;
    private final Integer stockDiff;
    private final Double stockRange;

    public StockRanking(String stockCode, String stockName, String fieldName,Date stockDate ,Integer stockprice, Integer stockDiff, Double stockRange){
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.fieldName = fieldName;
        this.stockDate =stockDate;
        this.stockPrice = stockprice;
        this.stockDiff = stockDiff;
        this.stockRange = stockRange;
    }
}
