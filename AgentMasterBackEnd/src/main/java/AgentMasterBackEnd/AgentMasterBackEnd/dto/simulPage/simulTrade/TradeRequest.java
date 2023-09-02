package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade;

import lombok.Data;

@Data
public class TradeRequest {
    private String customerId;
    private String stockId;
    private Integer tradeAmount;
    private Integer tradePrice;
}
