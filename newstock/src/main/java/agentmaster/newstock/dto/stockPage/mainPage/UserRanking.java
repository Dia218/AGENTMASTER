package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserRanking {
    private Integer ranking;
    private String userName;
    private Double rankRange;
}
