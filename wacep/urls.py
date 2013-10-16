from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.views.generic.simple import direct_to_template
import os.path
admin.autodiscover()
import staticmedia
from django.views.generic import RedirectView

site_media_root = os.path.join(os.path.dirname(__file__), "../media")

auth_urls = (r'^accounts/', include('django.contrib.auth.urls'))
if hasattr(settings, 'WIND_BASE'):
    auth_urls = (r'^accounts/', include('djangowind.urls'))

urlpatterns = patterns(
    '',
    auth_urls,
    (r'^logout/$',
    'django.contrib.auth.views.logout',
    {'next_page': None}),
    (r'^_pagetree/', include('pagetree.urls')),
    (r'^_quiz/', include('quizblock.urls')),
    (r'/admin/login/',   RedirectView.as_view(url='/admin/')),
    (r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='/welcome/'),
        name='welcome'),
    (r'^password_change/$', 'django.contrib.auth.views.password_change'),
    (r'^splash/$', 'wacep.main.views.splash'),
    (r'^courses/$', 'wacep.main.views.courses'),
    (r'^munin/', include('munin.urls')),
    (r'^stats/', direct_to_template, {'template': 'stats.html'}),
    (r'smoketest/', include('smoketest.urls')),
    (r'^site_media/(?P<path>.*)$',
     'django.views.static.serve', {'document_root': site_media_root}),
    (r'^uploads/(?P<path>.*)$',
     'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    (r'^edit/(?P<path>.*)$', 'wacep.main.views.edit_page',
     {}, 'edit-page'),
    (r'^_timescale/', include('wacep.timescale.urls')),
    (r'^_certificates/', include('wacep.certificates.urls',
                                 namespace='certificates')),
    (r'^(?P<path>.*)$', 'wacep.main.views.page'),

) + staticmedia.serve()
