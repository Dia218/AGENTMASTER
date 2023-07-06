/*분야*/
create table if not exists "AGENTMASTER"."Field"(
    field_name varchar(10) not null,

    constraint "PK_Field" primary key (field_name)
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Field"
    OWNER to postgres;


/*기사*/
create table if not exists "AGENTMASTER"."Article"(
    article_id int not null,
    company char not null,
    reporter varchar(10) not null,
    title text not null,
    subtitle text,
    first_pub date not null,
    last_pub date not null,
    body text not null,
    link text not null,
    group_name varchar(30),
    field_name varchar(10) not null,

    constraint "PK_Articles" primary key (article_id),
    constraint "FK_Articles_group_name" foreign key (group_name)
        references "AGENTMASTER"."Article_group" (group_name) match simple
        on update cascade
        on delete cascade,
    constraint "FK_Articles_field_name" foreign key (field_name)
        references "AGENTMASTER"."Field" (field_name) match simple
        on update cascade
        on delete cascade
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Article"
    OWNER to postgres;


/*연관뉴스*/
create table if not exists "AGENTMASTER"."Article_group"(
    group_name varchar(30) not null,

    constraint "PK_articleGroup" primary key (group_name)
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_group"
    OWNER to postgres;


/*스크랩*/
create table if not exists "AGENTMASTER"."Article_Scrap"(
    customer_id varchar(12) not null,
    article_id int not null,

    constraint "PK_Article_Scrap" primary key  (customer_id, article_id),
    constraint "FK_Article_Scrap_customer_id" foreign key (customer_id)
        references "AGENTMASTER"."Customer" (customer_id) match simple
        on update cascade
        on delete cascade,
    constraint "FK_Article_Scrap_news_id" foreign key (article_id)
        references "AGENTMASTER"."Article" (article_id) match simple
        on update cascade
        on delete cascade
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_Scrap"
    OWNER to postgres;


/*기사 요약문*/
create table if not exists "AGENTMASTER"."Article_summary"(
    article_id int not null,
    summary text not null,

    constraint "FK_Article_Summary_news_id" foreign key (article_id)
        references "AGENTMASTER"."Article" (article_id) match simple
        on update cascade
        on delete cascade,
    constraint "PK_Article_Summary" primary key (article_id, summary)
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_summary"
    OWNER to postgres;
