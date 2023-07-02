//고객

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

//주식

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

//주식정보

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

//모의투자

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

//북마크

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
