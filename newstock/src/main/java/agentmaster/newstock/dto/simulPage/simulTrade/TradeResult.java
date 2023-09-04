package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulTrade;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TradeResult {
    private Long userId;
    private Long stockId;
    //거래 이후 변동 주식 개수
    private Integer updateNum;
    //거래 이후 가용 자산
    private Integer updateSimulMoney;
    //거래 이후 평균 단가
    private Integer updateAveragePrice;
}
