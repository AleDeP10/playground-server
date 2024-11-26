-- Database: playground

-- DROP DATABASE IF EXISTS playground;

CREATE DATABASE playground
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Italian_Italy.1252'
    LC_CTYPE = 'Italian_Italy.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

USE playground;


-- Table: public.Task

-- DROP TABLE IF EXISTS public."Task";

CREATE TABLE IF NOT EXISTS public."Task"
(
    id integer NOT NULL DEFAULT nextval('"Task_id_seq"'::regclass),
    task character varying(50) COLLATE pg_catalog."default" NOT NULL,
    status character varying(12) COLLATE pg_catalog."default" DEFAULT 'TODO'::character varying,
    CONSTRAINT "Task_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Task"
    OWNER to postgres;