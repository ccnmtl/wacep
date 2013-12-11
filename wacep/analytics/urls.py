from django.conf.urls.defaults import patterns, url
urlpatterns = patterns(
    '',
    url(r'^$',
        'wacep.analytics.views.analytics_table',
        name="analytics_table"),

    url(r'^csv/$',
        'wacep.analytics.views.analytics_csv',
        name="analytics_csv"),

)
