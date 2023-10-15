package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class KeyWordStock {
    private String stockCode;
    private String stockName;
}
