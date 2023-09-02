package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain;

import lombok.Data;

@Data
public class StockTop10 {
    private String stockId;
    private String stockName;
    private Integer stockPrice;
    private Integer stockDiff;
    private Double stockRange;
}
