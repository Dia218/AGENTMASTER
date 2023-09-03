package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TradeRequest {
    private Long userId;
    private Long stockId;
    private Integer tradePrice;
    private Integer tradeNum;

}
