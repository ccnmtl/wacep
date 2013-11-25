from django.test import TestCase
from wacep.timescale.models import YearInput, GraphingModeInput
from wacep.timescale.models import SeasonInput


class BasicModelTest(TestCase):
    def setUp(self):
        self.yearinput = YearInput(name="yearinput")
        self.graphinput = GraphingModeInput(name="graphinput")
        self.season = SeasonInput(name="season")

    def test_uni(self):
        self.assertEquals(unicode(self.yearinput), self.yearinput.name)
        self.assertEquals(unicode(self.graphinput), self.graphinput.name)
        self.assertEquals(unicode(self.season), self.season.name)
