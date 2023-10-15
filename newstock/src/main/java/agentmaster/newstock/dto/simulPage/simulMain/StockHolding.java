package agentmaster.newstock.dto.simulPage.simulMain;

import lombok.Builder;
import lombok.Getter;


@Getter
public class StockHolding {
    private final String stockName;
    private final Integer averagePrice;
    private final Integer simulReturn;
    private final Double simulRange;
    private final Integer simulHoldings;

    public StockHolding(String stockName, Integer averagePrice, Integer simulReturn, Double simulRange, Integer simulHoldings){
        this.stockName = stockName;
        this.averagePrice = averagePrice;
        this.simulReturn = simulReturn;
        this.simulRange = simulRange;
        this.simulHoldings = simulHoldings;
    }
}
