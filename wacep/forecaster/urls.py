from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView
from rest_framework import routers
from wacep.forecaster.models import HurricaneYearViewSet
from wacep.forecaster.views import LinearRegressionView


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'hurricane', HurricaneYearViewSet, base_name='hurricane')


urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(
        template_name="forecaster/forecaster.html")),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^regression/', LinearRegressionView.as_view())
)
