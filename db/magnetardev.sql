CREATE EXTENSION dblink;

DO
$do$
BEGIN
   IF EXISTS (SELECT 1 FROM pg_database WHERE datname = 'magnetar_dev') THEN
      RAISE NOTICE 'Database already exists'; 
   ELSE
      PERFORM dblink_exec('dbname=' || current_database()  -- current db
                        , 'CREATE DATABASE magnetar_dev');
   END IF;
END
$do$;

CREATE USER magnetaradmin;
GRANT USAGE ON SCHEMA public to magnetaradmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO magnetaradmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO magnetaradmin;
-- repeat code below for each database:

GRANT CONNECT ON DATABASE magnetar_dev to magnetaradmin;
\c magnetar_dev
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO magnetaradmin; --- this grants privileges on new tables generated in new database "foo"
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO magnetaradmin;
GRANT USAGE ON SCHEMA public to magnetaradmin; 
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO magnetaradmin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO magnetaradmin;




--
-- PostgreSQL database dump
--

-- Dumped from database version 10.0
-- Dumped by pg_dump version 10.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: depots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE depots (
    id integer NOT NULL,
    address_1 character varying DEFAULT ''::character varying NOT NULL,
    address_2 character varying DEFAULT ''::character varying NOT NULL,
    city character varying DEFAULT ''::character varying NOT NULL,
    region character varying DEFAULT ''::character varying NOT NULL,
    zipcode integer DEFAULT '-1'::integer NOT NULL,
    owner_id integer
);


ALTER TABLE depots OWNER TO postgres;

--
-- Name: depots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE depots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE depots_id_seq OWNER TO postgres;

--
-- Name: depots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE depots_id_seq OWNED BY depots.id;

--
-- Name: seller_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE seller_ratings (
    id integer NOT NULL,
    comment character varying DEFAULT ''::character varying NOT NULL,
    rating integer DEFAULT '-1'::integer NOT NULL,
    owner_id integer
);


ALTER TABLE seller_ratings OWNER TO postgres;

--
-- Name: seller_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE seller_ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE seller_ratings_id_seq OWNER TO postgres;

--
-- Name: seller_ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE seller_ratings_id_seq OWNED BY seller_ratings.id;

--
-- Name: client_ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE client_ratings (
    id integer NOT NULL,
    comment character varying DEFAULT ''::character varying NOT NULL,
    rating integer DEFAULT '-1'::integer NOT NULL,
    owner_id integer
);


ALTER TABLE client_ratings OWNER TO postgres;

--
-- Name: client_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE client_ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE client_ratings_id_seq OWNER TO postgres;

--
-- Name: client_ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE client_ratings_id_seq OWNED BY client_ratings.id;

--
-- Name: rented_tools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE rented_tools (
    id integer NOT NULL,
    tool_id integer DEFAULT '-1'::integer NOT NULL,
    renter_id integer DEFAULT '-1'::integer NOT NULL,
    owner_id integer DEFAULT '-1'::integer NOT NULL,
    start_date double precision,
    end_date double precision
);


ALTER TABLE rented_tools OWNER TO postgres;

--
-- Name: rented_tools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rented_tools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE rented_tools_id_seq OWNER TO postgres;

--
-- Name: rented_tools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rented_tools_id_seq OWNED BY rented_tools.id;


--
-- Name: tool_pictures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tool_pictures (
    id integer NOT NULL,
    image text DEFAULT ''::text NOT NULL,
    tool_id integer DEFAULT '-1'::integer NOT NULL
);


ALTER TABLE tool_pictures OWNER TO postgres;

--
-- Name: tool_pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tool_pictures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tool_pictures_id_seq OWNER TO postgres;

--
-- Name: tool_pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tool_pictures_id_seq OWNED BY tool_pictures.id;


--
-- Name: tools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tools (
    id integer NOT NULL,
    title character varying DEFAULT ''::character varying NOT NULL,
    category character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    price double precision DEFAULT 0 NOT NULL,
    depot_id integer DEFAULT '-1'::integer NOT NULL
);


ALTER TABLE tools OWNER TO postgres;

--
-- Name: tools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tools_id_seq OWNER TO postgres;

--
-- Name: tools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tools_id_seq OWNED BY tools.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    password_hash character varying,
    first_name character varying DEFAULT ''::character varying NOT NULL,
    last_name character varying DEFAULT ''::character varying NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    phone_number character varying DEFAULT ''::character varying NOT NULL,
    birth_date double precision,
    loan_rating double precision DEFAULT '-1'::integer NOT NULL,
    borrow_rating double precision DEFAULT '-1'::integer NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: depots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY depots ALTER COLUMN id SET DEFAULT nextval('depots_id_seq'::regclass);


--
-- Name: seller_ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY seller_ratings ALTER COLUMN id SET DEFAULT nextval('seller_ratings_id_seq'::regclass);


--
-- Name: client_ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_ratings ALTER COLUMN id SET DEFAULT nextval('client_ratings_id_seq'::regclass);


--
-- Name: tool_pictures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tool_pictures ALTER COLUMN id SET DEFAULT nextval('tool_pictures_id_seq'::regclass);


--
-- Name: tools id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tools ALTER COLUMN id SET DEFAULT nextval('tools_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--my insert for rented tools because they are not being auto incremented

ALTER TABLE ONLY rented_tools ALTER COLUMN id SET DEFAULT nextval('rented_tools_id_seq'::regclass);

--
-- Data for Name: depots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY depots (id, address_1, address_2, city, region, zipcode, owner_id) FROM stdin;
1					-1	4
7	420 west granada avenue		Hershey	Pa	17033	11
4	1845 Fern		Hershey	PA	92001	11
8	888	888	Dirty	Jersey	12345	11
\.


--
-- Data for Name: rented_tools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY rented_tools (id, tool_id, renter_id, owner_id, start_date, end_date) FROM stdin;
\.


--
-- Data for Name: tool_pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tool_pictures (id, image, tool_id) FROM stdin;
5	https://magnetar-tool-pictures.s3.us-east-2.amazonaws.com/uploads%2F1545753106096_IMG_0002.JPG	69
6	https://magnetar-tool-pictures.s3.us-east-2.amazonaws.com/uploads%2F1545801403699_IMG_0005.JPG	70
7	https://magnetar-tool-pictures.s3.us-east-2.amazonaws.com/uploads%2F1545801471205_IMG_0003.JPG	71
\.


--
-- Data for Name: tools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tools (id, title, category, description, price, depot_id) FROM stdin;
1	rays hammer	hammer	for hammering	20	1
3	Sawzall	Saw	Cut anytying 	10	7
67	Tool2	Tool2	Tool2	7	7
68	Tool3	Tool3	Tool3	7	7
69	Tool4	Tool4	Tool4	7	7
70	Tool5	Tool5	Tool5	7	7
71	Tool6	Tool6	Tool6	7	7
2	Jigsaw	Saw	For precision	10	4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, password_hash, first_name, last_name, email, phone_number, birth_date, loan_rating, borrow_rating) FROM stdin;
1	\N	Conor	Burke	cjburke89@gmail.com		\N	-1	-1
63	$2a$10$n9kOe751Ta4F.qUicP/PkeqxGDecO2p5wF1z9PcuqOzOfnFW6wYSK	Randy		Bobandy		\N	4	3
67	$2a$10$VYtQmcBDsDGkrUeNsxrUxOdZwe2BX.io8o9YzoroRisKi6gjYA/EO	Jim		Lahey		\N	-3	3
68	$2a$10$g1myEnl1MoF1Ahnv7VtX2utJEEE7dndFAS9XXPCWKQdaRxA/byjEq	Phil		Collins		\N	5	4
4	$2a$10$SaJ7i8lQgcuXbhXMYCBu2.Y/irXqwBcvNsDQDvW9ZGh.4lESJad2.	Jroc		andT		\N	2	-1
11	$2a$10$G1bw8OtQOALRtOVnwh2nX.SDVx8Y9IOwtXi4Nc6fvKLzl63EohtO2	Conor	Burke	b	123	\N	-1	5
\.


--
-- Name: depots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('depots_id_seq', 8, true);


--
-- Name: rented_tools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rented_tools_id_seq', 1, false);


--
-- Name: tool_pictures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tool_pictures_id_seq', 7, true);


--
-- Name: tools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tools_id_seq', 71, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 68, true);


--
-- Name: depots depots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY depots
    ADD CONSTRAINT depots_pkey PRIMARY KEY (id);


--
-- Name: tool_pictures tool_pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tool_pictures
    ADD CONSTRAINT tool_pictures_pkey PRIMARY KEY (id);


--
-- Name: tools tools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: depots depots_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY depots
    ADD CONSTRAINT depots_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: tool_pictures tool_pictures_tool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tool_pictures
    ADD CONSTRAINT tool_pictures_tool_id_fkey FOREIGN KEY (tool_id) REFERENCES tools(id) ON DELETE CASCADE;


--
-- Name: tools tools_depot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tools
    ADD CONSTRAINT tools_depot_id_fkey FOREIGN KEY (depot_id) REFERENCES depots(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

