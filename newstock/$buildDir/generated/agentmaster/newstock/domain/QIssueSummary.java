package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QIssueSummary is a Querydsl query type for IssueSummary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QIssueSummary extends EntityPathBase<IssueSummary> {

    private static final long serialVersionUID = -721913850L;

    public static final QIssueSummary issueSummary1 = new QIssueSummary("issueSummary1");

    public final ListPath<Article, QArticle> articles = this.<Article, QArticle>createList("articles", Article.class, QArticle.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath issueKeyword = createString("issueKeyword");

    public final StringPath issueSummary = createString("issueSummary");

    public QIssueSummary(String variable) {
        super(IssueSummary.class, forVariable(variable));
    }

    public QIssueSummary(Path<? extends IssueSummary> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIssueSummary(PathMetadata metadata) {
        super(IssueSummary.class, metadata);
    }

}

