package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade;

import lombok.Data;

@Data
public class StockSameField {
    private String stockName;
    private Integer stockPrice;
    private Integer simulReturn;
    private Double simulRate;
}
