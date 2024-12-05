-- Database: playground

-- DROP DATABASE IF EXISTS playground;

CREATE DATABASE playground
WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'it_IT.UTF-8'
    LC_CTYPE = 'it_IT.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = false;



-- Table: public.Task
 
-- DROP TABLE IF EXISTS public."Task";
 
CREATE TABLE IF NOT EXISTS public."Task"
(
    id SERIAL PRIMARY KEY,
    task VARCHAR(50) NOT NULL,
    status VARCHAR(12) DEFAULT 'TODO'
);
 
ALTER TABLE public."Task"
    OWNER TO postgres;