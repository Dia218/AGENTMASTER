package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade;

import lombok.Data;

@Data
public class StockDetail {
    private Integer stockPrice;
    private Double stockRange;
    private Integer stockAmount;
    private Integer stockStartPrice;
    private Integer stockHighPrice;
    private Integer stockLowPrice;
}
