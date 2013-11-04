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
-- Data for Name: figure_viewer_activitystate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (5, 'Annual / Precipitation / Off', 'prcp_annual.gif', 5, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (16, 'DJF / Precipitation / Off', 'prcp_DJF.gif', 16, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (26, 'MAM / Precipitation / Off', 'prcp_MAM.gif', 26, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (6, 'Annual / Precipitation / On', 'prcp_annual_animated.gif', 6, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (3, 'Annual / Temperature / Off', 'temp_annual.gif', 3, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (13, 'DJF / Temperature / Off', 'temp_DJF.gif', 13, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (24, 'MAM / Temperature / Off', 'temp_MAM.gif', 24, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (34, 'JJA / Temperature / Off', 'temp_JJA.gif', 34, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (4, 'Annual / Temperature / On', 'temp_annual_animated.gif', 4, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (1, 'Annual / Wind / Off', 'wind_annual.gif', 1, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (11, 'DJF / Wind / Off', 'wind_DJF.gif', 11, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (22, 'MAM / Wind / Off', 'wind_MAM.gif', 22, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (32, 'JJA / Wind / Off', 'wind_JJA.gif', 32, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (2, 'Annual / Wind / On', 'wind_annual_animated.gif', 2, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (0, 'Default', '', 0, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (46, 'SON / Precipitation / Off', 'prcp_SON.gif', 46, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (36, 'JJA / Precipitation / Off', 'prcp_JJA.gif', 36, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (44, 'SON / Temperature / Off', 'temp_SON.gif', 44, 'Title', '', '', '', NULL);
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename) VALUES (42, 'SON / Wind / Off', 'wind_SON.gif', 42, 'Title', '', '', '', NULL);


--
-- Name: figure_viewer_activitystate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_activitystate_id_seq', 50, true);


--
-- Data for Name: figure_viewer_animationinput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_animationinput (id, name, order_rank) VALUES (1, 'On', 1);
INSERT INTO figure_viewer_animationinput (id, name, order_rank) VALUES (2, 'Off ', 2);


--
-- Name: figure_viewer_animationinput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_animationinput_id_seq', 2, true);


--
-- Data for Name: figure_viewer_climatevariableinput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_climatevariableinput (id, name, order_rank) VALUES (1, 'Precipitation', 1);
INSERT INTO figure_viewer_climatevariableinput (id, name, order_rank) VALUES (2, 'Temperature', 2);
INSERT INTO figure_viewer_climatevariableinput (id, name, order_rank) VALUES (3, 'Wind', 3);


--
-- Name: figure_viewer_climatevariableinput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_climatevariableinput_id_seq', 3, true);


--
-- Data for Name: figure_viewer_modeofvariabilityinput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_modeofvariabilityinput (id, name, order_rank) VALUES (1, 'ENSO', 0);
INSERT INTO figure_viewer_modeofvariabilityinput (id, name, order_rank) VALUES (2, 'AMO', 1);
INSERT INTO figure_viewer_modeofvariabilityinput (id, name, order_rank) VALUES (3, 'PDO', 2);


--
-- Data for Name: figure_viewer_seasoninput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_seasoninput (id, name, order_rank) VALUES (1, 'Annual', 1);
INSERT INTO figure_viewer_seasoninput (id, name, order_rank) VALUES (2, 'DJF', 2);
INSERT INTO figure_viewer_seasoninput (id, name, order_rank) VALUES (3, 'MAM', 3);
INSERT INTO figure_viewer_seasoninput (id, name, order_rank) VALUES (4, 'JJA', 4);
INSERT INTO figure_viewer_seasoninput (id, name, order_rank) VALUES (5, 'SON', 5);


--
-- Data for Name: figure_viewer_inputcombination; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (1, 1, 1, 2, 5, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (2, 1, 1, 1, 6, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (3, 1, 3, 2, 1, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (4, 1, 3, 1, 2, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (5, 1, 2, 2, 3, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (6, 1, 2, 1, 4, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (7, 2, 1, 2, 16, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (8, 2, 3, 2, 16, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (9, 2, 2, 2, 13, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (10, 3, 2, 2, 24, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (11, 3, 3, 2, 22, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (12, 3, 1, 2, 26, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (13, 4, 3, 2, 32, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (14, 4, 2, 2, 34, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (15, 4, 1, 2, 36, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (16, 5, 1, 2, 46, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (17, 5, 2, 2, 44, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (18, 5, 3, 2, 42, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (23, NULL, NULL, 1, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (24, NULL, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (19, NULL, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (20, NULL, 1, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (21, NULL, 2, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (22, NULL, 3, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (25, 1, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (26, 2, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (27, 3, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (28, 4, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (29, 4, NULL, 2, 0, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (30, 5, NULL, 2, 0, 1, NULL, NULL, NULL);


--
-- Name: figure_viewer_inputcombination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_inputcombination_id_seq', 30, true);


--
-- Name: figure_viewer_modeofvariabilityinput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_modeofvariabilityinput_id_seq', 3, true);


--
-- Name: figure_viewer_seasoninput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_seasoninput_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--

