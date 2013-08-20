--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Data for Name: timescale_activitystate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (1, 'Annual percentile noyear', 1, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (6, 'Annual components 1912', 6, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (9, 'Annual components 1990', 9, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (12, 'Annual components 1998', 12, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (25, 'Pristine', 25, '');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (2, 'Annual components and totals noyear', 2, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (5, 'Annual components and totals 1912', 5, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (8, 'Annual components and totals 1990', 8, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (11, 'Annual components and totals 1998', 11, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (13, 'MJJ percentile noyear', 13, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (18, 'MJJ components 1912', 18, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (21, 'MJJ components 1990', 21, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (24, 'MJJ components 1998', 24, 'annual_components.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (14, 'MJJ components and totals noyear', 14, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (17, 'MJJ components and totals 1912', 17, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (20, 'MJJ components and totals 1990', 20, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (23, 'MJJ components and totals 1998', 23, 'annual_components_total.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (3, 'Annual components noyear', 3, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (4, 'Annual percentile 1912', 4, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (7, 'Annual percentile 1990', 7, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (10, 'Annual percentile 1998', 10, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (15, 'MJJ components noyear', 15, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (16, 'MJJ percentile 1912', 16, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (19, 'MJJ percentile 1990', 19, 'annual_percentile.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename) VALUES (22, 'MJJ percentile 1998', 22, 'annual_percentile.png');


--
-- Name: timescale_activitystate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timescale_activitystate_id_seq', 11, true);


--
-- Data for Name: timescale_graphingmodeinput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timescale_graphingmodeinput (id, name, order_rank) VALUES (1, 'Components', 1);
INSERT INTO timescale_graphingmodeinput (id, name, order_rank) VALUES (2, 'Components and Totals', 0);
INSERT INTO timescale_graphingmodeinput (id, name, order_rank) VALUES (3, 'Percentiles', 0);


--
-- Name: timescale_graphingmodeinput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timescale_graphingmodeinput_id_seq', 3, true);


--
-- Data for Name: timescale_seasoninput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timescale_seasoninput (id, name, order_rank) VALUES (1, 'May, June and July', 0);
INSERT INTO timescale_seasoninput (id, name, order_rank) VALUES (2, 'Annual', 1);


--
-- Data for Name: timescale_yearinput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (1, '1912', 1000);
INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (3, '1998', 1002);
INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (2, '1990', 1001);
INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (4, 'All', 0);


--
-- Data for Name: timescale_inputcombination; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (3, 2, 2, 4, 2);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (4, 2, 3, 4, 1);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (5, 2, 1, 4, 3);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (6, 2, 3, 1, 4);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (7, 2, 2, 1, 5);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (8, 2, 1, 1, 6);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (9, 2, 3, 2, 7);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (10, 2, 2, 2, 8);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (11, 2, 1, 2, 9);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (23, 1, 1, 2, 21);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (22, 1, 2, 2, 20);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (20, 1, 1, 1, 18);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (19, 1, 2, 1, 17);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (18, 1, 3, 1, 16);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (17, 1, 1, 4, 15);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (16, 1, 3, 4, 13);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (15, 1, 2, 4, 14);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (21, 1, 3, 2, 19);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (12, NULL, NULL, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (13, 1, 1, 3, 24);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (14, 1, 2, 3, 23);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (301, 1, 3, 3, 22);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (302, 2, 1, 3, 12);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (303, 2, 2, 3, 11);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (304, 2, 3, 3, 10);


--
-- Name: timescale_inputcombination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timescale_inputcombination_id_seq', 304, true);


--
-- Name: timescale_seasoninput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timescale_seasoninput_id_seq', 2, true);


--
-- Name: timescale_yearinput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timescale_yearinput_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

