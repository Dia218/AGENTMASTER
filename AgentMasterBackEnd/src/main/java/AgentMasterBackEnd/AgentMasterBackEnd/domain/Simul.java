package AgentMasterBackEnd.AgentMasterBackEnd.domain;

import lombok.Data;

@Data
public class Simul {
    //랭킹용 수익률
    private Double rankRange;
    //등수
    private Integer rank;
    //고객 총 자산
    private Integer totalMoney;
    //고객 총 모의주식 자산
    private Integer simulMoney;
    //종목 보유수
    private Integer countTotalStock;
    //평균단가
    private Double purchaseAmount;
    //종목별 보유 주식 수
    private Integer simulHoldings;
}

