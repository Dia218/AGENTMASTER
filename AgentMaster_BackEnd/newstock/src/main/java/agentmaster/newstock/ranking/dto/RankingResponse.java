package agentmaster.newstock.ranking.dto;

import agentmaster.newstock.user.entitiy.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RankingResponse {

    private Long userId;
    private String name;
    private Long rankingId;
    private Integer rank;
    private Double profit;

    public RankingResponse(User user) {
        this.userId = user.getId();
        this.name = user.getName();
        this.rankingId = user.getRanking().getId();
        this.rank = user.getRanking().getRank();
        this.profit = Double.valueOf(String.format("%.2f", user.getRanking().getProfit()));
    }


}
