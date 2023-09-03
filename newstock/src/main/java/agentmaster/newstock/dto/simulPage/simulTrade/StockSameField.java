package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StockSameField {
    private String stockName;
    private Integer stockPrice;
    private Integer stockDiff;
    private Double stockRange;
}
