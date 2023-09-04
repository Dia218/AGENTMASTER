package AgentMasterBackEnd.AgentMasterBackEnd.dto.stockPage.detailPage;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class ChartData {
    private String stockCode;
    private String stockName;
    private String feildName;
    private LocalDate stockDate;
    private Integer stockPrice;
    private Integer stockDiff;
    private Double stockRange;
}
