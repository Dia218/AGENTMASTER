package agentmaster.newstock.dto.stockPage.mainPage;

import lombok.Builder;
import lombok.Getter;


@Getter
public class UserRanking {
    private final Integer ranking;
    private final String userName;
    private final Double rankRange;

    @Builder
    public UserRanking(String userName, Double rankRange,Integer ranking){

        this.userName = userName;
        this.rankRange = rankRange;
        this.ranking = ranking;
    }
}
