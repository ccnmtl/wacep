from django.db import models
from rest_framework import serializers, viewsets


class HurricaneYear(models.Model):
    year = models.DateField()
    named_storms = models.IntegerField(default=0)
    hurricanes = models.IntegerField(default=0)
    nino_sst_anomalies = models.FloatField(default=0.0)

    def __unicode__(self):
        return self.year

    class Meta:
        ordering = ['year']


class HurricaneYearSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HurricaneYear
        fields = ('year', 'named_storms', 'hurricanes', 'nino_sst_anomalies')


# ViewSets define the view behavior.
class HurricaneYearViewSet(viewsets.ModelViewSet):
    model = HurricaneYear


class HurricaneViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = HurricaneYear.objects.all()
    serializer_class = HurricaneYearSerializer
