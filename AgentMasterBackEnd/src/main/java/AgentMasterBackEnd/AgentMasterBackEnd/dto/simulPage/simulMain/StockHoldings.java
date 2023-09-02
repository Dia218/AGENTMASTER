package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain;

import lombok.Data;

@Data
public class StockHoldings {
    private String stockName;
    private Integer stockAveragePrice;
    private Integer simulReturn;
    private Double simulRange;
    private Integer simulHoldingsnum;
}
