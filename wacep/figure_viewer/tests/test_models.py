from django.test import TestCase
from wacep.timescale.models import YearInput, GraphingModeInput
from wacep.timescale.models import SeasonInput
from django.contrib.auth.models import User
from wacep.figure_viewer.models import GraphingModeInput, ClimateVariableInput
from wacep.figure_viewer.models import SeasonInput, AnimationInput
from wacep.figure_viewer.models import ModeOfVariabilityInput, YearInput
from wacep.figure_viewer.models import InputCombination, ActivityState
from wacep.figure_viewer.models import FigureViewerTopic, FigureViewerBlock
from wacep.figure_viewer.models import FigureViewerBlockForm

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
        #self.inputcombination = InputCombination()
        # self.user = User.objects.create_superuser(
        #     'staffperson', 'email@email.com', 'staffperson')
        # self.user.save()
        # self.certcourse = CertificateCourse()
        # self.certcourse.save()
        # self.studentuser = User.objects.create_user(
        #     'studentperson', 'email@email.com', 'studentperson')
        # self.studentuser.save()
        # self.courseaccess = CourseAccess(user=self.studentuser,
        #                                  course=self.certcourse)
        # self.courseaccess.save()
        # self.certificate = Certificate(user=self.studentuser,
        #                                course=self.certcourse)
        # self.certificate.save()

    def test_uni(self):
        #self.assertEquals(unicode(self.yearinput), self.yearinput.name)
        self.assertEquals(unicode(self.graphinput), self.graphinput.name)
        self.assertEquals(unicode(self.season), self.season.name)
        self.assertEquals(unicode(self.climate), self.climate.name)
        self.assertEquals(unicode(self.animation), self.animation.name)
        self.assertEquals(unicode(self.mode), self.mode.name)
        self.assertEquals(unicode(self.year), self.year.name)
        self.assertEquals(unicode(self.figureviewer), self.figureviewer.slug)
    #     self.assertEquals(
    #         unicode(self.courseaccess),
    #         '%s has access to %s' % (self.courseaccess.user,
    #         self.courseaccess.course))
    #     self.assertEquals(
    #         unicode(self.certificate),
    #         '%s took %s' % (self.courseaccess.user,
    #         self.courseaccess.course))

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
             'topic_settings': self.figureviewer.topic_settings[self.figureviewer.slug]})

        
    # def test_absolute_url(self):
    #     self.urlcheck = self.certcourse.get_absolute_url()
    #     self.assertEquals(
    #         self.urlcheck,
    #         '/admin/certificates/certificatecourse/%d/' % self.certcourse.id)



    # def test_corresponding_cert(self):
    #     self.check = self.courseaccess.corresponding_certificate()
    #     self.assertEquals(self.check, self.certificate)

    # def test_no_corresponding_cert(self):
    #     self.studentnocert = User.objects.create_user(
    #         'otherstudentperson', 'email@email.com', 'otherstudentperson')
    #     self.studentnocert.save()
    #     self.no_cert = CourseAccess(
    #         user=self.studentnocert,
    #         course=self.certcourse)
    #     self.no_cert.save()
    #     self.checknocert = self.no_cert.corresponding_certificate()
    #     self.assertEquals(self.checknocert, None)

    # def test_course_access_to_json(self):
    #     self.to_json = self.courseaccess.to_json()
    #     self.assertEquals(
    #         self.to_json,
    #         {'user': self.courseaccess.user,
    #          'course': self.courseaccess.course,
    #          'date': None})

    # def test_cert_get_url(self):
    #     self.assertEquals(
    #         self.certificate.get_absolute_url(),
    #         '/_certificates/certificate/%d' % self.certificate.id)

    # def test_cert_corresponding_course_access(self):
    #     self.assertEquals(
    #         self.certificate.corresponding_course_access(),
    #         self.courseaccess)

    # def test_cert_to_json(self):
    #     self.assertEquals(
    #         self.certificate.to_json(),
    #         {'user': self.certificate.user,
    #          'course': self.certificate.course,
    #          'date': None})
