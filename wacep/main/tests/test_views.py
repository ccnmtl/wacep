from django.test import TestCase
from django.test.client import Client
from django.contrib.auth.models import User
from pagetree.models import Hierarchy
import factory
import random
import string


class BasicAnonTest(TestCase):
    def setUp(self):
        self.c = Client()

    def test_smoketest(self):
        response = self.c.get("/smoketest/")
        self.assertEquals(response.status_code, 200)
        assert "PASS" in response.content


def random_string(length=10):
    return u''.join(random.choice(string.ascii_letters) for x in range(length))


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
    username = factory.LazyAttribute(lambda t: random_string())


class HierarchyFactory(factory.DjangoModelFactory):
    class Meta:
        model = Hierarchy
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

    def test_welcome(self):
        make_test_hierarchy()
        response = self.c.get("/welcome/")
        self.assertEquals(response.status_code, 404)
        # this is caught by the flatpages middleware

    def test_page(self):
        make_test_hierarchy()
        response = self.c.get("/section-1/")
        self.assertEquals(response.status_code, 302)

    def test_edit_page(self):
        make_test_hierarchy()
        response = self.c.get("/edit/section-1/")
        self.assertEquals(response.status_code, 200)

    def test_courses_page(self):
        make_test_hierarchy()
        response = self.c.get("/courses/")
        self.assertEquals(response.status_code, 200)

    def test_change_password(self):
        self.c.login(username=self.u.username, password="test")
        r = self.c.get("/password/change/")
        self.assertEqual(r.status_code, 200)
