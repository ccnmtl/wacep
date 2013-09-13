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

INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (5, 'Annual components and totals 1912', 5, 'annual_comoponents_total.png', '"Annual 1921
Rainfall in 1921 is categorized as “normal”. The decadal component contributes a small negative anomaly, while the inter-annual component is neutral. The rainfall for this season falls into the 43rd percentile for the 1901-2009 period.

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '-2.68', '-0.09', '1921', true, true, '6.83', '43.12', '9.6', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (6, 'Annual components 1912', 6, 'annual_components.png', '"Annual 1921
Rainfall in 1921 is categorized as “normal”. The decadal component contributes a small negative anomaly, while the inter-annual component is neutral. The rainfall for this season falls into the 43rd percentile for the 1901-2009 period.

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '-2.68', '-0.09', '1921', true, true, '6.83', '43.12', '9.6', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (4, 'Annual percentile 1912', 4, 'annual_percentile.png', '"Annual 1921
Rainfall in 1921 is categorized as “normal”. The decadal component contributes a small negative anomaly, while the inter-annual component is neutral. The rainfall for this season falls into the 43rd percentile for the 1901-2009 period.

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '80', ' 13 ', '1', '-2.68', '-0.09', '1921', true, true, '6.83', '43.12', '9.6', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (18, 'MJJ components 1912', 18, 'JFM_components.png', '"JFM 1921
Rainfall in the January to March season of 1921 is categorized as “wet”, falling into the 92nd percentile. The inter-annual component contributes a large positive anomaly to the conditions, while the decadal and trend components reinforce this wet anomaly.  

Look at JFM season in 2000, how do the conditions compare? 

"', 'wet', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '9.47', '28.98', '1921', true, true, '47.85', '92.66', '9.39', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (15, 'MJJ components noyear', 15, 'JFM_components.png', '"Variability of precipitation in the JFM season
The variability of precipitation for the January to March season is dominated by interannual variability, similar to the annual case. In contrast, however, the January to March season displays a long-term signal of increased precipitation that is significant at the 5% percent level. While the percent variance explained by the long term trend remains small in comparison to the large contributions by the interannual component, it should be taken into consideration for seasonal predictions into the future. 

Graphing Mode: Components
The “components” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2009. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the precipitation anomaly induced by each mode of climate variability at a given time step. 
 "', '', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '-', '-', '-', true, false, '-', '-', '-', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (10, 'Annual percentile 1998', 10, 'annual_percentile.png', '"Annual 2005
The year 2005 is categorized by “extremely wet” rainfall. Note the very high positive anomaly due to the inter-annual component. The high rainfall in this season can be attributed to the 2005 hurricane season, which was the most active hurricane season on record. You notably do not observe this signal in the 2005 JFM season as the hurricane season, with its corresponding high rainfall amounts, lasts from June to November. 

"', 'extremely_wet', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '80', ' 13 ', '1', '12.27', '40.2', '2005', true, true, '70.95', '95.41', '18.48', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (20, 'MJJ components and totals 1990', 20, 'JFM_components_total.png', '"JFM 2000
Rainfall in the 2000 JFM season falls into the “extremely wet” category. Similar to the 1921 JFM season, the inter-annual component contributes a large positive anomaly to the total precipitation. However, in 2000 the trend component contributes more than double the calculated value at the beginning of the 20th century. Therefore, the trend component contributes to the large difference in rainfall observed in the JFM season in 2000 as compared to the JFM season in 1921 observed under similar conditions of natural variability. Note that although these seasons do not differ drastically in the measure of percentile, the total rainfall increased from 47.85 mm/month in 1921 to  72.37 mm/month in 2000. 

"', 'extremely_wet', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '15.54', '33.56', '2000', true, true, '72.37', '97.25', '23.27', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (23, 'MJJ components and totals 1998', 23, 'JFM_components_total.png', '"JFM 2005
The 2005 JFM season is categorized by “normal” rainfall. The large trend component, which contributed to wet conditions in the JFM 2000 season, is offset by the inter-annual and decadal components of natural variability which contribute large negative anomalies. This serves as an example of the idea that the long-term trend can either attenuate or exacerbate climate impacts. 

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '-6.36', '-13.6', '2005', true, true, '5.73', '41.28', '25.69', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (16, 'MJJ percentile 1912', 16, 'JFM_percentile.png', '"JFM 1921
Rainfall in the January to March season of 1921 is categorized as “wet”, falling into the 92nd percentile. The inter-annual component contributes a large positive anomaly to the conditions, while the decadal and trend components reinforce this wet anomaly.  

Look at JFM season in 2000, how do the conditions compare? 

"', 'wet', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '79', ' 14 ', '5', '9.47', '28.98', '1921', true, true, '47.85', '92.66', '9.39', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (12, 'Annual components 1998', 12, 'annual_components.png', '"Annual 2005
The year 2005 is categorized by “extremely wet” rainfall. Note the very high positive anomaly due to the inter-annual component. The high rainfall in this season can be attributed to the 2005 hurricane season, which was the most active hurricane season on record. You notably do not observe this signal in the 2005 JFM season as the hurricane season, with its corresponding high rainfall amounts, lasts from June to November. 

"', 'extremely_wet', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '12.27', '40.2', '2005', true, true, '70.95', '95.41', '18.48', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (11, 'Annual components and totals 1998', 11, 'annual_components_total.png', '"Annual 2005
The year 2005 is categorized by “extremely wet” rainfall. Note the very high positive anomaly due to the inter-annual component. The high rainfall in this season can be attributed to the 2005 hurricane season, which was the most active hurricane season on record. You notably do not observe this signal in the 2005 JFM season as the hurricane season, with its corresponding high rainfall amounts, lasts from June to November. 

"', 'extremely_wet', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '12.27', '40.2', '2005', true, true, '70.95', '95.41', '18.48', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (25, 'Pristine', 25, '', '<h4 style="color:blue">Hi there! &#9786;</h4>
<div>
Welcome to a <em>draft</em> version of the interactive timescale tool.
<div>
To get started, pick a season and a graphing mode. You can also click the question mark (help) button at any time for more helpful instructions. 
</div>
<em>Eddie and Marc are still working on this. Your mileage may vary.</em>', '', '', '', '', '', '', '', '', '', false, false, '', '', '', 'cat-cage-icon.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (7, 'Annual percentile 1990', 7, 'annual_percentile.png', '"Annual 2000
Rainfall for the year 2000 is categorized as “normal”. The inter-annual component of natural variability contributed a small positive anomaly, which was offset by the negative anomaly of equal magnitude from the decadal component. The trend signal is large, and conditions are slightly wet, but not outside of the “normal” range. 

Note here that the 2000 JFM season was categorized as “extremely wet”. This illustrates the magnitude of each mode of climate variability changes not only with location, but with season as well. 

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '80', ' 13 ', '1', '-6.24', '6.34', '2000', true, true, '17.28', '66.06', '17.17', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (17, 'MJJ components and totals 1912', 17, 'JFM_components_total.png', '"JFM 1921
Rainfall in the January to March season of 1921 is categorized as “wet”, falling into the 92nd percentile. The inter-annual component contributes a large positive anomaly to the conditions, while the decadal and trend components reinforce this wet anomaly.  

Look at JFM season in 2000, how do the conditions compare? 

"', 'wet', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '9.47', '28.98', '1921', true, true, '47.85', '92.66', '9.39', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (9, 'Annual components 1990', 9, 'annual_components.png', '"Annual 2000
Rainfall for the year 2000 is categorized as “normal”. The inter-annual component of natural variability contributed a small positive anomaly, which was offset by the negative anomaly of equal magnitude from the decadal component. The trend signal is large, and conditions are slightly wet, but not outside of the “normal” range. 

Note here that the 2000 JFM season was categorized as “extremely wet”. This illustrates the magnitude of each mode of climate variability changes not only with location, but with season as well. 

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '-6.24', '6.34', '2000', true, true, '17.28', '66.06', '17.17', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (2, 'Annual components and totals noyear', 2, 'annual_components_total.png', '"Variability of annual precipitation 
The variability of annual precipitation in Hispaniola is dominated by variability on the interannual time scale. There is a small, long term signal of increased precipitation for the region, but it is not significant at the 5% level, and it is therefore not clear if this value represents noise or a long-term signal that will continue into the future.  

Graphing Mode: Components and Total
The “components and total” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2009, and their resulting sum at each time step. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the magnitude of the precipitation anomaly induced by each mode of climate variability and the total precipitation anomaly for rainfall in the region, at any given time step. 

"', '', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '-', '-', '-', true, false, '-', '-', '-', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (8, 'Annual components and totals 1990', 8, 'annual_components_total.png', '"Annual 2000
Rainfall for the year 2000 is categorized as “normal”. The inter-annual component of natural variability contributed a small positive anomaly, which was offset by the negative anomaly of equal magnitude from the decadal component. The trend signal is large, and conditions are slightly wet, but not outside of the “normal” range. 

Note here that the 2000 JFM season was categorized as “extremely wet”. This illustrates the magnitude of each mode of climate variability changes not only with location, but with season as well. 

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '-6.24', '6.34', '2000', true, true, '17.28', '66.06', '17.17', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (24, 'MJJ components 1998', 24, 'JFM_components.png', '"JFM 2005
The 2005 JFM season is categorized by “normal” rainfall. The large trend component, which contributed to wet conditions in the JFM 2000 season, is offset by the inter-annual and decadal components of natural variability which contribute large negative anomalies. This serves as an example of the idea that the long-term trend can either attenuate or exacerbate climate impacts. 

"', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '-6.36', '-13.6', '2005', true, true, '5.73', '41.28', '25.69', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (21, 'MJJ components 1990', 21, 'JFM_components.png', '"JFM 2000
Rainfall in the 2000 JFM season falls into the “extremely wet” category. Similar to the 1921 JFM season, the inter-annual component contributes a large positive anomaly to the total precipitation. However, in 2000 the trend component contributes more than double the calculated value at the beginning of the 20th century. Therefore, the trend component contributes to the large difference in rainfall observed in the JFM season in 2000 as compared to the JFM season in 1921 observed under similar conditions of natural variability. Note that although these seasons do not differ drastically in the measure of percentile, the total rainfall increased from 47.85 mm/month in 1921 to  72.37 mm/month in 2000. 

"', 'extremely_wet', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '15.54', '33.56', '2000', true, true, '72.37', '97.25', '23.27', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (3, 'Annual components noyear', 3, 'annual_components.png', '"Variability of annual precipitation 
The variability of annual precipitation in Hispaniola is dominated by variability on the interannual time scale. There is a small, long term signal of increased precipitation for the region, but it is not significant at the 5% level, and it is therefore not clear if this value represents noise or a long-term signal that will continue into the future.  

Graphing Mode: Components
The “components” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2009. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the precipitation anomaly induced by each mode of climate variability at a given time step. "', '', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '80', ' 13 ', '1', '-', '-', '-', true, false, '-', '-', '-', 'legend_1.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (14, 'MJJ components and totals noyear', 14, 'JFM_components_total.png', '"Variability of precipitation in the JFM season
The variability of precipitation for the January to March season is dominated by interannual variability, similar to the annual case. In contrast, however, the January to March season displays a long-term signal of increased precipitation that is significant at the 5% percent level. While the percent variance explained by the long term trend remains small in comparison to the large contributions by the interannual component, it should be taken into consideration for seasonal predictions into the future. 

Graphing Mode: Components and Total
The “components and total” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2009, and their resulting sum at each time step. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the magnitude of the precipitation anomaly induced by each mode of climate variability and the total precipitation anomaly for rainfall in the region, at any given time step. 

"', '', 'Contributions of timescales of variability and change to total precipitation', 'Precipitation Anomaly (mm/month)', '79', ' 14 ', '5', '-', '-', '-', true, false, '-', '-', '-', 'legend_2.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (22, 'MJJ percentile 1998', 22, 'JFM_percentile.png', 'MJJ: 1998
The negative precipitation anomalies induced by both the long term signal and the negative phase of decadal variability are dampened by the positive contribution from variability on the seasonal to inter-annual timescale. The cumulative climate impact is then “normal”.  This is an example of where the long term signal may dampen the signal due to variability on the seasonal to interannual timescale. 

Note compare this result to MJJ in 1990. 
In 1990, the climate signal amplified the negative precipitation anomalies produced by natural variability, producing an “extremely dry” season. By contrast, in 1998 the long term trend dampened the positive anomaly produced by the seasonal to inter-annual component, resulting in “normal” conditions. This serves to illustrate the point that the long term trend can serve to either amplify or dampen the existing climate signal due to natural variability.', 'normal', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '79', ' 14 ', '5', '-6.36', '-13.6', '2005', true, true, '5.73', '41.28', '25.69', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (19, 'MJJ percentile 1990', 19, 'JFM_percentile.png', '"JFM 2000
Rainfall in the 2000 JFM season falls into the “extremely wet” category. Similar to the 1921 JFM season, the inter-annual component contributes a large positive anomaly to the total precipitation. However, in 2000 the trend component contributes more than double the calculated value at the beginning of the 20th century. Therefore, the trend component contributes to the large difference in rainfall observed in the JFM season in 2000 as compared to the JFM season in 1921 observed under similar conditions of natural variability. Note that although these seasons do not differ drastically in the measure of percentile, the total rainfall increased from 47.85 mm/month in 1921 to  72.37 mm/month in 2000. 

"', 'extremely_wet', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '79', ' 14 ', '5', '15.54', '33.56', '2000', true, true, '72.37', '97.25', '23.27', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (1, 'Annual percentile noyear', 1, 'annual_percentile.png', '"Variability of annual precipitation 
The variability of annual precipitation in Hispaniola is dominated by variability on the interannual time scale. There is a small, long term signal of increased precipitation for the region, but it is not significant at the 5% level, and it is therefore not clear if this value represents noise or a long-term signal that will continue into the future.  

Graphing Mode: Percentiles
The “percentiles” graphing mode displays the precipitation percentile that corresponds to total precipitation at each time step from 1901-2009. The x-axis indicates the year, and the y-axis indicates the percentile of the total precipitation anomaly observed for a given year. There are additionally four thresholds that are indicated on the graph. These thresholds define the category of the climate experienced in the Dominican Republic in a season and year. Here the definition of “dry” or “extremely dry” applies to rainfall below the 10th percentile or the 5th percentile, respectively. Likewise the definition of “wet” or “extremely wet” applies to rainfall above the 90th percentile or the 95th percentile. Rainfall that falls between the 10th and 90th percentiles is categorized as “normal”.   
"', '', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '80', ' 13 ', '1', '-', '-', '-', true, false, '-', '-', '-', 'legend_3.png');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, show_left_side, show_year_details, year_sum, year_percentile, year_trend, legend_filename) VALUES (13, 'MJJ percentile noyear', 13, 'JFM_percentile.png', '"Variability of precipitation in the JFM season
The variability of precipitation for the January to March season is dominated by interannual variability, similar to the annual case. In contrast, however, the January to March season displays a long-term signal of increased precipitation that is significant at the 5% percent level. While the percent variance explained by the long term trend remains small in comparison to the large contributions by the interannual component, it should be taken into consideration for seasonal predictions into the future. 

Graphing Mode: Percentiles
The “percentiles” graphing mode displays the precipitation percentile that corresponds to total precipitation at each time step from 1901-2009. The x-axis indicates the year, and the y-axis indicates the percentile of the total precipitation anomaly observed for a given year. There are additionally four thresholds that are indicated on the graph. These thresholds define the category of the climate experienced in the Dominican Republic in a season and year. Here the definition of “dry” or “extremely dry” applies to rainfall below the 10th percentile or the 5th percentile, respectively. Likewise the definition of “wet” or “extremely wet” applies to rainfall above the 90th percentile or the 95th percentile. Rainfall that falls between the 10th and 90th percentiles is categorized as “normal”.   
 "', '', 'Contributions of timescales of variability and change to total precipitation', 'Percentile of Precipitation Anomaly', '79', ' 14 ', '5', '-', '-', '-', true, false, '-', '-', '-', 'legend_3.png');


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

INSERT INTO timescale_seasoninput (id, name, order_rank) VALUES (2, 'Annual', 1);
INSERT INTO timescale_seasoninput (id, name, order_rank) VALUES (1, 'January, February and March', 0);


--
-- Data for Name: timescale_yearinput; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (1, '1921', 1000);
INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (2, '2000', 1001);
INSERT INTO timescale_yearinput (id, name, order_rank) VALUES (3, '2005', 1002);


--
-- Data for Name: timescale_inputcombination; Type: TABLE DATA; Schema: public; Owner: -
--

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
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (21, 1, 3, 2, 19);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (12, NULL, NULL, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (13, 1, 1, 3, 24);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (14, 1, 2, 3, 23);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (301, 1, 3, 3, 22);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (302, 2, 1, 3, 12);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (303, 2, 2, 3, 11);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (304, 2, 3, 3, 10);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (3, 2, 2, NULL, 2);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (4, 2, 3, NULL, 1);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (5, 2, 1, NULL, 3);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (17, 1, 1, NULL, 15);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (16, 1, 3, NULL, 13);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (15, 1, 2, NULL, 14);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (305, 1, NULL, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (306, 2, NULL, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (307, NULL, 2, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (308, NULL, 3, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (309, NULL, 1, NULL, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (310, 2, NULL, 1, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (311, 2, NULL, 2, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (312, 2, NULL, 3, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (313, 1, NULL, 1, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (314, 1, NULL, 2, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (315, 1, NULL, 3, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (316, NULL, NULL, 1, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (317, NULL, NULL, 2, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (318, NULL, NULL, 3, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (319, NULL, 2, 1, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (320, NULL, 2, 2, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (321, NULL, 2, 3, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (323, NULL, 3, 1, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (324, NULL, 3, 2, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (325, NULL, 3, 3, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (326, NULL, 1, 1, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (328, NULL, 1, 2, 25);
INSERT INTO timescale_inputcombination (id, season_input_id, graphing_mode_input_id, year_input_id, activity_state_id) VALUES (329, NULL, 1, 3, 25);


--
-- Name: timescale_inputcombination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('timescale_inputcombination_id_seq', 329, true);


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

