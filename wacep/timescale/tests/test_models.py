from django.test import TestCase
from wacep.timescale.models import GraphingModeInput, YearInput
from wacep.timescale.models import SeasonInput, InputCombination
from wacep.timescale.models import ActivityState
from pagetree.models import Hierarchy
import factory


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

    def test_input_combination_to_json(self):
        self.to_json = self.inputcombination.to_json()
        self.assertEquals(
            self.to_json,
            {
                'season_input_id': (
                    self.inputcombination.season_input.id
                    if self.inputcombination.season_input else None),
                'graphing_mode_input_id': (
                    self.inputcombination.graphing_mode_input.id
                    if self.inputcombination.graphing_mode_input else None),
                'year_input_id': (
                    self.inputcombination.year_input.id
                    if self.inputcombination.year_input else None),
                'activity_state_id': self.inputcombination.activity_state.id,
                'id': self.inputcombination.id})

    def test_activity_state_to_json(self):
        self.to_json = self.activitystate.to_json()
        self.assertEquals(
            self.to_json,
            {'name': self.activitystate.name,
             'id': self.activitystate.id,
             'image_path': '',
             'legend_path': '',
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


# class TimescaleBlock is a PageTree block - adding tests
# similar to those from factories in nepi (think Susan wrote?)
class HierarchyFactory(factory.DjangoModelFactory):
    class Meta:
        model = Hierarchy
    name = "main"
    base_url = "/"

    @factory.post_generation
    def populate(self, create, extracted, **kwargs):
        self.get_root().add_child_section_from_dict(
            {
                'label': 'Welcome',
                'slug': 'welcome',
                'pageblocks': [
                    {'label': 'Welcome to your new Site',
                     'css_extra': '',
                     'block_type': 'Text Block',
                     'body': 'You should now use the edit link to add content',
                     },
                ],
                'children': [],
            })
