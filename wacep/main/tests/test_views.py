from django.test import TestCase
from django.test.client import Client
from django.conf import settings


class BasicTest(TestCase):
    def setUp(self):
        self.c = Client()

    def test_root(self):
        response = self.c.get("/")
        try:
            if settings.SHOW_SPLASH:
                self.assertEquals(response.status_code, 200)
            else:
                self.assertEquals(response.status_code, 302)

        except AttributeError:
            print "not found"
            self.assertEquals(response.status_code, 302)

    def test_smoketest(self):
        response = self.c.get("/smoketest/")
        self.assertEquals(response.status_code, 200)
        assert "PASS" in response.content
