package agentmaster.newstock.simulationstock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSimulationStock is a Querydsl query type for SimulationStock
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSimulationStock extends EntityPathBase<SimulationStock> {

    private static final long serialVersionUID = -1745279564L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSimulationStock simulationStock = new QSimulationStock("simulationStock");

    public final agentmaster.newstock.common.entity.QBaseEntity _super = new agentmaster.newstock.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath price = createString("price");

    public final agentmaster.newstock.simulation.entity.QSimulation simulation;

    public final StringPath stockCode = createString("stockCode");

    public final StringPath stockName = createString("stockName");

    public final StringPath type = createString("type");

    public final agentmaster.newstock.user.entitiy.QUser user;

    public final NumberPath<Double> volume = createNumber("volume", Double.class);

    public QSimulationStock(String variable) {
        this(SimulationStock.class, forVariable(variable), INITS);
    }

    public QSimulationStock(Path<? extends SimulationStock> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSimulationStock(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSimulationStock(PathMetadata metadata, PathInits inits) {
        this(SimulationStock.class, metadata, inits);
    }

    public QSimulationStock(Class<? extends SimulationStock> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.simulation = inits.isInitialized("simulation") ? new agentmaster.newstock.simulation.entity.QSimulation(forProperty("simulation"), inits.get("simulation")) : null;
        this.user = inits.isInitialized("user") ? new agentmaster.newstock.user.entitiy.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

