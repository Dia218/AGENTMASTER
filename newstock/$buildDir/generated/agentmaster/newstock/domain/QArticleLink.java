package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleLink is a Querydsl query type for ArticleLink
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleLink extends EntityPathBase<ArticleLink> {

    private static final long serialVersionUID = 1974950775L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleLink articleLink = new QArticleLink("articleLink");

    public final QArticle article;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath link = createString("link");

    public QArticleLink(String variable) {
        this(ArticleLink.class, forVariable(variable), INITS);
    }

    public QArticleLink(Path<? extends ArticleLink> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleLink(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleLink(PathMetadata metadata, PathInits inits) {
        this(ArticleLink.class, metadata, inits);
    }

    public QArticleLink(Class<? extends ArticleLink> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

