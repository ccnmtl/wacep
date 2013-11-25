
SELECT MAX(id) FROM figure_viewer_inputcombination;
SELECT nextval('yfigure_viewer_inputcombination_id_seq');

SELECT MAX(id) FROM figure_viewer_activitystate;
SELECT nextval('figure_viewer_activitystate_id_seq');

SELECT MAX(id) FROM figure_viewer_animationinput;
SELECT nextval('figure_viewer_animationinput_id_seq');

SELECT MAX(id) FROM figure_viewer_seasoninput;
SELECT nextval('figure_viewer_seasoninput_id_seq');

SELECT MAX(id) FROM figure_viewer_climatevariableinput;
SELECT nextval('figure_viewer_climatevariableinput_id_seq');

SELECT MAX(id) FROM figure_viewer_graphingmodeinput;
SELECT nextval('figure_viewer_graphingmodeinput_id_seq');

SELECT MAX(id) FROM figure_viewer_yearinput;
SELECT nextval('figure_viewer_yearinput_id_seq');

SELECT MAX(id) FROM figure_viewer_modeofvariabilityinput ;
SELECT nextval('figure_viewer_modeofvariabilityinput_id_seq');

SELECT setval('figure_viewer_activitystate_id_seq', (SELECT MAX(id) FROM figure_viewer_activitystate));