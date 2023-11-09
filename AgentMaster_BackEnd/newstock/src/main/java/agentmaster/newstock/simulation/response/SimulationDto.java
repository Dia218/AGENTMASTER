package agentmaster.newstock.simulation.response;

import agentmaster.newstock.simulation.entity.Simulation;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SimulationDto {

    private Long id;
    private String stockName;
    private String stockCode;
    private String type;
    private String status;
    private String price;
    private Double volume;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY년 MM월 DD일", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY년 MM월 DD일", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public SimulationDto(Simulation simulation) {
        this.id = simulation.getId();
        this.stockName = simulation.getStockName();
        this.stockCode = simulation.getStockCode();
        this.type = simulation.getType();
        this.status = simulation.getStatus();
        this.price = simulation.getPrice();
        this.volume = simulation.getVolume();
        this.createTime = simulation.getCreateTime();
        this.modifiedTime = simulation.getModifiedTime();
    }
}
