/*스키마 생성*/

CREATE SCHEMA IF NOT EXISTS "AGENTMASTER"
    AUTHORIZATION postgres;

/*고객*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Customer"
(
    customer_id     varchar(20)     NOT NULL,
    password        varchar(20)     NOT NULL,
    e_mail          text            NOT NULL,
    total_money     integer         NOT NULL,
    yesterday_money integer         NOT NULL,
    simul_money     integer         NOT NULL,
    stock_money     integer         NOT NULL,
    total_return    integer         NOT NULL,
    rank_range      numeric(10, 2)  NOT NULL,
    CONSTRAINT Customer_pkey PRIMARY KEY (customer_id),
	CONSTRAINT customer_id_between CHECK(customer_id NOT BETWEEN 'ㄱ' AND '힣'),
	CONSTRAINT customer_email_check CHECK (e_mail ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
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
    field_name varchar(100) not null,

    constraint "Field_pkey" primary key (field_name)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Field"
    OWNER to postgres;

/*주식*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock"
(
    stock_id   varchar(20)  NOT NULL,
    stock_name varchar(100) NOT NULL,
    field_name varchar(100) NOT NULL,
    CONSTRAINT Stock_pkey PRIMARY KEY (stock_id),
    CONSTRAINT stock_name_unique UNIQUE (stock_name),
	CONSTRAINT stock_id_check CHECK (stock_id LIKE '______'),
    CONSTRAINT field_name_fkey FOREIGN KEY (field_name)
        REFERENCES "AGENTMASTER"."Field" (field_name) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Stock"
    OWNER to postgres;


/*주식정보*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock_info"
(
    stock_id          varchar(20)   NOT NULL,
    stock_date        date          NOT NULL,
    stock_price       integer       NOT NULL,
    diff_from_prevday integer       NOT NULL,
    range             numeric(4, 2) NOT NULL,
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
    customer_id     varchar(20)      NOT NULL,
    stock_id        varchar(20)      NOT NULL,
    simul_return    integer          NOT NULL,
    simul_range     NUMERIC(10, 2)   NOT NULL,
    simul_holdings  integer          NOT NULL,
    perchase_amount integer          NOT NULL,
    CONSTRAINT Simulation_pkey PRIMARY KEY (customer_id, stock_id),
    CONSTRAINT customer_id_fk FOREIGN KEY (customer_id)
        REFERENCES "AGENTMASTER"."Customer" (customer_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT stock_id FOREIGN KEY (stock_id)
        REFERENCES "AGENTMASTER"."Stock" (stock_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Simulation"
    OWNER to postgres;


/*북마크*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Bookmark"
(
    customer_id varchar(20) NOT NULL,
    stock_id    varchar(20) NOT NULL,
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
    article_id      int         not null,
    company         varchar(20) not null,
    reporter        varchar(20) not null,
    title           text        not null,
    issue_keyword   varchar(100),
    first_pub       timestamp   not null,
    last_pub        timestamp   not null,
    body            text        not null,
    link            text        not null,
    group_name      varchar(30),
    field_name      varchar(100) not null,

    constraint "Article_pkey" primary key (article_id),
    constraint "Articles_group_name_fkey" foreign key (group_name)
        references "AGENTMASTER"."Article_group" (group_name) match simple
        on update cascade
        on delete set null,
    constraint "Articles_field_name_fkey" foreign key (field_name)
        references "AGENTMASTER"."Field" (field_name) match simple
        on update cascade
        on delete restrict,
    constraint "article_URL_format" check (link ~ '^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$')
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article"
    OWNER to postgres;

/*스크랩*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_Scrap"
(
    customer_id varchar(20) not null,
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