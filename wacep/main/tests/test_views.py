from django.test import TestCase
from django.test.client import Client
from django.conf import settings


class BasicTest(TestCase):
    def setUp(self):
        self.c = Client()

    def test_splash_enabled(self):
        with self.settings(SHOW_SPLASH=True):
            response = self.c.get("/")
            self.assertEquals(response.status_code, 200)
            
    def test_splash_disabled(self):
        with self.settings(SHOW_SPLASH=False):
            response = self.c.get("/")
            self.assertEquals(response.status_code, 302)

    def test_smoketest(self):
        response = self.c.get("/smoketest/")
        self.assertEquals(response.status_code, 200)
        assert "PASS" in response.content
