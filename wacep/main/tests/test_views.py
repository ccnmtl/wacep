from django.test import TestCase
from django.test.client import Client
from django.conf import settings
from django.contrib.auth.models import User
from pagetree.models import Hierarchy
import factory
import random
import string


class BasicAnonTest(TestCase):
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


def random_string(length=10):
    return u''.join(random.choice(string.ascii_letters) for x in range(length))


class UserFactory(factory.DjangoModelFactory):
    FACTORY_FOR = User
    username = factory.LazyAttribute(lambda t: random_string())


class HierarchyFactory(factory.DjangoModelFactory):
    FACTORY_FOR = Hierarchy
    name = "main"
    base_url = ""


def make_test_hierarchy():
    h = HierarchyFactory()
    h.get_root().add_child_section_from_dict(
        {
            'label': 'Section 1',
            'slug': 'section-1',
            'pageblocks': [],
            'children': [],
        })
    return h


class LoggedInTest(TestCase):
    def setUp(self):
        self.c = Client()
        self.u = UserFactory()
        self.u.set_password("test")
        self.u.save()
        self.c.login(username=self.u.username, password="test")

    def test_splash_enabled(self):
        with self.settings(SHOW_SPLASH=True):
            response = self.c.get("/")
            self.assertEquals(response.status_code, 200)

    def test_page(self):
        h = make_test_hierarchy()
        response = self.c.get("/section-1/")
        self.assertEquals(response.status_code, 200)

    def test_edit_page(self):
        h = make_test_hierarchy()
        response = self.c.get("/edit/section-1/")
        self.assertEquals(response.status_code, 200)

    def test_instructor_page(self):
        h = make_test_hierarchy()
        response = self.c.get("/instructor/section-1/")
        self.assertEquals(response.status_code, 200)
