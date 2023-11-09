package agentmaster.newstock.simulationstock.entity;

import agentmaster.newstock.common.entity.BaseEntity;
import agentmaster.newstock.domain.Stock;
import agentmaster.newstock.simulation.entity.Simulation;
import agentmaster.newstock.user.entitiy.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

import static agentmaster.newstock.simulation.service.SimulationStatusConstants.TYPE_BUY;
import static agentmaster.newstock.simulation.service.SimulationStatusConstants.TYPE_SELL;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class SimulationStock extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "simulationStock_id")
    private Long id;
    private String stockName;
    private String stockCode;
    private String type;
    private String price;
    private Double volume;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "simulation_id")
    private Simulation simulation;

    @Builder
    public SimulationStock(String stockName, String stockCode, String type, String price, Double volume, User user, Simulation simulation) {
        this.stockName = stockName;
        this.stockCode = stockCode;
        this.type = type;
        this.price = price;
        this.volume = volume;
        this.user = user;
        this.simulation = simulation;
    }

    public void change(String type, Double volume, String price, Simulation simulation) {
        BigDecimal holdMultiply = new BigDecimal(this.price).multiply(BigDecimal.valueOf(this.volume));
        BigDecimal callMultiply = new BigDecimal(price).multiply(BigDecimal.valueOf(volume));
        BigDecimal add = holdMultiply.add(callMultiply);
        BigDecimal sub = holdMultiply.subtract(callMultiply);
        double volumeSell = this.volume - volume;
        double volumeBuy = this.volume + volume;
        if (TYPE_BUY.equals(type)) {
            this.volume = volumeBuy;
            this.price = String.valueOf(add.divide(BigDecimal.valueOf(volumeBuy), 2, RoundingMode.HALF_UP));
        } else if (TYPE_SELL.equals(type)) {
            if (volumeSell < 0) {
                throw new IllegalArgumentException();
            }

            this.volume = volumeSell;
            this.price = String.valueOf(sub.divide(BigDecimal.valueOf(volumeSell), 2, RoundingMode.HALF_UP));
        }

        this.simulation = simulation;

    }
}
