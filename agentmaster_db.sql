/*스키마 생성*/

create schema if not exists "AGENTMASTER" authorization postgres;

/*고객*/

create table if not exists "AGENTMASTER"."User"
(
    user_id         BIGSERIAL      not null,
    user_name       varchar(15)    not null,
    password        varchar(20)    not null,
    e_mail          text           not null,
    total_money     integer        not null,
    yesterday_money integer        not null,
    simul_money     integer        not null,
    stock_money     integer        not null,
    rank_range      numeric(10, 2) not null,
    constraint User_pkey primary key (user_id),
    constraint User_unique unique (user_name),
    constraint user_name_check check (user_name ~ '^[A-Za-z0-9]{5,15}$' and user_name !~ '^[0-9]{5,15}$'),
    constraint user_password_check check (password ~ '^[A-Za-z0-9]{8,20}$' and password !~ '^[0-9]{8,20}$' and
                                          password !~ '^[A-Za-z]{8,20}$'),
    constraint user_email_check check (e_mail ~ '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
) tablespace pg_default;

alter table if exists "AGENTMASTER"."User"
    owner to postgres;

/*분야*/

create table if not exists "AGENTMASTER"."Field"
(
    field_id BIGSERIAL not null,
    field_name varchar(100) not null,
    constraint Field_pkey primary key (field_id),
    constraint Field_unique unique (field_name)
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Field"
    owner to postgres;

/*주식*/

create table if not exists "AGENTMASTER"."Stock"
(
    stock_id   BIGSERIAL    not null,
    stock_code varchar(20)  not null,
    stock_name varchar(100) not null,
    field_id   BIGINT       not null,
    constraint Stock_pkey primary key (stock_id),
    constraint stock_code_unique unique (stock_code),
    constraint stock_name_unique unique (stock_name),
    constraint stock_code_check check (stock_code ~ '\d{6}'),
    constraint field_id_fkey foreign key (field_id) references "AGENTMASTER"."Field" (field_id) match simple on update cascade on delete restrict
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Stock"
    owner to postgres;


/*주식정보*/


create table if not exists "AGENTMASTER"."Stock_info"
(
    stock_info_id      BIGSERIAL     not null,
    stock_id           BIGINT        not null,
    stock_date         date          not null,
    stock_price        integer       not null,
    diff_from_prevday  integer       not null,
    stock_range        numeric(4, 2) not null,
    start_price        integer       not null,
    high_price         integer       not null,
    low_price          integer       not null,
    trading_volume     bigint        not null,
    transaction_amount bigint        not null,
    constraint Stock_info_pkey primary key (stock_info_id),
    constraint Stock_info_unique unique (stock_id, stock_date),
    constraint stock_id_fkey foreign key (stock_id) references "AGENTMASTER"."Stock" (stock_id) match simple on update cascade on delete cascade
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Stock_info"
    owner to postgres;


/*모의투자*/


create table if not exists "AGENTMASTER"."Simulation"
(
    simulation_id   BIGSERIAL      not null,
    user_id         BIGINT         not null,
    stock_id        BIGINT         not null,
    simul_return    integer        not null,
    simul_range     NUMERIC(10, 2) not null,
    simul_holdings  integer        not null,
    purchase_amount integer        not null,
    average_price   integer        not null,
    constraint Simulation_pkey primary key (simulation_id),
    constraint Simulation_unique unique (user_id, stock_id),
    constraint user_id_fkey foreign key (user_id) references "AGENTMASTER"."User" (user_id) match simple on update cascade on delete cascade,
    constraint stock_id foreign key (stock_id) references "AGENTMASTER"."Stock" (stock_id) match simple on update cascade on delete restrict
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Simulation"
    owner to postgres;


/*
-----------------
  merged lines
-----------------   
*/

/*연관뉴스*/
create table if not exists "AGENTMASTER"."Article_group"
(
    article_group_id bigserial    not null,
    group_name       varchar(100) not null,

    constraint Article_group_id_pkey primary key (article_group_id),
    constraint Article_group_id_unique unique (article_group_id)
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_group"
    owner to postgres;

/*사건요약문*/
create table if not exists "AGENTMASTER"."Issue_summary"
(
    Issue_summary_id bigserial    not null,
    issue_keyword    varchar(100) not null,
    issue_summary    varchar(100),

    constraint Issue_summary_pkey primary key (Issue_summary_id),
    constraint issue_summary_unique unique (issue_keyword)
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Issue_summary"
    owner to postgres;

/*기사링크*/
create table if not exists "AGENTMASTER"."Article_link"
(
    article_link_id bigserial not null,
    link            text      not null,
    constraint article_link_unique unique (link),
    constraint Article_id_pkey primary key (article_link_id),
    constraint Article_URL_format check (link ~
                                         '^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,6}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[-a-zA-Z0-9@:%_\+.~#()?&//=]*)?$')
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_link"
    owner to postgres;

/*기사본문*/
create table if not exists "AGENTMASTER"."Article"
(
    article_id       bigserial    not null,
    article_link_id  bigint       not null,
    company          varchar(100) not null,
    reporter         varchar(100) not null,
    title            text         not null,
    first_pub        timestamp    not null,
    last_pub         timestamp    not null,
    body             text         not null,
    field_id         bigint       not null,
    article_group_id bigint,
    issue_summary_id bigint,

    constraint Article_pkey primary key (article_id),
    constraint Article_link_id_unique unique (article_link_id),
    constraint Article_link_id_fkey foreign key (article_link_id) references "AGENTMASTER"."Article_link" (article_link_id) match simple on update cascade on delete cascade,
    constraint Articles_group_id_fkey foreign key (article_group_id) references "AGENTMASTER"."Article_group" (article_group_id) match simple on update cascade on delete set null,
    constraint Articles_field_id_fkey foreign key (field_id) references "AGENTMASTER"."Field" (field_id) match simple on update cascade on delete restrict,
    constraint Article_issue_id_fkey foreign key (issue_summary_id) references "AGENTMASTER"."Issue_summary" (issue_summary_id) on update cascade on delete set null
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Article"
    owner to postgres;

/*스크랩*/
create table if not exists "AGENTMASTER"."Article_scrap"
(
    article_scrap_id bigserial not null,
    user_id          bigint    not null,
    article_link_id  bigint    not null,

    constraint Article_scrap_pkey primary key (article_scrap_id),
    constraint Article_scrap_unique unique (user_id, article_link_id),
    constraint Article_scrap_user_id_fkey foreign key (user_id) references "AGENTMASTER"."User" (user_id) match simple on update cascade on delete cascade,
    constraint Article_scrap_news_id_fkey foreign key (article_link_id) references "AGENTMASTER"."Article_link" (article_link_id) match simple on update cascade on delete cascade
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_scrap"
    owner to postgres;

/*기사 요약문*/
create table if not exists "AGENTMASTER"."Article_summary"
(
    article_summary_id bigserial    not null,
    article_id         bigint       not null,
    article_summary    varchar(100) not null,

    constraint Article_summary_pkey primary key (article_summary_id),
    constraint Article_summary_unique unique (article_id, article_summary),
    constraint Article_summary_news_id_fkey foreign key (article_id) references "AGENTMASTER"."Article" (article_id) match simple on update cascade on delete cascade
) tablespace pg_default;

alter table if exists "AGENTMASTER"."Article_summary"
    owner to postgres;