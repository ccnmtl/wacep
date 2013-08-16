pg_dump -U eddie \
--column-inserts \
--data-only \
--no-owner \
--table=timescale_yearinput \
--table=timescale_graphingmodeinput \
--table=timescale_seasoninput \
--table=timescale_activitystate  \
--table=timescale_inputcombination \
wacep