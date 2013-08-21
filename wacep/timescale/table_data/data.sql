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

INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (25, 'Pristine', 25, '', ' "Variability of Annual Precipitation
The variability of annual precipitation in the Dominican Republic is dominated by variability on the interannual time scale. There is a small, long term drying trend for the region, but is very minor in comparison to the variance explained by the components of natural variability.   

Graphing Mode: Components
The “components” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2002. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the precipitation anomaly induced by each mode of climate variability at a given time step. " where id = 3;

;
', '', '', '', '', '', '', '', '', '', '', '');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (6, 'Annual components 1912', 6, 'annual_components.png', ' "Annual 1912:
The negative phases of natural variability are offset by a “positive” trend component. The resulting climate impact is “dry” for the annual total, with precipitation falling below the 8th percentile of precipitation anomalies.  

Next compare this year to the annual precipitation total in the year 1990. Is the climate impact the same? Why? 
" ', ' dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' -13.32 ', ' -12.39 ', '1912', ' 7.84 ', ' -22.96 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (11, 'Annual components and totals 1998', 11, 'annual_components_total.png', ' "Annual 1998:
In this case the long term trend only slightly dampens the net positive natural variability component, resulting in a “wet” season. This serves as an example where the long term signal would be considered negligible in comparison to the large component of variability on the seasonal to interannual timescale. 
" ', ' wet ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' 2.07 ', ' 29.29 ', '1998', ' 90.2 ', ' 26.26 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (5, 'Annual components and totals 1912', 5, 'annual_components_total.png', ' "Annual 1912:
The negative phases of natural variability are offset by a “positive” trend component. The resulting climate impact is “dry” for the annual total, with precipitation falling below the 8th percentile of precipitation anomalies.  

Next compare this year to the annual precipitation total in the year 1990. Is the climate impact the same? Why? 
" ', ' dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' -13.32 ', ' -12.39 ', '1912', ' 7.84 ', ' -22.96 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (12, 'Annual components 1998', 12, 'annual_components.png', ' "Annual 1998:
In this case the long term trend only slightly dampens the net positive natural variability component, resulting in a “wet” season. This serves as an example where the long term signal would be considered negligible in comparison to the large component of variability on the seasonal to interannual timescale. 
" ', ' wet ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' 2.07 ', ' 29.29 ', '1998', ' 90.2 ', ' 26.26 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (17, 'MJJ components and totals 1912', 17, 'MJJ_components_total.png', ' "MJJ 1912
Both the interannual and decadal components contribute large negative precipitation anomalies to the total precipitation. This signal, which would result in a very dry May to July season, is offset by a “positive” trend component. The resulting climate impact is “dry” for the MJJ season, with precipitation falling below the 8th percentile of precipitation for all years examined. 

Next compare this year to the MJJ season in the year 1990. Is the climate impact the same? Why? 
" ', ' dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -45.66 ', ' -42.23 ', '1912', ' 7.84 ', ' -69.29 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (16, 'MJJ percentile 1912', 16, 'MJJ_percentile.png', ' "MJJ 1912
Both the interannual and decadal components contribute large negative precipitation anomalies to the total precipitation. This signal, which would result in a very dry May to July season, is offset by a “positive” trend component. The resulting climate impact is “dry” for the MJJ season, with precipitation falling below the 8th percentile of precipitation for all years examined. 

Next compare this year to the MJJ season in the year 1990. Is the climate impact the same? Why? 
" ', ' dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -45.66 ', ' -42.23 ', '1912', ' 7.84 ', ' -69.29 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (4, 'Annual percentile 1912', 4, 'annual_percentile.png', ' "Annual 1912:
The negative phases of natural variability are offset by a “positive” trend component. The resulting climate impact is “dry” for the annual total, with precipitation falling below the 8th percentile of precipitation anomalies.  

Next compare this year to the annual precipitation total in the year 1990. Is the climate impact the same? Why? 
" ', ' dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' -13.32 ', ' -12.39 ', '1912', ' 7.84 ', ' -22.96 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (18, 'MJJ components 1912', 18, 'MJJ_components.png', ' "MJJ 1912
Both the interannual and decadal components contribute large negative precipitation anomalies to the total precipitation. This signal, which would result in a very dry May to July season, is offset by a “positive” trend component. The resulting climate impact is “dry” for the MJJ season, with precipitation falling below the 8th percentile of precipitation for all years examined. 

Next compare this year to the MJJ season in the year 1990. Is the climate impact the same? Why? 
" ', ' dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -45.66 ', ' -42.23 ', '1912', ' 7.84 ', ' -69.29 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (21, 'MJJ components 1990', 21, 'MJJ_components.png', ' "MJJ 1990
The negative precipitation anomalies attributed to the negative phases of the modes of natural variability are reinforced by the negative precipitation anomalies induced by the long term trend. The cumulative impact is an “extremely dry” MJJ season, with precipitation 1.66 standard deviations below the mean.  

Note compare this to the MJJ season in the year 1912. 
The decadal and inter-annual negative contributions to the total seasonal precipitation are actually higher in 1912 than in 1990, but they are offset by a positive anomaly from the long term trend. This highlights that although the long term signal is often “masked” by the natural variability of a region, there are scenarios where the long term trend can amplify natural variability and produce an “extreme” situation. 
" ', ' extremely dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -24.19 ', ' -33.38 ', '1990', ' 0 ', ' -81.36 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (19, 'MJJ percentile 1990', 19, 'MJJ_percentile.png', ' "MJJ 1990
The negative precipitation anomalies attributed to the negative phases of the modes of natural variability are reinforced by the negative precipitation anomalies induced by the long term trend. The cumulative impact is an “extremely dry” MJJ season, with precipitation 1.66 standard deviations below the mean.  

Note compare this to the MJJ season in the year 1912. 
The decadal and inter-annual negative contributions to the total seasonal precipitation are actually higher in 1912 than in 1990, but they are offset by a positive anomaly from the long term trend. This highlights that although the long term signal is often “masked” by the natural variability of a region, there are scenarios where the long term trend can amplify natural variability and produce an “extreme” situation. 
" ', ' extremely dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -24.19 ', ' -33.38 ', '1990', ' 0 ', ' -81.36 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (2, 'Annual components and totals noyear', 2, 'annual_components_total.png', ' "Variability of Annual Precipitation
The variability of annual precipitation in the Dominican Republic is dominated by variability on the interannual time scale. There is a small, long term drying trend for the region, but is very minor in comparison to the variance explained by the components of natural variability.   

Graphing Mode: Components and Total
The “components and total” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2002, and their resulting sum at each time step. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the magnitude of the precipitation anomaly induced by each mode of climate variability and the total precipitation anomaly for rainfall in the region, at any given time step. " ', ' - ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' - ', ' - ', '-', ' - ', ' - ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (9, 'Annual components 1990', 9, 'annual_components.png', ' "Annual 1990:
The sum of the components of natural variability would result in a cumulative impact of close to zero, but the long term trend component contributes a negative anomaly to the total precipitation. While the rainfall for this year fall within the 47th percentile, a very normal amount of rainfall, this is an example of a climate state where the contribution of the long term trend is not negligible when compared to the magnitude of natural variability. 

Note: How does this compare to the timescales decomposition for the 1990 MJJ season? 
The 1990 MJJ season was “extremely dry” based on its percentile analysis, but the cumulative annual rainfall for 1990 is categorized here as “normal”. This makes an important distinction between seasonal rainfall and total annual rainfall. It is possible, for example, that the seasonality of rainfall is changing in the region. This would mean that rainfall is decreasing for a particular season, and increasing in another.
" ', ' normal ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' 0.96 ', ' -1.58 ', '1990', ' 47.06 ', ' -4.13 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (8, 'Annual components and totals 1990', 8, 'annual_components_total.png', ' "Annual 1990:
The sum of the components of natural variability would result in a cumulative impact of close to zero, but the long term trend component contributes a negative anomaly to the total precipitation. While the rainfall for this year fall within the 47th percentile, a very normal amount of rainfall, this is an example of a climate state where the contribution of the long term trend is not negligible when compared to the magnitude of natural variability. 

Note: How does this compare to the timescales decomposition for the 1990 MJJ season? 
The 1990 MJJ season was “extremely dry” based on its percentile analysis, but the cumulative annual rainfall for 1990 is categorized here as “normal”. This makes an important distinction between seasonal rainfall and total annual rainfall. It is possible, for example, that the seasonality of rainfall is changing in the region. This would mean that rainfall is decreasing for a particular season, and increasing in another.
" ', ' normal ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' 0.96 ', ' -1.58 ', '1990', ' 47.06 ', ' -4.13 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (10, 'Annual percentile 1998', 10, 'annual_percentile.png', ' "Annual 1998:
In this case the long term trend only slightly dampens the net positive natural variability component, resulting in a “wet” season. This serves as an example where the long term signal would be considered negligible in comparison to the large component of variability on the seasonal to interannual timescale. 
" ', ' wet ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' 2.07 ', ' 29.29 ', '1998', ' 90.2 ', ' 26.26 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (20, 'MJJ components and totals 1990', 20, 'MJJ_components_total.png', ' "MJJ 1990
The negative precipitation anomalies attributed to the negative phases of the modes of natural variability are reinforced by the negative precipitation anomalies induced by the long term trend. The cumulative impact is an “extremely dry” MJJ season, with precipitation 1.66 standard deviations below the mean.  

Note compare this to the MJJ season in the year 1912. 
The decadal and inter-annual negative contributions to the total seasonal precipitation are actually higher in 1912 than in 1990, but they are offset by a positive anomaly from the long term trend. This highlights that although the long term signal is often “masked” by the natural variability of a region, there are scenarios where the long term trend can amplify natural variability and produce an “extreme” situation. 
" ', ' extremely dry ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -24.19 ', ' -33.38 ', '1990', ' 0 ', ' -81.36 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (1, 'Annual percentile noyear', 1, 'annual_components.png', ' "Variability of Annual Precipitation
The variability of annual precipitation in the Dominican Republic is dominated by variability on the interannual time scale. There is a small, long term drying trend for the region, but is very minor in comparison to the variance explained by the components of natural variability.   

Graphing Mode: Percentiles
The “percentiles” graphing mode displays the precipitation percentile that corresponds to total precipitation at each time step from 1901-2002. The x-axis indicates the year, and the y-axis indicates the percentile of the total precipitation anomaly observed for a given year. There are additionally four thresholds that are indicated on the graph. These thresholds define the category of the climate experienced in the Dominican Republic in a season and year. Here the definition of “dry” or “extremely dry” applies to rainfall below the 10th percentile or the 5th percentile, respectively. Likewise the definition of “wet” or “extremely wet” applies to rainfall above the 90th percentile or the 95th percentile. Rainfall that falls between the 10th and 90th percentiles is categorized as “normal”.   " ', ' - ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' - ', ' - ', '-', ' - ', ' - ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (14, 'MJJ components and totals noyear', 14, 'MJJ_components_total.png', ' "Variability of Precipitation in the MJJ Season
The variability of precipitation for the May to July season in the Dominican Republic has a large, long term drying trend. The long term trend signal is notably higher in the MJJ case than in the annual timescales decomposition. Variability on the interannual and decadal timescales also make a significant contribution to precipitation variability in the region. 

Graphing Mode: Components and Total
The “components and total” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2002, and their resulting sum at each time step. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the magnitude of the precipitation anomaly induced by each mode of climate variability and the total precipitation anomaly for rainfall in the region, at any given time step. " ', ' - ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' - ', ' - ', '-', ' - ', ' - ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (22, 'MJJ percentile 1998', 22, 'MJJ_percentile.png', ' "MJJ: 1998
The negative precipitation anomalies induced by both the long term signal and the negative phase of decadal variability are dampened by the positive contribution from variability on the seasonal to inter-annual timescale. The cumulative climate impact is then “normal”.  This is an example of where the long term signal may dampen the signal due to variability on the seasonal to interannual timescale. 

Note compare this result to MJJ in 1990. 
In 1990, the climate signal amplified the negative precipitation anomalies produced by natural variability, producing an “extremely dry” season. By contrast, in 1998 the long term trend dampened the positive anomaly produced by the seasonal to inter-annual component, resulting in “normal” conditions. This serves to illustrate the point that the long term trend can serve to either amplify or dampen the existing climate signal due to natural variability.
" ', ' normal ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -12.48 ', '', '1998', ' 31.37 ', '');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (7, 'Annual percentile 1990', 7, 'annual_percentile.png', ' "Annual 1990:
The sum of the components of natural variability would result in a cumulative impact of close to zero, but the long term trend component contributes a negative anomaly to the total precipitation. While the rainfall for this year fall within the 47th percentile, a very normal amount of rainfall, this is an example of a climate state where the contribution of the long term trend is not negligible when compared to the magnitude of natural variability. 

Note: How does this compare to the timescales decomposition for the 1990 MJJ season? 
The 1990 MJJ season was “extremely dry” based on its percentile analysis, but the cumulative annual rainfall for 1990 is categorized here as “normal”. This makes an important distinction between seasonal rainfall and total annual rainfall. It is possible, for example, that the seasonality of rainfall is changing in the region. This would mean that rainfall is decreasing for a particular season, and increasing in another.
" ', ' normal ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 22.25 ', ' 22.25 ', ' 1.63 ', ' 0.96 ', ' -1.58 ', '1990', ' 47.06 ', ' -4.13 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (13, 'MJJ percentile noyear', 13, 'MJJ_percentile.png', ' "Variability of Precipitation in the MJJ Season
The variability of precipitation for the May to July season in the Dominican Republic has a large, long term drying trend. The long term trend signal is notably higher in the MJJ case than in the annual timescales decomposition. Variability on the interannual and decadal timescales also make a significant contribution to precipitation variability in the region. 

Graphing Mode: Percentiles
The “percentiles” graphing mode displays the precipitation percentile that corresponds to total precipitation at each time step from 1901-2002. The x-axis indicates the year, and the y-axis indicates the percentile of the total precipitation anomaly observed for a given year. There are additionally four thresholds that are indicated on the graph. These thresholds define the category of the climate experienced in the Dominican Republic in a season and year. Here the definition of “dry” or “extremely dry” applies to rainfall below the 10th percentile or the 5th percentile, respectively. Likewise the definition of “wet” or “extremely wet” applies to rainfall above the 90th percentile or the 95th percentile. Rainfall that falls between the 10th and 90th percentiles is categorized as “normal”.   " ', ' - ', ' Contributions of timescales of variability and change to total precipitation ', ' Percentile of Precipitation Anomaly ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' - ', ' - ', '-', ' - ', ' - ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (24, 'MJJ components 1998', 24, 'MJJ_components.png', ' "MJJ: 1998
The negative precipitation anomalies induced by both the long term signal and the negative phase of decadal variability are dampened by the positive contribution from variability on the seasonal to inter-annual timescale. The cumulative climate impact is then “normal”.  This is an example of where the long term signal may dampen the signal due to variability on the seasonal to interannual timescale. 

Note compare this result to MJJ in 1990. 
In 1990, the climate signal amplified the negative precipitation anomalies produced by natural variability, producing an “extremely dry” season. By contrast, in 1998 the long term trend dampened the positive anomaly produced by the seasonal to inter-annual component, resulting in “normal” conditions. This serves to illustrate the point that the long term trend can serve to either amplify or dampen the existing climate signal due to natural variability.
" ', ' normal ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -12.48 ', ' 23.9 ', '1998', ' 31.37 ', ' -23.15 ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (3, 'Annual components noyear', 3, 'annual_percentile.png', 'Variability of Annual Precipitation
The variability of annual precipitation in the Dominican Republic is dominated by variability on the interannual time scale. There is a small, long term drying trend for the region, but is very minor in comparison to the variance explained by the components of natural variability.   

Graphing Mode: Components
The “components” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2002. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the precipitation anomaly induced by each mode of climate variability at a given time step.', ' - ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 68.96 ', ' 22.25 ', ' 1.63 ', ' - ', ' - ', '-', ' - ', ' - ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (15, 'MJJ components noyear', 15, 'MJJ_components.png', ' "Variability of Precipitation in the MJJ Season
The variability of precipitation for the May to July season in the Dominican Republic has a large, long term drying trend. The long term trend signal is notably higher in the MJJ case than in the annual timescales decomposition. Variability on the interannual and decadal timescales also make a significant contribution to precipitation variability in the region. 

Graphing Mode: Components
The “components” graphing mode displays the time series of each climate mode of variability for the time span of 1901-2002. The x-axis indicates the year, and the y-axis indicates the magnitude of the precipitation anomaly in mm/month. The graph therefore displays the precipitation anomaly induced by each mode of climate variability at a given time step. " ', ' - ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' - ', ' - ', '-', ' - ', ' - ');
INSERT INTO timescale_activitystate (id, name, order_rank, image_filename, text, climate_impact, graph_title, y_scale_title, percent_interannual, percent_interdecadal, percent_trend, year_decadal, year_interannual, year, overall_percentile, overall_sum) VALUES (23, 'MJJ components and totals 1998', 23, 'MJJ_components_total.png', ' "MJJ: 1998
The negative precipitation anomalies induced by both the long term signal and the negative phase of decadal variability are dampened by the positive contribution from variability on the seasonal to inter-annual timescale. The cumulative climate impact is then “normal”.  This is an example of where the long term signal may dampen the signal due to variability on the seasonal to interannual timescale. 

Note compare this result to MJJ in 1990. 
In 1990, the climate signal amplified the negative precipitation anomalies produced by natural variability, producing an “extremely dry” season. By contrast, in 1998 the long term trend dampened the positive anomaly produced by the seasonal to inter-annual component, resulting in “normal” conditions. This serves to illustrate the point that the long term trend can serve to either amplify or dampen the existing climate signal due to natural variability.
" ', ' normal ', ' Contributions of timescales of variability and change to total precipitation ', ' Precipitation Anomaly (mm/month) ', ' 35.09 ', ' 35.09 ', ' 10.52 ', ' -12.48 ', ' 23.9 ', '1998', ' 31.37 ', ' -23.15 ');


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

