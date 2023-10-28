package agentmaster.newstock.simulation.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSimulation is a Querydsl query type for Simulation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSimulation extends EntityPathBase<Simulation> {

    private static final long serialVersionUID = 846099292L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSimulation simulation = new QSimulation("simulation");

    public final agentmaster.newstock.common.entity.QBaseEntity _super = new agentmaster.newstock.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedTime = _super.modifiedTime;

    public final StringPath price = createString("price");

    public final StringPath status = createString("status");

    public final StringPath stockCode = createString("stockCode");

    public final StringPath stockName = createString("stockName");

    public final StringPath type = createString("type");

    public final agentmaster.newstock.user.entitiy.QUser user;

    public final NumberPath<Double> volume = createNumber("volume", Double.class);

    public QSimulation(String variable) {
        this(Simulation.class, forVariable(variable), INITS);
    }

    public QSimulation(Path<? extends Simulation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSimulation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSimulation(PathMetadata metadata, PathInits inits) {
        this(Simulation.class, metadata, inits);
    }

    public QSimulation(Class<? extends Simulation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new agentmaster.newstock.user.entitiy.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

