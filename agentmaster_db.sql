/*고객*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Customer"
(
    customer_id varchar(12) NOT NULL,
    password    varchar(12) NOT NULL,
    e_mail      text        NOT NULL,
    simul_money integer     NOT NULL,
    CONSTRAINT Customer_pkey PRIMARY KEY (customer_id)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Customer"
    OWNER to postgres;

/*
=======================
분야 merged from newsDB
=======================
*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Field"
(
    field_name varchar(20) not null,

    constraint "Field_pkey" primary key (field_name)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Field"
    OWNER to postgres;

/*주식*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock"
(
    stock_id   integer     NOT NULL,
    stock_name varchar(20) NOT NULL,
    field_name varchar(20) NOT NULL,
    CONSTRAINT Stock_pkey PRIMARY KEY (stock_id),
    CONSTRAINT field_name_fkey FOREIGN KEY (field_name)
        REFERENCES "AGENTMASTER"."Field" (field_name) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Stock"
    OWNER to postgres;


/*주식정보*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock_info"
(
    stock_id          integer       NOT NULL,
    stock_date        date          NOT NULL,
    stock_price       integer       NOT NULL,
    diff_from_prevday numeric(3, 1) NOT NULL,
    range             numeric(3, 1) NOT NULL,
    CONSTRAINT Stock_info_pkey PRIMARY KEY (stock_id, stock_date),
    CONSTRAINT stock_id_fk FOREIGN KEY (stock_id)
        REFERENCES "AGENTMASTER"."Stock" (stock_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Stock_info"
    OWNER to postgres;


/*모의투자*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Simulation"
(
    customer_id    varchar(12) NOT NULL,
    stock_id       integer     NOT NULL,
    rate_return    integer     NOT NULL,
    stock_holdings integer     NOT NULL,
    CONSTRAINT Simulation_pkey PRIMARY KEY (customer_id, stock_id),
    CONSTRAINT customer_id_fk FOREIGN KEY (customer_id)
        REFERENCES "AGENTMASTER"."Customer" (customer_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT stock_id FOREIGN KEY (stock_id)
        REFERENCES "AGENTMASTER"."Stock" (stock_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Simulation"
    OWNER to postgres;


/*북마크*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Bookmark"
(
    customer_id varchar(12) NOT NULL,
    stock_id    integer     NOT NULL,
    CONSTRAINT Bookmark_pkey PRIMARY KEY (customer_id, stock_id),
    CONSTRAINT customer_id_fk FOREIGN KEY (customer_id)
        REFERENCES "AGENTMASTER"."Customer" (customer_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT stock_id_fk FOREIGN KEY (stock_id)
        REFERENCES "AGENTMASTER"."Stock" (stock_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Bookmark"
    OWNER to postgres;

/*
-----------------
  merged lines
-----------------
*/

/*연관뉴스*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_group"
(
    group_name varchar(30) not null,

    constraint "article_group_pkey" primary key (group_name)
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_group"
    OWNER to postgres;

/*기사*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article"
(
    article_id int         not null,
    company    varchar(20) not null,
    reporter   varchar(20) not null,
    title      text        not null,
    subtitle   text,
    first_pub  timestamp   not null,
    last_pub   timestamp   not null,
    body       text        not null,
    link       text        not null,
    group_name varchar(30),
    field_name varchar(20) not null,

    constraint "Article_pkey" primary key (article_id),
    constraint "Articles_group_name_fkey" foreign key (group_name)
        references "AGENTMASTER"."Article_group" (group_name) match simple
        on update cascade
        on delete cascade,
    constraint "Articles_field_name_fkey" foreign key (field_name)
        references "AGENTMASTER"."Field" (field_name) match simple
        on update cascade
        on delete cascade
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article"
    OWNER to postgres;

/*스크랩*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_Scrap"
(
    customer_id varchar(12) not null,
    article_id  int         not null,

    constraint "Article_Scrap_pkey" primary key (customer_id, article_id),
    constraint "Article_Scrap_customer_id_fkey" foreign key (customer_id)
        references "AGENTMASTER"."Customer" (customer_id) match simple
        on update cascade
        on delete cascade,
    constraint "Article_Scrap_news_id_fkey" foreign key (article_id)
        references "AGENTMASTER"."Article" (article_id) match simple
        on update cascade
        on delete cascade
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_Scrap"
    OWNER to postgres;

/*기사 요약문*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_summary"
(
    article_id int  not null,
    summary    text not null,

    constraint "Article_Summary_news_id_fkey" foreign key (article_id)
        references "AGENTMASTER"."Article" (article_id) match simple
        on update cascade
        on delete cascade,
    constraint "Article_Summary_pkey" primary key (article_id, summary)
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_summary"
    OWNER to postgres;
