package agentmaster.newstock.dto.simulPage.simulTrade;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StockDetail {
    private Integer stockPrice;
    private Integer highPrice;
    private Integer startPrice;
    private Integer lowPrice;
    private Long tradingVolume;
    private Double stockRange;
}
