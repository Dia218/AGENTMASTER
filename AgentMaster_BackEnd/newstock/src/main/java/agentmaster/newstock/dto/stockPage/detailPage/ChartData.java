package agentmaster.newstock.dto.stockPage.detailPage;

import lombok.Builder;
import lombok.Getter;

import java.sql.Date;
import java.time.LocalDate;


@Getter
public class ChartData {
    private final String stockCode;
    private final String stockName;
    private final String feildName;
    private final Date stockDate;
    private final Integer stockPrice;
    private final Integer stockDiff;
    private final Double stockRange;

    public ChartData(String stockCode, String stockName, String feildName, Date stockDate, Integer stockPrice, Integer stockDiff, Double stockRange){
        this.stockCode= stockCode;
        this.stockName = stockName;
        this.feildName = feildName;
        this.stockDate = stockDate;
        this.stockPrice = stockPrice;
        this.stockDiff = stockDiff;
        this.stockRange = stockRange;
    }
}
