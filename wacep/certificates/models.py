from django.db import models
from django.contrib.contenttypes import generic
from pagetree.models import Section
from django import forms
from django.contrib.auth.models import User


class CertificateCourse (models.Model):
    """A course for which we offer a certificate"""    
    name  = models.CharField(max_length=256, default = '')
    order_rank = models.IntegerField(default=0, null=True, blank=True)
    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

    def graduate_user_ids (self):
    	return [c.user.id for c in self.certificate_set.all()]

class Certificate (models.Model):
    """A course for which we offer a certificate"""
    user        = models.ForeignKey(User, related_name = 'certificates_earned')
    course      = models.ForeignKey ('CertificateCourse')
    date 		= models.DateTimeField(null=True)

    def __unicode__(self):
        return '%s took %s' % (self.user, self.course)

    class Meta:
        ordering = ['date']
        unique_together = ("user", "course")

    def to_json(self):
        return {
            'user': self.user,
            'course': self.course,
            'date' : self.date
        }

