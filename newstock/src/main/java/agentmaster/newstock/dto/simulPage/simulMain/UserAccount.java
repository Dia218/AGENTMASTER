package AgentMasterBackEnd.AgentMasterBackEnd.dto.simulPage.simulMain;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserAccount {
    private Integer totalMoney;
    private Integer simulMoney;
    private Integer stockMoney;
    private Integer simulHoldingNum;
}
