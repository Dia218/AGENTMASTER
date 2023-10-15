package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticle is a Querydsl query type for Article
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticle extends EntityPathBase<Article> {

    private static final long serialVersionUID = 887582173L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticle article = new QArticle("article");

    public final QArticleGroup articleGroup;

    public final QArticleLink articleLink;

    public final ListPath<ArticleSummary, QArticleSummary> articleSummaries = this.<ArticleSummary, QArticleSummary>createList("articleSummaries", ArticleSummary.class, QArticleSummary.class, PathInits.DIRECT2);

    public final StringPath body = createString("body");

    public final StringPath company = createString("company");

    public final QField field;

    public final DateTimePath<java.time.LocalDateTime> firstPub = createDateTime("firstPub", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QIssueSummary issueSummary;

    public final DateTimePath<java.time.LocalDateTime> lastPub = createDateTime("lastPub", java.time.LocalDateTime.class);

    public final StringPath reporter = createString("reporter");

    public final StringPath title = createString("title");

    public QArticle(String variable) {
        this(Article.class, forVariable(variable), INITS);
    }

    public QArticle(Path<? extends Article> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticle(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticle(PathMetadata metadata, PathInits inits) {
        this(Article.class, metadata, inits);
    }

    public QArticle(Class<? extends Article> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.articleGroup = inits.isInitialized("articleGroup") ? new QArticleGroup(forProperty("articleGroup")) : null;
        this.articleLink = inits.isInitialized("articleLink") ? new QArticleLink(forProperty("articleLink"), inits.get("articleLink")) : null;
        this.field = inits.isInitialized("field") ? new QField(forProperty("field")) : null;
        this.issueSummary = inits.isInitialized("issueSummary") ? new QIssueSummary(forProperty("issueSummary")) : null;
    }

}

