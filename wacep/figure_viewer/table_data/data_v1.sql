--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;


INSERT INTO figure_viewer_figureviewertopic (id, slug) VALUES (1, 'GC');
INSERT INTO figure_viewer_figureviewertopic (id, slug) VALUES (2, 'NV');
INSERT INTO figure_viewer_figureviewertopic (id, slug) VALUES (3, 'TC');

--
-- Data for Name: figure_viewer_activitystate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (0, 'Default', '', 0, 'Title', '', '', '', '', '');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (80, 'Precipitation accumulation / SON / ', 'prcp_SON_cm.gif', 80, '', 'Average precipitation accumulation in centimeters over the September to November season.', '', '', 'prcp_season_colorbar_cm.gif', 'NOAA NCEP CPC CAMS OPI v0218');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (24, 'Temperature / MAM / ', 'temp_MAM.gif', 24, 'Title', 'Average temperature for the March to May season. ', '', '', 'temp_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1, Diagnostic monthly surface temperature data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (26, 'Precipitation / MAM / ', 'prcp_MAM.gif', 26, 'Title', 'Average daily precipitation rate for the March to May season. ', '', '', 'prcp_colorbar.gif', 'NOAA NCEP CPC CAMS OPI v0210');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (81, 'Precipitation accumulation / JJA / ', 'prcp_JJA_cm.gif', 81, '', 'Average precipitation accumulation in centimeters over the June to August season.', '', '', 'prcp_season_colorbar_cm.gif', 'NOAA NCEP CPC CAMS OPI v0219');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (1, 'Wind / Annual / ', 'wind_annual.gif', 1, 'Title', 'Average annual wind speed.', '', '', 'wind_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1 at 1000 mb. ');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (22, 'Wind / MAM / ', 'wind_MAM.gif', 22, 'Title', 'Average wind speed for the March to May season. ', '', '', 'wind_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1 at 1000 mb. ');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (11, 'Wind / DJF / ', 'wind_DJF.gif', 11, 'Title', 'Average wind speed for the December to February season.', '', '', 'wind_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1 at 1000 mb. ');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (46, 'Precipitation / SON / ', 'prcp_SON.gif', 46, 'Title', 'Average daily precipitation rate for the September to November season. ', '', '', 'prcp_colorbar.gif', 'NOAA NCEP CPC CAMS OPI v0211');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (32, 'Wind / JJA / ', 'wind_JJA.gif', 32, 'Title', 'Average wind speed for the June to August season.', '', '', 'wind_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1 at 1000 mb. ');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (77, 'Precipitation accumulation / Annual / ', 'prcp_annual_cm.gif', 77, '', 'Annual average precipitation accumulation in centimeters. ', '', '', 'prcp_annual_colorbar_cm.gif', 'NOAA NCEP CPC CAMS OPI v0215');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (61, 'ENSO/La Nina/1997/No', 'el_nino_1997_static.gif', 61, '', 'Average SST anomalies in the tropical Pacific in December 1997.', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (62, 'ENSO/La Nina/1988/Yes', 'la_nina_1988_animated.gif', 62, '', 'Map of monthly SST anomalies in the tropical Pacific for the time period of April 1988 to May 1989, displaying the evolution of the 1988 La Nina event. ', '', '', 'la_nina_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (63, 'ENSO/La Nina/1999/Yes', 'la_nina_1999_animated.gif', 63, '', 'Map of monthly SST anomalies in the tropical Pacific for the time period of April 1999 to May 2000, displaying the evolution of the 1999 La Nina event. ', '', '', 'la_nina_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (67, 'ENSO/La Nina/2010/No', 'la_nina_2010_static.gif', 67, '', 'Average SST anomalies in the tropical Pacific in December 2010.', '', '', 'la_nina_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (73, 'AMO / Correlation with Temperature', 'correlation_ERSST_AMVI_9ys_CRU_TS3p1_det_temp_95.jpg', 73, '', 'Correlation between detrended annual global temperature anomalies and an AMV index for the time period of 1901-2009. The AMV index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (0° to 70° N,70° W to 0°). ', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Surface Temperature Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (47, 'ENSO/Time Series//No', 'ERSSTv3b_ENSO_timeseries.jpg', 47, '', 'ENSO index based on monthly detrended SST anomalies averaged over the Nino 3.4 region (5° S to 5° N,170° W to 120° W).', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (57, 'ENSO/El Nino/1986/Yes', 'el_nino_1986_animated.gif', 57, '', 'Map of monthly SST anomalies in the tropical Pacific for the time period of April 1986 to May 1987, displaying the evolution of the 1986 El Nino event. ', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (48, 'AMO/Time Series//No', 'ERSSTv3b_AMV_std_timeseries.jpg', 48, '', 'Standardized AMV index based on annual detrended SST anomalies averaged over the latitude and longitude bounds (0° to 70° N,70° W to 0°).', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (49, 'PDO/Time Series//No', 'ERSSTv3b_PDO_std_timeseries.jpg', 49, '', 'Standardized PDO index based on annual detrended SST anomalies averaged over the latitude and longitude bounds (20° N to 75° N,120° E to 260° E).', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (54, 'AMO/Correlation with SST//No', 'correlation_ERSST_AMVI_9ys_ERSST_det_ssta_95.jpg', 54, '', 'Correlation between detrended annual global SST anomalies and an AMV index for the time period of 1854-2009. The AMV index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (0° to 70° N,70° W to 0°).', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (55, 'PDO/Correlation with SST//No', 'correlation_ERSST_PDOI_9ys_ERSST_det_ssta_95.jpg', 55, '', 'Correlation between detrended annual global SST anomalies and a PDO index for the time period of 1854-2009. The PDO index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (20° N to 75° N,120° E to 260° E). ', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (56, 'ENSO/El Nino/1982/Yes', 'el_nino_1982_animated.gif', 56, '', 'Map of monthly SST anomalies in the tropical Pacific for the time period of April 1982 to May 1983, displaying the evolution of the 1982 El Nino event. ', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (58, 'ENSO/El Nino/1997/Yes', 'el_nino_1997_animated.gif', 58, '', 'Map of monthly SST anomalies in the tropical Pacific for the time period of April 1997 to May 1998, displaying the evolution of the 1997 El Nino event. ', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (59, 'ENSO/El Nino/1982/No', 'el_nino_1982_static.gif', 59, '', 'Average SST anomalies in the tropical Pacific in December 1982.', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (60, 'ENSO/El Nino/1986/No', 'el_nino_1986_static.gif', 60, '', 'Average SST anomalies in the tropical Pacific in December 1986.', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (65, 'ENSO/La Nina/1988/No', 'la_nina_1988_static.gif', 65, '', 'Average SST anomalies in the tropical Pacific in December 1988.', '', '', 'la_nina_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (66, 'ENSO/La Nina/1999/No', 'la_nina_1999_static.gif', 66, '', 'Average SST anomalies in the tropical Pacific in December 1999.', '', '', 'la_nina_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (76, 'PDO / Correlation with Precipitation', 'correlation_ERSST_PDOI_9ys_CRU_TS3p1_det_prcp_95.jpg', 76, '', 'Correlation between detrended annual global precipitation anomalies and a PDO index for the time period of 1901-2009. The PDO index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (20° N to 75° N,120° E to 260° E). ', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Precipitation Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (53, 'ENSO/Correlation with SST//No', 'correlation_ERSST_ENSOI_5mo_ERSST_det_ssta_95.jpg', 53, '', 'Correlation between detrended monthly global SST anomalies and an ENSO index, based on a 5 month running average of detrended SST anomalies averaged over the Nino 3.4 region, for the time period of March 1950 to March 2013. ', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (70, 'PDO / Identification of events', 'ERSST_v3b_PDOI_9yr_events.jpg', 70, 'Standardized PDO index with 9 year smoothing, with positive and negative events identified. An event is defined by SST anomalies 1 standard deviation above or below the mean, as defined by the smoothed dataset, for a minimum of 4 years.', 'Standardized PDO index with 9 year smoothing, with positive and negative events identified. An event is defined by SST anomalies 1 standard deviation above or below the mean, as defined by the smoothed dataset, for a minimum of 4 years.', '', '', '', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (64, 'ENSO/La Nina/2010/Yes', 'la_nina_2010_animated.gif', 64, '', 'Map of monthly SST anomalies in the tropical Pacific for the time period of April 2010 to May 2011, displaying the evolution of the 2000 La Nina event. ', '', '', 'la_nina_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (68, 'ENSO / Identification of events', 'ERSST_v3b_ENSOI_5mo_events.jpg', 68, '', 'Correlation between detrended annual global precipitation anomalies and a PDO index for the time period of 1901-2009. The PDO index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (20° N to 75° N,120° E to 260° E). ', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Precipitation Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (69, 'AMO / Identification of events', 'ERSST_v3b_AMVI_9yr_events.jpg', 69, 'Standardized AMV index with 9 year smoothing, with positive and negative events identified. An event is defined by SST anomalies 1 standard deviation above or below the mean, as defined by the smoothed dataset, for a minimum of 4 years. ', 'Standardized AMV index with 9 year smoothing, with positive and negative events identified. An event is defined by SST anomalies 1 standard deviation above or below the mean, as defined by the smoothed dataset, for a minimum of 4 years. ', '', '', '', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (74, 'AMO / Correlation with Precipitation', 'correlation_ERSST_AMVI_9ys_CRU_TS3p1_det_prcp_95.jpg', 74, '', 'Correlation between detrended annual global precipitation anomalies and an AMV index for the time period of 1901-2009. The AMV index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (0° to 70° N,70° W to 0°).', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Precipitation Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (71, 'ENSO / Correlation with Temperature', 'correlation_ERSST_ENSOI_5mo_CRU_TS3p1_det_temp_95.jpg', 71, 'Correlation between detrended monthly global temperature anomalies and an ENSO index, based on a 5 month running average of detrended SST anomalies averaged over the Nino 3.4 region, for the time period of March 1950 to March 2013. ', 'Correlation between detrended monthly global temperature anomalies and an ENSO index, based on a 5 month running average of detrended SST anomalies averaged over the Nino 3.4 region, for the time period of March 1950 to March 2013. ', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Surface Temperature Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (78, 'Precipitation accumulation / DJF / ', 'prcp_DJF_cm.gif', 78, '', 'Average precipitation accumulation in centimeters over the December to February season.', '', '', 'prcp_season_colorbar_cm.gif', 'NOAA NCEP CPC CAMS OPI v0216');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (75, 'PDO / Correlation with Temperature', 'correlation_ERSST_PDOI_9ys_CRU_TS3p1_det_temp_95.jpg', 75, '', 'Correlation between detrended annual global temperature anomalies and a PDO index for the time period of 1901-2009. The PDO index is based on a 9 year running average of detrended SST anomalies averaged over the latitude and longitude bounds (20° N to 75° N,120° E to 260° E).', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Surface Temperature Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (50, 'ENSO/Identification of Events//No', 'ERSST_v3b_ENSOI_5mo_events.jpg', 50, '', 'ENSO index with 5 month smoothing, with positive and negative events identified. An event is defined by a positive or negative anomaly of .4℃ or more, as defined by the smoothed dataset, for a minimum of 6 months.', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (51, 'AMO/Identification of Events//No', 'ERSST_v3b_AMVI_9yr_events.jpg', 51, '', 'Standardized AMV index with 9 year smoothing, with positive and negative events identified. An event is defined by SST anomalies 1 standard deviation above or below the mean, as defined by the smoothed dataset, for a minimum of 4 years. ', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (3, 'Temperature / Annual / ', 'temp_annual.gif', 3, 'Title', 'Average annual temperature. ', '', '', 'temp_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1, Diagnostic monthly surface temperature data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (52, 'PDO/Identification of Events//No', 'ERSST_v3b_PDOI_9yr_events.jpg', 52, '', 'Standardized PDO index with 9 year smoothing, with positive and negative events identified. An event is defined by SST anomalies 1 standard deviation above or below the mean, as defined by the smoothed dataset, for a minimum of 4 years.', '', '', 'el_nino_colorbar.gif', 'NOAA NCDC ERSST version 3b');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (72, 'ENSO / Correlation with Precipitation', 'correlation_ERSST_ENSOI_5mo_CRU_TS3p1_det_prcp_95.jpg', 72, 'Correlation between detrended monthly global precipitation anomalies and an ENSO index, based on a 5 month running average of detrended SST anomalies averaged over the Nino 3.4 region, for the time period of March 1950 to March 2013.', 'Correlation between detrended monthly global precipitation anomalies and an ENSO index, based on a 5 month running average of detrended SST anomalies averaged over the Nino 3.4 region, for the time period of March 1950 to March 2013.', '', '', '', 'NOAA NCDC ERSST version 3b, UEA CRU 3.1 Precipitation Data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (5, 'Precipitation / Annual / ', 'prcp_annual.gif', 5, 'Title', 'Average annual daily precipitation rate.', '', '', 'prcp_colorbar.gif', 'NOAA NCEP CPC CAMS OPI v0208');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (16, 'Precipitation / DJF / ', 'prcp_DJF.gif', 16, 'Title', 'Average daily precipitation rate for the December to February season.', '', '', 'prcp_colorbar.gif', 'NOAA NCEP CPC CAMS OPI v0209');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (36, 'Precipitation / JJA / ', 'prcp_JJA.gif', 36, 'Title', 'Average daily precipitation rate for the June to August season.', '', '', 'prcp_colorbar.gif', 'NOAA NCEP CPC CAMS OPI v0212');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (6, 'Precipitation /  / Yes', 'prcp_annual_animated.gif', 6, 'Title', 'Monthly precipitation climatologies in units of mm per day, spanning January to December.', '', '', 'prcp_colorbar.gif', 'NOAA NCEP CPC CAMS OPI v0213');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (79, 'Precipitation accumulation / MAM / ', 'prcp_MAM_cm.gif', 79, '', 'Average precipitation accumulation in centimeters over the March to May season.', '', '', 'prcp_season_colorbar_cm.gif', 'NOAA NCEP CPC CAMS OPI v0217');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (82, 'Precipitation accumulation /  / Yes', 'prcp_annual_animated_cm.gif', 82, '', 'Monthly precipitation accumulation climatologies in units of cm, spanning January to December.', '', '', 'prcp_annual_animated_colorbar_cm.gif', 'NOAA NCEP CPC CAMS OPI v0222');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (13, 'Temperature / DJF / ', 'temp_DJF.gif', 13, 'Title', 'Average temperature for the December to February season.', '', '', 'temp_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1, Diagnostic monthly surface temperature data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (44, 'Temperature / SON / ', 'temp_SON.gif', 44, 'Title', 'Average temperature for the September to November season.', '', '', 'temp_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1, Diagnostic monthly surface temperature data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (34, 'Temperature / JJA / ', 'temp_JJA.gif', 34, 'Title', 'Average temperature for the June to August season.', '', '', 'temp_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1, Diagnostic monthly surface temperature data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (4, 'Temperature /  / Yes', 'temp_annual_animated.gif', 4, 'Title', 'Monthly temperature climatologies spanning January to December.', '', '', 'temp_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1, Diagnostic monthly surface temperature data');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (42, 'Wind / SON / ', 'wind_SON.gif', 42, 'Title', 'Average wind speed for the September to November season.', '', '', 'wind_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1 at 1000 mb. ');
INSERT INTO figure_viewer_activitystate (id, name, image_filename, order_rank, title, text, climate_impact, graph_title, colorbar_filename, source) VALUES (2, 'Wind /  / Yes', 'wind_annual_animated.gif', 2, 'Title', 'Monthly wind speed climatologies spanning January to December.', '', '', 'wind_colorbar.gif', 'NOAA NCEP-NCAR reanalysis CDAS-1 at 1000 mb. ');


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
INSERT INTO figure_viewer_climatevariableinput (id, name, order_rank) VALUES (3, 'Wind', 3);
INSERT INTO figure_viewer_climatevariableinput (id, name, order_rank) VALUES (2, 'Temperature', 4);
INSERT INTO figure_viewer_climatevariableinput (id, name, order_rank) VALUES (4, 'Precipitation accumulation', 2);


--
-- Name: figure_viewer_climatevariableinput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_climatevariableinput_id_seq', 4, true);


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
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (35, NULL, NULL, 2, 51, 2, NULL, 2, 2);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (31, NULL, NULL, 2, 47, 2, NULL, 1, 1);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (32, NULL, NULL, 2, 48, 2, NULL, 2, 1);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (33, NULL, NULL, 2, 49, 2, NULL, 3, 1);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (34, NULL, NULL, 2, 50, 2, NULL, 1, 2);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (36, NULL, NULL, 2, 52, 2, NULL, 3, 2);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (37, NULL, NULL, 2, 53, 2, NULL, 1, 3);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (38, NULL, NULL, 2, 54, 2, NULL, 2, 3);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (39, NULL, NULL, 2, 55, 2, NULL, 3, 3);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (44, NULL, NULL, 1, 57, 2, 2, 1, 4);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (46, NULL, NULL, 2, 59, 2, 1, 1, 4);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (47, NULL, NULL, 2, 60, 2, 2, 1, 4);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (48, NULL, NULL, 2, 61, 2, 3, 1, 4);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (45, NULL, NULL, 1, 58, 2, 3, 1, 4);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (43, NULL, NULL, 2, 56, 2, 1, 1, 4);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (49, NULL, NULL, 1, 62, 2, 4, 1, 5);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (50, NULL, NULL, 1, 63, 2, 5, 1, 5);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (51, NULL, NULL, 1, 64, 2, 6, 1, 5);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (52, NULL, NULL, 2, 65, 2, 4, 1, 5);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (53, NULL, NULL, 2, 66, 2, 5, 1, 5);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (54, NULL, NULL, 2, 67, 2, 6, 1, 5);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (55, NULL, NULL, NULL, 68, 3, NULL, 1, 2);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (56, NULL, NULL, NULL, 69, 3, NULL, 2, 2);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (57, NULL, NULL, NULL, 70, 3, NULL, 3, 2);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (58, NULL, NULL, NULL, 71, 3, NULL, 1, 6);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (59, NULL, NULL, NULL, 72, 3, NULL, 1, 7);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (60, NULL, NULL, NULL, 73, 3, NULL, 2, 6);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (61, NULL, NULL, NULL, 74, 3, NULL, 2, 7);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (62, NULL, NULL, NULL, 75, 3, NULL, 3, 6);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (63, NULL, NULL, NULL, 76, 3, NULL, 3, 7);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (68, 1, 4, 1, 82, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (64, 1, 4, 2, 77, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (65, 2, 4, 2, 78, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (66, 3, 4, 2, 79, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (67, 4, 4, 2, 81, 1, NULL, NULL, NULL);
INSERT INTO figure_viewer_inputcombination (id, season_input_id, climate_variable_input_id, animation_input_id, activity_state_id, topic_id, year_input_id, mode_of_variability_input_id, graphing_mode_input_id) VALUES (69, 5, 4, 2, 80, 1, NULL, NULL, NULL);


--
-- Name: figure_viewer_inputcombination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('figure_viewer_inputcombination_id_seq', 69, true);


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

