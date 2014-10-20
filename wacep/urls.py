from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.views.generic import TemplateView
import os.path
admin.autodiscover()
from django.views.generic import RedirectView

site_media_root = os.path.join(os.path.dirname(__file__), "../media")

auth_urls = (r'^accounts/', include('django.contrib.auth.urls'))
if hasattr(settings, 'CAS_BASE'):
    auth_urls = (r'^accounts/', include('djangowind.urls'))

urlpatterns = patterns(
    '',
    auth_urls,
    (r'^logout/$',
     'django.contrib.auth.views.logout',
     {'next_page': None}),
    (r'^_pagetree/', include('pagetree.urls')),
    (r'^_quiz/', include('quizblock.urls')),
    (r'analytics/', include('wacep.analytics.urls')),
    (r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='/welcome/'),
        name='welcome'),
    (r'^password_change/$', 'django.contrib.auth.views.password_change'),
    (r'^courses/$', 'wacep.main.views.courses'),
    (r'^stats/$', TemplateView.as_view(template_name="stats.html")),
    (r'smoketest/', include('smoketest.urls')),
    (r'^site_media/(?P<path>.*)$',
     'django.views.static.serve', {'document_root': site_media_root}),
    (r'^uploads/(?P<path>.*)$',
     'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    (r'^edit/(?P<path>.*)$', 'wacep.main.views.edit_page',
     {}, 'edit-page'),
    (r'^_timescale/', include('wacep.timescale.urls')),
    (r'^_figure_viewer/', include('wacep.figure_viewer.urls')),
    (r'^_certificates/', include('wacep.certificates.urls',
                                 namespace='certificates')),
    (r'^forecast/?', include('wacep.forecaster.urls')),
    (r'^hydrologic_cycle/?', include('wacep.weather_dj.urls',
                                     namespace='weather_dj')),
    (r'^weatherdj/?', include('wacep.weather_dj.urls')),
    (r'^(?P<path>.*)$', 'wacep.main.views.page')
)
