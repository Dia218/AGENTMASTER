package agentmaster.newstock.domain;

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

    private static final long serialVersionUID = 685213632L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSimulation simulation = new QSimulation("simulation");

    public final NumberPath<Integer> averagePrice = createNumber("averagePrice", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> purchaseAmount = createNumber("purchaseAmount", Integer.class);

    public final NumberPath<Integer> simulHoldings = createNumber("simulHoldings", Integer.class);

    public final NumberPath<Double> simulRange = createNumber("simulRange", Double.class);

    public final NumberPath<Integer> simulReturn = createNumber("simulReturn", Integer.class);

    public final QStock stock;

    public final agentmaster.newstock.user.entitiy.QUser user;

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
        this.stock = inits.isInitialized("stock") ? new QStock(forProperty("stock"), inits.get("stock")) : null;
        this.user = inits.isInitialized("user") ? new agentmaster.newstock.user.entitiy.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

