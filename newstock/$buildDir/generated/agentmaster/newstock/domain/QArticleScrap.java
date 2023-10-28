package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleScrap is a Querydsl query type for ArticleScrap
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleScrap extends EntityPathBase<ArticleScrap> {

    private static final long serialVersionUID = 1100221428L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleScrap articleScrap = new QArticleScrap("articleScrap");

    public final QArticleLink articleLink;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final agentmaster.newstock.user.entitiy.QUser user;

    public QArticleScrap(String variable) {
        this(ArticleScrap.class, forVariable(variable), INITS);
    }

    public QArticleScrap(Path<? extends ArticleScrap> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleScrap(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleScrap(PathMetadata metadata, PathInits inits) {
        this(ArticleScrap.class, metadata, inits);
    }

    public QArticleScrap(Class<? extends ArticleScrap> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.articleLink = inits.isInitialized("articleLink") ? new QArticleLink(forProperty("articleLink"), inits.get("articleLink")) : null;
        this.user = inits.isInitialized("user") ? new agentmaster.newstock.user.entitiy.QUser(forProperty("user"), inits.get("user")) : null;
    }

}

