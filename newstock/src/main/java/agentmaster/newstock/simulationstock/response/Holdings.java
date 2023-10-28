package agentmaster.newstock.simulationstock.response;

import agentmaster.newstock.user.response.UserDto;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class Holdings {
    private List<UserDto> user;
    private List<SimulationStockDto> simulationStocks;
    private BigDecimal totalTradePrice;

    @Builder
    public Holdings(UserDto user,List<SimulationStockDto> simulationStocks, BigDecimal totalTradePrice) {
        this.user = List.of(user);
        this.simulationStocks = simulationStocks;
        this.totalTradePrice = totalTradePrice;
    }
}
