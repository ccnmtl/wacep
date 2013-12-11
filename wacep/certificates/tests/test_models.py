from django.test import TestCase
from wacep.timescale.models import YearInput, GraphingModeInput
from wacep.timescale.models import SeasonInput
from django.contrib.auth.models import User
from wacep.certificates.models import CertificateCourse


class BasicModelTest(TestCase):
    def setUp(self):
        self.yearinput = YearInput(name="yearinput")
        self.graphinput = GraphingModeInput(name="graphinput")
        self.season = SeasonInput(name="season")
        self.user = User.objects.create_superuser(
            'staffperson', 'email@email.com', 'staffperson')
        self.user.save()
        self.certcourse = CertificateCourse()
        self.certcourse.save()


    def test_uni(self):
        self.assertEquals(unicode(self.yearinput), self.yearinput.name)
        self.assertEquals(unicode(self.graphinput), self.graphinput.name)
        self.assertEquals(unicode(self.season), self.season.name)
        self.assertEquals(unicode(self.certcourse), self.certcourse.name)

    def test_absolute_url(self):
        self.urlcheck = self.certcourse.get_absolute_url()
        self.assertEquals(self.urlcheck, '/admin/certificates/certificatecourse/%d/'  % self.certcourse.id)

    def test_absolute_url(self):
        self.urlcheck = self.certcourse.get_absolute_url()
        self.assertEquals(self.urlcheck, '/admin/certificates/certificatecourse/%d/'  % self.certcourse.id)


# 8 		    """A course for which we offer a certificate"""
# 9 	1 	    name = models.CharField(max_length=256, default='')
# 10 	1 	    order_rank = models.IntegerField(default=0, null=True, blank=True)
# 11 		
# 12 	1 	    section = models.ForeignKey(
# 13 		        Section, null=True, blank=True,
# 14 		        help_text="The section corresponding to this course.",
# 15 		        unique=True, limit_choices_to={'depth': 2})
# 16 		
# 17 	1 	    description = models.TextField(
# 18 		        blank=True, default='',
# 19 		        help_text=(
# 20 		            "A description of this course, to appear on the Courses page."))
# 21 		
# 22 	1 	    def get_absolute_url(self):
# 23 	0 	        return '/admin/certificates/certificatecourse/%d/' % self.id
# 24 		
# 25 	1 	    def __unicode__(self):
# 26 	0 	        return self.name
# 27 		
# 28 	1 	    class Meta:
# 29 	1 	        ordering = ['order_rank']
# 30 	1 	        verbose_name_plural = "Courses"
# 31 		
# 32 	1 	    def to_json(self):
# 33 	0 	        return {
# 34 		            'id': self.id,
# 35 		            'name': self.name
# 36 		        }
# 37 		
# 38 	1 	    def student_user_ids(self):
# 39 	0 	        return [c.user.id for c in self.courseaccess_set.all()]
# 40 		
# 41 	1 	    def graduate_user_ids(self):
# 42 	0 	        return [c.user.id for c in self.certificate_set.all()]
# 43 		