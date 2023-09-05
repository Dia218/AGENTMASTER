package agentmaster.newstock.dto.stockPage.detailPage;


import lombok.Builder;
import lombok.Getter;


//주식 상세 페이지 주식 정보 반환
@Builder
@Getter
public class StockBase {
    private String stockPrice;
    private Integer highPrice;
    private Integer startPrice;
    private Integer lowPrice;
    private Long tradingVolume;
    private Long transactionAmount;
}
