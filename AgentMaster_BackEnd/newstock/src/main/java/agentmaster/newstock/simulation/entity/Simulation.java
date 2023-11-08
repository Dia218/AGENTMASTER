package agentmaster.newstock.simulation.entity;

import agentmaster.newstock.common.converter.BooleanToYnConverter;
import agentmaster.newstock.common.entity.BaseEntity;
import agentmaster.newstock.simulationstock.entity.SimulationStock;
import agentmaster.newstock.user.entitiy.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(
        indexes = {
                @Index(name = "idx_status", columnList = "status"),
        }
)
public class Simulation extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;
    private String stockName;
    private String stockCode;
    private String type;
    private String status;
    private String price;
    private Double volume;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Builder
    public Simulation(String stockName, String stockCode, String type, String status, String price, Double volume, User user) {
        this.stockName = stockName;
        this.stockCode = stockCode;
        this.type = type;
        this.status = status;
        this.price = price;
        this.volume = volume;
        this.user = user;
    }

    public void changeStatus(String status) {
        this.status = status;
    }
}
