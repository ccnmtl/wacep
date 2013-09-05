from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.views.generic.simple import direct_to_template
import os.path
admin.autodiscover()
import staticmedia

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
    (r'^admin/', include(admin.site.urls)),

    (r'^munin/', include('munin.urls')),
    (r'^stats/', direct_to_template, {'template': 'stats.html'}),
    (r'smoketest/', include('smoketest.urls')),
    (r'^site_media/(?P<path>.*)$',
     'django.views.static.serve', {'document_root': site_media_root}),
    (r'^uploads/(?P<path>.*)$',
     'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    # these need to be last
    (r'^edit/(?P<path>.*)$', 'wacep.main.views.edit_page',
     {}, 'edit-page'),
    (r'^instructor/(?P<path>.*)$',
     'wacep.main.views.instructor_page'),

    (r'^_timescale/', include('wacep.timescale.urls')),

    (r'^courses/$',     'wacep.main.views.courses'),
    (r'^(?P<path>.*)$', 'wacep.main.views.splash_or_page'),

) + staticmedia.serve()
