from django.db import models
from rest_framework import serializers, viewsets, permissions


class HurricaneYear(models.Model):
    year = models.PositiveSmallIntegerField()
    named_storms = models.IntegerField(default=0)
    hurricanes = models.IntegerField(default=0)
    nino_sst_anomalies = models.FloatField(default=0.0)

    def __unicode__(self):
        return unicode(self.year)

    class Meta:
        ordering = ['year']


class HurricaneYearSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HurricaneYear
        fields = ('year', 'named_storms', 'hurricanes', 'nino_sst_anomalies')


# ViewSets define the view behavior.
class HurricaneYearViewSet(viewsets.ModelViewSet):
    model = HurricaneYear
    queryset = HurricaneYear.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
