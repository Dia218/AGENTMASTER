package AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage;

import lombok.Data;

@Data
public class ChartData {
    private String stockId;
    private String stockName;
    private String stockField;
    private String stockDate;
    private Integer stockPrice;
    private Integer stockDiff;
    private Double stockRange;
}
