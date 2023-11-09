package agentmaster.newstock.dto.simulPage.simulMain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StockHoldingData {
    private Double simulRange;
    private Double simulReturn;
    private Double PurchasePrice;
    private Double stockAveragePrice;
    private Integer AvailableAsset;
    private Double simulHoldingsum;
}
