from django.conf.urls.defaults import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.views.generic.simple import direct_to_template
import os.path
admin.autodiscover()
import staticmedia

site_media_root = os.path.join(os.path.dirname(__file__), "../media")

redirect_after_logout = getattr(settings, 'LOGOUT_REDIRECT_URL', None)
auth_urls = (r'^accounts/', include('django.contrib.auth.urls'))
logout_page = (
    r'^accounts/logout/$',
    'django.contrib.auth.views.logout',
    {'next_page': redirect_after_logout})
if hasattr(settings, 'WIND_BASE'):
    auth_urls = (r'^accounts/', include('djangowind.urls'))
    logout_page = (
        r'^accounts/logout/$',
        'djangowind.views.logout',
        {'next_page': redirect_after_logout})

urlpatterns = patterns(
    '',
    auth_urls,
    logout_page,
    (r'^_pagetree/', include('pagetree.urls')),
    (r'^_quiz/', include('quizblock.urls')),
    (r'^admin/', include(admin.site.urls)),

    (r'^login/$', 'django.views.generic.simple.redirect_to', {'url': '/accounts/login/'}),
    (r'^login$',  'django.views.generic.simple.redirect_to', {'url': '/accounts/login/'}),


    url(r'^_impersonate/', include('impersonate.urls')),
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


    (r'^courses/$',     'wacep.main.views.courses'),

    #(r'^splash/$', 'wacep.main.views.splash'),
    
    (r'^(?P<path>.*)$', 'wacep.main.views.splash_or_page'),

    #(r'^/$', 'wacep.main.views.splash'),
    #(r'^$', 'wacep.main.views.splash'),
) + staticmedia.serve()
