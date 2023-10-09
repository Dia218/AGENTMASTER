package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Getter
public class KeyWordStock {
    private final Long stockId;
    private final String stockCode;
    private final String stockName;

    public KeyWordStock(Long stockId,String stockCode, String StockName){
        this.stockId = stockId;
        this.stockCode = stockCode;
        this.stockName = stockCode;
    }
}
