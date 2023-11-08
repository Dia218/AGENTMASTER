package agentmaster.newstock.dto.simulPage.simulTrade;

import lombok.Getter;

@Getter
public class StockInfo {
    private final String stockCode;
    private final String stockName;
    private final String fieldName;

    public StockInfo(String stockCode, String stockName, String fieldName){
        this.stockCode = stockCode;
        this.stockName = stockName;
        this.fieldName = fieldName;
    }
}
