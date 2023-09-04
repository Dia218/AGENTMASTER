package AgentMasterBackEnd.AgentMasterBackEnd.dto.articlePage.mainPage;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FluctuationStockInfo {
    private String stockCode;
    private String stockName;
    private Integer stockPrice;
    private Integer stockDiff;
    private Double stockRange;
}
