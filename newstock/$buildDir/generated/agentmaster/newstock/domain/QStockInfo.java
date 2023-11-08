package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStockInfo is a Querydsl query type for StockInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockInfo extends EntityPathBase<StockInfo> {

    private static final long serialVersionUID = -1023780853L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStockInfo stockInfo = new QStockInfo("stockInfo");

    public final NumberPath<Integer> diffFromPrevday = createNumber("diffFromPrevday", Integer.class);

    public final NumberPath<Integer> highPrice = createNumber("highPrice", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> lowPrice = createNumber("lowPrice", Integer.class);

    public final NumberPath<Integer> startPrice = createNumber("startPrice", Integer.class);

    public final QStock stock;

    public final DatePath<java.time.LocalDate> stockDate = createDate("stockDate", java.time.LocalDate.class);

    public final NumberPath<Integer> stockPrice = createNumber("stockPrice", Integer.class);

    public final NumberPath<Double> stockRange = createNumber("stockRange", Double.class);

    public final NumberPath<Long> tradingVolume = createNumber("tradingVolume", Long.class);

    public final NumberPath<Long> transactionAmount = createNumber("transactionAmount", Long.class);

    public QStockInfo(String variable) {
        this(StockInfo.class, forVariable(variable), INITS);
    }

    public QStockInfo(Path<? extends StockInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStockInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStockInfo(PathMetadata metadata, PathInits inits) {
        this(StockInfo.class, metadata, inits);
    }

    public QStockInfo(Class<? extends StockInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.stock = inits.isInitialized("stock") ? new QStock(forProperty("stock"), inits.get("stock")) : null;
    }

}

