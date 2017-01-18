import django.contrib.auth.views
import djangowind.views

from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import password_change, password_change_done, \
    password_reset, password_reset_done, password_reset_complete, \
    password_reset_confirm
from django.views.generic import RedirectView
from django.views.generic import TemplateView
from wacep.main.views import courses, page, edit_page

admin.autodiscover()

auth_urls = url(r'^accounts/', include('django.contrib.auth.urls'))

redirect_after_logout = getattr(settings, 'LOGOUT_REDIRECT_URL', None)

logout_page = url(r'^accounts/logout/$',
                  django.contrib.auth.views.logout,
                  {'next_page': redirect_after_logout})
admin_logout_page = url(r'^accounts/logout/$',
                        django.contrib.auth.views.logout,
                        {'next_page': '/admin/'})

if hasattr(settings, 'CAS_BASE'):
    auth_urls = url(r'^accounts/', include('djangowind.urls'))
    logout_page = url(r'^accounts/logout/$', djangowind.views.logout,
                      {'next_page': redirect_after_logout})
    admin_logout_page = url(r'^admin/logout/$', djangowind.views.logout,
                            {'next_page': redirect_after_logout})

urlpatterns = [
    admin_logout_page,
    logout_page,
    auth_urls,
    url(r'^logout/$', django.contrib.auth.views.logout, {'next_page': None}),
    url(r'^_pagetree/', include('pagetree.urls')),
    url(r'^_quiz/', include('quizblock.urls')),
    url(r'analytics/', include('wacep.analytics.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='/welcome/'), name='welcome'),

    # password urls
    url(r'^password/change/$', password_change, name='password_change'),
    url(r'^password/change/done/$', password_change_done,
        name='password_change_done'),
    url(r'^password/reset/$', password_reset, name='password_reset'),
    url(r'^password/reset/done/$', password_reset_done,
        name='password_reset_done'),
    url(r'^password/reset/complete/$', password_reset_complete,
        name='password_reset_complete'),
    url(r'^password/reset/confirm/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$',
        password_reset_confirm, name='password_reset_confirm'),

    url(r'^courses/$', courses),
    url(r'^stats/$', TemplateView.as_view(template_name="stats.html")),
    url(r'smoketest/', include('smoketest.urls')),
    url(r'^uploads/(?P<path>.*)$', django.views.static.serve,
        {'document_root': settings.MEDIA_ROOT}),
    url(r'^edit/(?P<path>.*)$', edit_page, {}, 'edit-page'),
    url(r'^_timescale/', include('wacep.timescale.urls')),
    url(r'^_figure_viewer/', include('wacep.figure_viewer.urls')),
    url(r'^_certificates/', include('wacep.certificates.urls',
                                    namespace='certificates')),
    url(r'^forecast/?', include('wacep.forecaster.urls')),
    url(r'^hydrologic_cycle/?', include('wacep.weather_dj.urls',
                                        namespace='weather_dj')),
    url(r'^weatherdj/?', include('wacep.weather_dj.urls')),
    url(r'^weatherroulette/', include('wacep.weatherroulette.urls')),
    url(r'^(?P<path>.*)$', page)
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [url(r'^__debug__/', include(debug_toolbar.urls))]
