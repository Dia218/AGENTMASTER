package agentmaster.newstock.simulationstock.response;

import agentmaster.newstock.simulationstock.entity.SimulationStock;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import springfox.documentation.spring.web.json.Json;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class SimulationStockDto {

    private Long id;
    private String stockName;
    private String stockCode;
    private String type;
    private String price;
    private Double volume;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY년 MM월 DD일", timezone = "Asia/Seoul")
    private LocalDateTime createTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY년 MM월 DD일", timezone = "Asia/Seoul")
    private LocalDateTime modifiedTime;

    public SimulationStockDto(SimulationStock simulationStock) {
        this.id = simulationStock.getId();
        this.stockName = simulationStock.getStockName();
        this.stockCode = simulationStock.getStockCode();
        this.type = simulationStock.getType();
        this.price = simulationStock.getPrice();
        this.volume = simulationStock.getVolume();
        this.createTime = simulationStock.getCreateTime();
        this.modifiedTime = simulationStock.getModifiedTime();
    }
}
