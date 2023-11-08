package agentmaster.newstock.simulation.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SimulationRequest {

    @NotEmpty
    private String stockName;
    @NotEmpty
    private String stockCode;
    @Positive
    private Double volume;
    @NotEmpty
    @Positive
    private String price;
    @NotEmpty
    private String type;
}
