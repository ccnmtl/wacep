from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.views import password_change, password_change_done, \
    password_reset, password_reset_done, password_reset_complete, \
    password_reset_confirm
from django.views.generic import RedirectView
from django.views.generic import TemplateView


admin.autodiscover()

auth_urls = (r'^accounts/', include('django.contrib.auth.urls'))

redirect_after_logout = getattr(settings, 'LOGOUT_REDIRECT_URL', None)

logout_page = (r'^accounts/logout/$',
               'django.contrib.auth.views.logout',
               {'next_page': redirect_after_logout})
admin_logout_page = (r'^accounts/logout/$',
                     'django.contrib.auth.views.logout',
                     {'next_page': '/admin/'})

if hasattr(settings, 'CAS_BASE'):
    auth_urls = (r'^accounts/', include('djangowind.urls'))
    logout_page = (r'^accounts/logout/$',
                   'djangowind.views.logout',
                   {'next_page': redirect_after_logout})
    admin_logout_page = (r'^admin/logout/$',
                         'djangowind.views.logout',
                         {'next_page': redirect_after_logout})

urlpatterns = patterns(
    '',
    admin_logout_page,
    logout_page,
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

    # password urls
    url(r'^password/change/$',
        password_change,
        name='password_change'),
    url(r'^password/change/done/$',
        password_change_done,
        name='password_change_done'),
    url(r'^password/reset/$',
        password_reset,
        name='password_reset'),
    url(r'^password/reset/done/$',
        password_reset_done,
        name='password_reset_done'),
    url(r'^password/reset/complete/$',
        password_reset_complete,
        name='password_reset_complete'),
    url(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
        password_reset_confirm,
        name='password_reset_confirm'),

    (r'^courses/$', 'wacep.main.views.courses'),
    (r'^stats/$', TemplateView.as_view(template_name="stats.html")),
    (r'smoketest/', include('smoketest.urls')),
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
    (r'^weatherroulette/', include('wacep.weatherroulette.urls')),
    (r'^(?P<path>.*)$', 'wacep.main.views.page')
)
