/*스키마 생성*/

CREATE SCHEMA IF NOT EXISTS "AGENTMASTER"
    AUTHORIZATION postgres;

/*고객*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."User"
(
    user_id         BIGSERIAL      NOT NULL,
    user_name       varchar(15)    NOT NULL,
    password        varchar(20)    NOT NULL,
    e_mail          text           NOT NULL,
    total_money     integer        NOT NULL,
    yesterday_money integer        NOT NULL,
    simul_money     integer        NOT NULL,
    stock_money     integer        NOT NULL,
    total_return    integer        NOT NULL,
    rank_range      numeric(10, 2) NOT NULL,
    simul_ranking   integer        NOT NULL,
    CONSTRAINT User_pkey PRIMARY KEY (user_id),
    CONSTRAINT User_unique UNIQUE (user_name),
    CONSTRAINT user_name_check CHECK (user_name ~ '^[A-Za-z0-9]{5,15}$' AND user_name !~ '^[0-9]{5,15}$'),
    CONSTRAINT user_password_check CHECK (password ~ '^[A-Za-z0-9]{8,20}$' AND password !~ '^[0-9]{8,20}$' AND password !~ '^[A-Za-z]{8,20}$'),
    CONSTRAINT user_email_check CHECK (e_mail ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
)   
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."User"
    OWNER to postgres;

/*분야*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Field"
(
    field_id   BIGSERIAL    NOT NULL,
    field_name varchar(100) not null,

    constraint Field_pkey primary key (field_id),
    CONSTRAINT Field_unique UNIQUE (field_name)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Field"
    OWNER to postgres;

/*주식*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock"
(
    stock_id   BIGSERIAL    NOT NULL,
    stock_code varchar(20)  NOT NULL,
    stock_name varchar(100) NOT NULL,
    field_id   BIGINT       NOT NULL,
    CONSTRAINT Stock_pkey PRIMARY KEY (stock_id),
    CONSTRAINT stock_code_unique UNIQUE (stock_code),
    CONSTRAINT stock_name_unique UNIQUE (stock_name),
    CONSTRAINT stock_id_check CHECK (stock_code ~ '\d{6}'),
    CONSTRAINT field_id_fkey FOREIGN KEY (field_id)
        REFERENCES "AGENTMASTER"."Field" (field_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Stock"
    OWNER to postgres;


/*주식정보*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock_info"
(
    stock_info_id      BIGSERIAL     NOT NULL,
    stock_id           BIGINT        NOT NULL,
    stock_date         date          NOT NULL,
    stock_price        integer       NOT NULL,
    diff_from_prevday  integer       NOT NULL,
    range              numeric(4, 2) NOT NULL,
    start_price        integer       NOT NULL,
    high_price         integer       NOT NULL,
    low_price          integer       NOT NULL,
    trading_volume     bigint        NOT NULL,
    transaction_volume bigint        NOT NULL,
    CONSTRAINT Stock_info_pkey PRIMARY KEY (stock_info_id),
    CONSTRAINT Stock_info_unique UNIQUE (stock_id, stock_date),
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
    simulation_id   BIGSERIAL      NOT NULL,
    user_id         BIGINT         NOT NULL,
    stock_id        BIGINT         NOT NULL,
    simul_return    integer        NOT NULL,
    simul_range     NUMERIC(10, 2) NOT NULL,
    simul_holdings  integer        NOT NULL,
    perchase_amount integer        NOT NULL,
    average_price   integer        NOT NULL,
    CONSTRAINT Simulation_pkey PRIMARY KEY (simulation_id),
    CONSTRAINT Simulation_unique UNIQUE (user_id, stock_id),
    CONSTRAINT user_id_fk FOREIGN KEY (user_id)
        REFERENCES "AGENTMASTER"."User" (user_id) MATCH SIMPLE
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


/*
-----------------
  merged lines
-----------------
*/

/*연관뉴스*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_group"
(
    article_group_id bigserial           not null,
    group_name       varchar(100) unique not null,

    constraint "article_group_id_pkey" primary key (article_group_id)
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_group"
    OWNER to postgres;

/*기사링크*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_link"
(
    article_link_id bigserial   not null,
    link            text unique not null,
    constraint "article_id_pkey" primary key (article_link_id),
    constraint "article_URL_format" check (link ~
                                           '^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$')
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_link"
    OWNER to postgres;

/*기사본문*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article"
(
    article_id       bigserial     not null,
    article_link_id  bigint unique not null,
    company          varchar(100)  not null,
    reporter         varchar(100)  not null,
    title            text          not null,
    issue_keyword    varchar(100),
    first_pub        timestamp     not null,
    last_pub         timestamp     not null,
    body             text          not null,
    article_group_id bigint,
    field_id         bigint        not null,

    constraint "Article_pkey" primary key (article_id),
    constraint "Article_link_fkey" foreign key (article_link_id)
        references "AGENTMASTER"."Article_link" (link),
    constraint "Articles_group_id_fkey" foreign key (article_group_id)
        references "AGENTMASTER"."Article_group" (article_group_id) match simple
        on update cascade
        on delete set null,
    constraint "Articles_field_id_fkey" foreign key (field_id)
        references "AGENTMASTER"."Field" (field_id) match simple
        on update cascade
        on delete restrict
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article"
    OWNER to postgres;

/*스크랩*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_scrap"
(
    scrap_id        bigserial     not null,
    user_id         bigint unique not null,
    article_link_id bigint unique not null,

    constraint "Scrap_id_pkey" primary key (scrap_id),
    constraint "Article_scrap_customer_id_fkey" foreign key (user_id)
        references "AGENTMASTER"."User" (user_id) match simple
        on update cascade
        on delete cascade,
    constraint "Article_scrap_news_id_fkey" foreign key (article_link_id)
        references "AGENTMASTER"."Article_link" (article_id) match simple
        on update cascade
        on delete cascade
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_scrap"
    OWNER to postgres;

/*기사 요약문*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_summary"
(
    article_summary_id bigserial           not null,
    article_id         bigserial unique    not null,
    summary            varchar(100) unique not null,

    constraint "Article_Summary_news_id_fkey" foreign key (article_id)
        references "AGENTMASTER"."Article" (article_id) match simple
        on update cascade
        on delete cascade,
    constraint "Article_Summary_pkey" primary key (article_summary_id)
)
    tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_summary"
    OWNER to postgres;