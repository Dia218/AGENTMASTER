package agentmaster.newstock.ranking.dto;

import agentmaster.newstock.ranking.entity.Ranking;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RankingDto {

    private Long id;
    private Integer rank;
    private Double profit;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY년 MM월 DD일", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY년 MM월 DD일", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public RankingDto(Ranking ranking) {
        this.id = ranking.getId();
        this.rank = ranking.getRank();
        this.profit = Double.valueOf(String.format("%.2f", ranking.getProfit()));
        this.createTime = ranking.getCreateTime();
        this.modifiedTime = ranking.getModifiedTime();
    }
}
