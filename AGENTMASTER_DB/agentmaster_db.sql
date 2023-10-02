/*스키마 생성*/

CREATE SCHEMA IF NOT EXISTS "AGENTMASTER" AUTHORIZATION postgres;

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
    rank_range      numeric(10, 2) NOT NULL,
    CONSTRAINT user_pkey
        PRIMARY KEY (user_id),
    CONSTRAINT user_unique
        UNIQUE (user_name),
    CONSTRAINT user_name_check
        CHECK (user_name ~ '^[A-Za-z0-9]{5,15}$' AND user_name !~ '^[0-9]{5,15}$'),
    CONSTRAINT user_password_check
        CHECK (password ~ '^[A-Za-z0-9]{8,20}$' AND password !~ '^[0-9]{8,20}$' AND password !~ '^[A-Za-z]{8,20}$'),
    CONSTRAINT user_email_check
        CHECK (e_mail ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."User"
    OWNER TO postgres;

/*분야*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Field"
(
    field_id   BIGSERIAL    NOT NULL,
    field_name varchar(100) NOT NULL,
    CONSTRAINT field_pkey
        PRIMARY KEY (field_id),
    CONSTRAINT field_unique
        UNIQUE (field_name)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Field"
    OWNER TO postgres;

/*주식*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock"
(
    stock_id   BIGSERIAL    NOT NULL,
    stock_code varchar(20)  NOT NULL,
    stock_name varchar(100) NOT NULL,
    field_id   BIGINT       NOT NULL,
    CONSTRAINT stock_pkey
        PRIMARY KEY (stock_id),
    CONSTRAINT stock_code_unique
        UNIQUE (stock_code),
    CONSTRAINT stock_name_unique
        UNIQUE (stock_name),
    CONSTRAINT stock_code_check
        CHECK (stock_code ~ '\d{6}'),
    CONSTRAINT field_id_fkey
        FOREIGN KEY (field_id) REFERENCES "AGENTMASTER"."Field" (field_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE RESTRICT
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Stock"
    OWNER TO postgres;


/*주식정보*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock_info"
(
    stock_info_id      BIGSERIAL     NOT NULL,
    stock_id           BIGINT        NOT NULL,
    stock_date         date          NOT NULL,
    stock_price        integer       NOT NULL,
    diff_from_prevday  integer       NOT NULL,
    stock_range        numeric(4, 2) NOT NULL,
    start_price        integer       NOT NULL,
    high_price         integer       NOT NULL,
    low_price          integer       NOT NULL,
    trading_volume     bigint        NOT NULL,
    transaction_amount bigint        NOT NULL,
    CONSTRAINT stock_info_pkey
        PRIMARY KEY (stock_info_id),
    CONSTRAINT stock_info_unique
        UNIQUE (stock_id, stock_date),
    CONSTRAINT stock_id_fkey
        FOREIGN KEY (stock_id) REFERENCES "AGENTMASTER"."Stock" (stock_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Stock_info"
    OWNER TO postgres;


/*모의투자*/


CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Simulation"
(
    simulation_id   BIGSERIAL      NOT NULL,
    user_id         BIGINT         NOT NULL,
    stock_id        BIGINT         NOT NULL,
    simul_return    integer        NOT NULL,
    simul_range     NUMERIC(10, 2) NOT NULL,
    simul_holdings  integer        NOT NULL,
    purchase_amount integer        NOT NULL,
    average_price   integer        NOT NULL,
    CONSTRAINT simulation_pkey
        PRIMARY KEY (simulation_id),
    CONSTRAINT simulation_unique
        UNIQUE (user_id, stock_id),
    CONSTRAINT user_id_fkey
        FOREIGN KEY (user_id) REFERENCES "AGENTMASTER"."User" (user_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT stock_id
        FOREIGN KEY (stock_id) REFERENCES "AGENTMASTER"."Stock" (stock_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE RESTRICT
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Simulation"
    OWNER TO postgres;


/*
-----------------
  merged lines
-----------------   
*/

/*연관뉴스*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_group"
(
    article_group_id bigserial    NOT NULL,
    group_name       varchar(100) NOT NULL,

    CONSTRAINT article_group_id_pkey
        PRIMARY KEY (article_group_id),
    CONSTRAINT article_group_id_unique
        UNIQUE (article_group_id)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Article_group"
    OWNER TO postgres;

/*사건요약문*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Issue_summary"
(
    issue_summary_id bigserial    NOT NULL,
    issue_keyword    varchar(100) NOT NULL,
    issue_summary    varchar(100),

    CONSTRAINT issue_summary_pkey
        PRIMARY KEY (issue_summary_id),
    CONSTRAINT issue_summary_unique
        UNIQUE (issue_keyword)
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Issue_summary"
    OWNER TO postgres;

/*기사링크*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_link"
(
    article_link_id bigserial NOT NULL,
    link            text      NOT NULL,
    CONSTRAINT article_link_unique
        UNIQUE (link),
    CONSTRAINT article_id_pkey
        PRIMARY KEY (article_link_id),
    CONSTRAINT article_url_format
        CHECK (link ~
               '^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$')
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Article_link"
    OWNER TO postgres;

/*기사본문*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article"
(
    article_id       bigserial    NOT NULL,
    article_link_id  bigint       NOT NULL,
    company          varchar(100) NOT NULL,
    reporter         varchar(100) NOT NULL,
    title            text         NOT NULL,
    first_pub        timestamp    NOT NULL,
    last_pub         timestamp    NOT NULL,
    body             text         NOT NULL,
    field_id         bigint       NOT NULL,
    article_group_id bigint,
    issue_summary_id bigint,

    CONSTRAINT article_pkey
        PRIMARY KEY (article_id),
    CONSTRAINT article_link_id_unique
        UNIQUE (article_link_id),
    CONSTRAINT article_link_id_fkey
        FOREIGN KEY (article_link_id) REFERENCES "AGENTMASTER"."Article_link" (article_link_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT articles_group_id_fkey
        FOREIGN KEY (article_group_id) REFERENCES "AGENTMASTER"."Article_group" (article_group_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE SET NULL,
    CONSTRAINT articles_field_id_fkey
        FOREIGN KEY (field_id) REFERENCES "AGENTMASTER"."Field" (field_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT article_issue_id_fkey
        FOREIGN KEY (issue_summary_id) REFERENCES "AGENTMASTER"."Issue_summary" (issue_summary_id) ON UPDATE CASCADE ON DELETE SET NULL
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Article"
    OWNER TO postgres;

/*스크랩*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_scrap"
(
    article_scrap_id bigserial NOT NULL,
    user_id          bigint    NOT NULL,
    article_link_id  bigint    NOT NULL,

    CONSTRAINT article_scrap_pkey
        PRIMARY KEY (article_scrap_id),
    CONSTRAINT article_scrap_unique
        UNIQUE (user_id, article_link_id),
    CONSTRAINT article_scrap_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES "AGENTMASTER"."User" (user_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT article_scrap_news_id_fkey
        FOREIGN KEY (article_link_id) REFERENCES "AGENTMASTER"."Article_link" (article_link_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Article_scrap"
    OWNER TO postgres;

/*기사 요약문*/
CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Article_summary"
(
    article_summary_id bigserial    NOT NULL,
    article_id         bigint       NOT NULL,
    article_summary    varchar(100) NOT NULL,

    CONSTRAINT article_summary_pkey
        PRIMARY KEY (article_summary_id),
    CONSTRAINT article_summary_unique
        UNIQUE (article_id, article_summary),
    CONSTRAINT article_summary_news_id_fkey
        FOREIGN KEY (article_id) REFERENCES "AGENTMASTER"."Article" (article_id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE
)
    TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Article_summary"
    OWNER TO postgres;