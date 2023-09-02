package AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage;

import lombok.Data;

@Data
public class StockBase {
    private Integer stockDiff;
    private Integer stockStartPrice;
    private Integer stockhighPrice;
    private Integer stocklowPrice;
    private Integer stockTradingAmount;
    private Integer stockTradingTotalPrice;
}
