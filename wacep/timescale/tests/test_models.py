from django.test import TestCase
from wacep.timescale.models import GraphingModeInput, YearInput
from wacep.timescale.models import SeasonInput, InputCombination
from wacep.timescale.models import ActivityState

class TestTimescaleModel(TestCase):

    def setUp(self):
        self.graphinput = GraphingModeInput(name="graphinput")
        self.graphinput.save()
        self.season = SeasonInput(name="season")
        self.season.save()
        self.year = YearInput(name="season")
        self.year.save()
        self.activitystate = ActivityState(name="activitystate")
        self.activitystate.save()
        self.inputcombination = InputCombination(
            season_input=self.season,
            graphing_mode_input=self.graphinput,
            year_input=self.year,
            activity_state=self.activitystate)
        self.inputcombination.save()


    def test_uni(self):
        self.assertEquals(unicode(self.graphinput), self.graphinput.name)
        self.assertEquals(unicode(self.season), self.season.name)
        self.assertEquals(unicode(self.year), self.year.name)
        self.assertEquals(unicode(self.activitystate), self.activitystate.name)
        self.assertEquals(unicode(self.inputcombination),
                          "Inputs resulting in state %s " %
                          self.inputcombination.activity_state)



    def test_graphinput_to_json(self):
        self.to_json = self.graphinput.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.graphinput.id,
             'name': self.graphinput.name})


    def test_seasoninput_to_json(self):
        self.to_json = self.season.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.season.id,
             'name': self.season.name})


    def test_year_to_json(self):
        self.to_json = self.year.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.year.id,
             'name': self.year.name})

    def test_activity_state_to_json(self):
        self.to_json = self.activitystate.to_json()
        self.assertEquals(
            self.to_json,
            {'name': self.activitystate.name,
             'id': self.activitystate.id,
             'image_path': '',
             'legend_path': '',#'%s/%s' % ('/_timescale/media/img', ) if (fn != '') else '',
             'absolute_url': self.activitystate.get_absolute_url(),
             'text': self.activitystate.text,
             'graph_title': self.activitystate.graph_title,
             'y_scale_title': self.activitystate.y_scale_title,
             'percent_interannual': self.activitystate.percent_interannual,
             'percent_interdecadal': self.activitystate.percent_interdecadal,
             'percent_trend': self.activitystate.percent_trend,
             'year': self.activitystate.year,
             'year_trend': self.activitystate.year_trend,
             'year_interannual': self.activitystate.year_interannual,
             'year_decadal': self.activitystate.year_decadal,
             'year_sum': self.activitystate.year_sum,
             'year_percentile': self.activitystate.year_percentile,
             'climate_impact': self.activitystate.climate_impact,
             'show_left_side': self.activitystate.show_left_side,
             'show_year_details': self.activitystate.show_year_details

             })
