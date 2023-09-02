package AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.mainPage;

import lombok.Data;

@Data
public class StockRanking {
    private String stockId;
    private String stockName;
    private String stockField;
    private Integer stockPrice;
    private Integer stockDiff;
    private Double stockRange;
}
