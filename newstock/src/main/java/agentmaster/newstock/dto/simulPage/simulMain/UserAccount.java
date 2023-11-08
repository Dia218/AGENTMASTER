package agentmaster.newstock.dto.simulPage.simulMain;


import lombok.Builder;
import lombok.Getter;


@Getter
public class UserAccount {
    private final Integer totalMoney;
    private final Integer simulMoney;
    private final Integer stockMoney;
    private final Integer simulHoldingNum;

    public UserAccount(Integer totalMoney, Integer simulMoney, Integer stockMoney, Integer simulHoldingNum){
        this.totalMoney = totalMoney;
        this.simulMoney = simulMoney;
        this.stockMoney = stockMoney;
        this.simulHoldingNum = simulHoldingNum;
    }
}
