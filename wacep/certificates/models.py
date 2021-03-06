from django.db import models
from pagetree.models import Section
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


class CertificateCourse (models.Model):
    """A course for which we offer a certificate"""
    name = models.CharField(max_length=256, default='')
    order_rank = models.IntegerField(default=0, null=True, blank=True)

    section = models.OneToOneField(
        Section, null=True, blank=True,
        help_text="The section corresponding to this course.",
        limit_choices_to={'depth': 2})

    description = models.TextField(
        blank=True, default='',
        help_text=(
            "A description of this course, to appear on the Courses page."))

    def get_absolute_url(self):
        return '/admin/certificates/certificatecourse/%d/' % self.id

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']
        verbose_name_plural = "Courses"

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

    def student_user_ids(self):
        return [c.user.id for c in self.courseaccess_set.all()]

    def graduate_user_ids(self):
        return [c.user.id for c in self.certificate_set.all()]


class CourseAccess (models.Model):
    """A way to keep track of which users have access to which course."""
    user = models.ForeignKey(User, related_name='courses_i_take')
    course = models.ForeignKey('CertificateCourse')
    date = models.DateTimeField(null=True)

    def __unicode__(self):
        return '%s has access to %s' % (self.user, self.course)

    class Meta:
        ordering = ['course']
        unique_together = ("user", "course")
        verbose_name_plural = "Access to courses"

    def corresponding_certificate(self):
        """ a certificate with the same user and course"""
        try:
            return Certificate.objects.get(user=self.user, course=self.course)
        except ObjectDoesNotExist:
            return None

    def to_json(self):
        return {
            'user': self.user,
            'course': self.course,
            'date': self.date
        }


class Certificate (models.Model):
    """A way to keep track of which users "graduated" from which course."""
    user = models.ForeignKey(User, related_name='certificates_earned')
    course = models.ForeignKey('CertificateCourse')
    date = models.DateTimeField(null=True)

    def __unicode__(self):
        return '%s took %s' % (self.user, self.course)

    def get_absolute_url(self):
        return '/_certificates/certificate/%d' % self.id

    def corresponding_course_access(self):
        """ a certificate with the same user and course"""
        try:
            return CourseAccess.objects.get(user=self.user, course=self.course)
        except ObjectDoesNotExist:
            return None

    class Meta:
        ordering = ['course']
        unique_together = ("user", "course")
        verbose_name_plural = "Course certificates"

    def to_json(self):
        return {
            'user': self.user,
            'course': self.course,
            'date': self.date
        }
