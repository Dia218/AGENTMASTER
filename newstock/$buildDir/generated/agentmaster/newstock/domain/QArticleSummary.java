package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleSummary is a Querydsl query type for ArticleSummary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleSummary extends EntityPathBase<ArticleSummary> {

    private static final long serialVersionUID = 1261891337L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleSummary articleSummary1 = new QArticleSummary("articleSummary1");

    public final QArticle article;

    public final StringPath articleSummary = createString("articleSummary");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QArticleSummary(String variable) {
        this(ArticleSummary.class, forVariable(variable), INITS);
    }

    public QArticleSummary(Path<? extends ArticleSummary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleSummary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleSummary(PathMetadata metadata, PathInits inits) {
        this(ArticleSummary.class, metadata, inits);
    }

    public QArticleSummary(Class<? extends ArticleSummary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

