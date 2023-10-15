package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class StockRanking {
    private String stockCode;
    private String stockName;
    private String fieldName;
    private Integer stockPrice;
    private Integer stockDiff;
}
