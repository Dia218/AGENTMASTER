package agentmaster.newstock.dto.simulPage.simulTrade;

import lombok.Builder;
import lombok.Getter;


@Getter
public class StockSameField {
    private final String stockName;
    private final Integer stockPrice;
    private final Integer stockDiff;
    private final Double stockRange;

    public StockSameField(String stockName, Integer stockPrice, Integer stockDiff, Double stockRange){
        this.stockName = stockName;
        this.stockPrice =stockPrice;
        this.stockDiff = stockDiff;
        this.stockRange = stockRange;
    }

}
