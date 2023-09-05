package agentmaster.newstock.dto.simulPage.simulMain;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StockHolding {
    private String stockName;
    private Integer averagePrice;
    private Integer simulReturn;
    private Double simulRange;
    private Integer simulHoldings;
}
