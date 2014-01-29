from django.test import TestCase
from wacep.figure_viewer.models import GraphingModeInput, ClimateVariableInput
from wacep.figure_viewer.models import SeasonInput, AnimationInput
from wacep.figure_viewer.models import ModeOfVariabilityInput, YearInput
from wacep.figure_viewer.models import InputCombination, ActivityState
from wacep.figure_viewer.models import FigureViewerTopic


class TestFigureViewerModel(TestCase):
    def setUp(self):
        self.graphinput = GraphingModeInput(name="graphinput")
        self.graphinput.save()
        self.climate = ClimateVariableInput(name="climate")
        self.climate.save()
        self.season = SeasonInput(name="season")
        self.season.save()
        self.animation = AnimationInput(name="season")
        self.animation.save()
        self.mode = ModeOfVariabilityInput(name="season")
        self.mode.save()
        self.year = YearInput(name="season")
        self.year.save()
        self.figureviewer = FigureViewerTopic()
        self.figureviewer.save()
        self.activitystate = ActivityState(name="activitystate")
        self.activitystate.save()
        self.inputcombination = InputCombination(
            topic=self.figureviewer,
            season_input=self.season,
            climate_variable_input=self.climate,
            animation_input=self.animation,
            year_input=self.year,
            mode_of_variability_input=self.mode,
            graphing_mode_input=self.graphinput,
            activity_state=self.activitystate)
        self.inputcombination.save()

    def test_uni(self):
        self.assertEquals(unicode(self.graphinput), self.graphinput.name)
        self.assertEquals(unicode(self.season), self.season.name)
        self.assertEquals(unicode(self.climate), self.climate.name)
        self.assertEquals(unicode(self.animation), self.animation.name)
        self.assertEquals(unicode(self.mode), self.mode.name)
        self.assertEquals(unicode(self.year), self.year.name)
        self.assertEquals(unicode(self.figureviewer), self.figureviewer.slug)
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

    def test_climate_to_json(self):
        self.to_json = self.climate.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.climate.id,
             'name': self.climate.name})

        self.assertEquals(unicode(self.mode), self.mode.name)
        self.assertEquals(unicode(self.year), self.year.name)

    def test_animation_to_json(self):
        self.to_json = self.animation.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.animation.id,
             'name': self.animation.name})

    def test_mode_to_json(self):
        self.to_json = self.mode.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.mode.id,
             'name': self.mode.name})

    def test_year_to_json(self):
        self.to_json = self.year.to_json()
        self.assertEquals(
            self.to_json,
            {'id': self.year.id,
             'name': self.year.name})

    def test_figureviewer_to_json(self):
        self.to_json = self.figureviewer.to_json()
        self.assertEquals(
            self.to_json,
            {'slug': self.figureviewer.slug,
             'id': self.figureviewer.id,
             'topic_settings': self.figureviewer.topic_settings[
                 self.figureviewer.slug]})

    def test_absolute_url(self):
        self.urlcheck = self.activitystate.get_absolute_url()
        self.assertEquals(
            self.urlcheck,
            "/admin/figure_viewer/activitystate/%i/" % self.activitystate.id)

    def test_activity_state_to_json(self):
        self.to_json = self.activitystate.to_json()
        self.assertEquals(
            self.to_json,
            {'name': self.activitystate.name,
             'id': self.activitystate.id,
             'image_path': '',
             'color_bar': '',
             'text': self.activitystate.text,
             'source': self.activitystate.source,
             'absolute_url': self.activitystate.get_absolute_url()})

    def test_input_is_default(self):
        self.assertFalse(self.inputcombination.is_default())

    def test_input_show_buttons(self):
        self.assertFalse(self.inputcombination.show_animate_buttons())

    def test_input_to_json(self):
        result = {
            'name': self.inputcombination.__unicode__(),
            'show_animate_buttons':
                self.inputcombination.show_animate_buttons(),
            'topic_id':
                self.inputcombination.topic_id
                    if self.inputcombination.topic else None,
            'season_input_id':
                (self.inputcombination.season_input.id
                    if self.inputcombination.season_input else None),
            'climate_variable_input_id':
                (self.inputcombination.climate_variable_input_id
                    if self.inputcombination.climate_variable_input_id
                    else None),
            'animation_input_id': (
                self.inputcombination.animation_input_id
                    if self.inputcombination.animation_input_id
                    else None),
            'year_input_id': self.inputcombination.year_input.id
                if self.inputcombination.year_input else None,
            'mode_of_variability_input_id': (
                self.inputcombination.mode_of_variability_input_id
                    if self.inputcombination.mode_of_variability_input_id
                    else None),
            'graphing_mode_input_id': (
                self.inputcombination.graphing_mode_input_id
                if self.inputcombination.graphing_mode_input_id
                    else None),
            'activity_state_id': self.inputcombination.activity_state.id,
            'id': self.inputcombination.id,
            'is_default': self.inputcombination.is_default()
        }
        return 
