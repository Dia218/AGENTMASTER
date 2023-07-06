/*고객*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Customer"
(
    customer_id character varying(12) COLLATE pg_catalog."default" NOT NULL,
    password character varying(12) COLLATE pg_catalog."default" NOT NULL,
    e_mail text COLLATE pg_catalog."default" NOT NULL,
    simul_money integer NOT NULL,
    CONSTRAINT "Customer_pkey" PRIMARY KEY (customer_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS "AGENTMASTER"."Customer"
    OWNER to postgres;

/*
==================
merged from newsDB
==================
       분야
*/
create table if not exists "AGENTMASTER"."Field"(
    field_name varchar(10) not null,

    constraint "PK_Field" primary key (field_name)
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Field"
    OWNER to postgres;


/*주식*/

CREATE TABLE IF NOT EXISTS "AGENTMASTER"."Stock"
(
    stock_id integer NOT NULL,
    stock_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    field_name character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Stock_pkey" PRIMARY KEY (stock_id),
    CONSTRAINT field_name_fk FOREIGN KEY (field_name)
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
    stock_id integer NOT NULL,
    stock_date date NOT NULL,
    stock_price integer NOT NULL,
    diff_from_prevday numeric(3,1) NOT NULL,
    range numeric(3,1) NOT NULL,
    CONSTRAINT "Stock_info_pkey" PRIMARY KEY (stock_id, stock_date),
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
    customer_id character varying(12) COLLATE pg_catalog."default" NOT NULL,
    stock_id integer NOT NULL,
    rate_return integer NOT NULL,
    stock_holdings integer NOT NULL,
    CONSTRAINT "Simulation_pkey" PRIMARY KEY (customer_id, stock_id),
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
    customer_id character varying(12) COLLATE pg_catalog."default" NOT NULL,
    stock_id integer NOT NULL,
    CONSTRAINT "Bookmark_pkey" PRIMARY KEY (customer_id, stock_id),
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


/*분야*/
create table if not exists "AGENTMASTER"."Field"(
    field_name varchar(10) not null,

    constraint "PK_Field" primary key (field_name)
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Field"
    OWNER to postgres;


/*연관뉴스*/
create table if not exists "AGENTMASTER"."Article_group"(
    group_name varchar(30) not null,

    constraint "PK_articleGroup" primary key (group_name)
)

tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_group"
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
