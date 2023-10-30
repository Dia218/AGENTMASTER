package agentmaster.newstock.simulation.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotEmpty
    private String userName;
    @NotEmpty
    private String stockName;
    @Positive
    private Double amount;
    @NotEmpty
    @Positive
    private String currentPrice;
}
