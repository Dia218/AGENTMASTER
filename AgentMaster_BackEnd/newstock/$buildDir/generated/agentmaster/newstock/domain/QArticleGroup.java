package agentmaster.newstock.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleGroup is a Querydsl query type for ArticleGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleGroup extends EntityPathBase<ArticleGroup> {

    private static final long serialVersionUID = 1089583778L;

    public static final QArticleGroup articleGroup = new QArticleGroup("articleGroup");

    public final ListPath<Article, QArticle> articles = this.<Article, QArticle>createList("articles", Article.class, QArticle.class, PathInits.DIRECT2);

    public final StringPath groupName = createString("groupName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QArticleGroup(String variable) {
        super(ArticleGroup.class, forVariable(variable));
    }

    public QArticleGroup(Path<? extends ArticleGroup> path) {
        super(path.getType(), path.getMetadata());
    }

    public QArticleGroup(PathMetadata metadata) {
        super(ArticleGroup.class, metadata);
    }

}

