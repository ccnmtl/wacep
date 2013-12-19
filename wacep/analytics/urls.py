from django.conf.urls.defaults import patterns, url
urlpatterns = patterns(
    '',
    url(r'^csv/$',
        'wacep.analytics.views.csv',
        name="csv"),

    url(r'^website_table/$',
        'wacep.analytics.views.website_table',
        name="website_table"),

    url(r'^quiz/(?P<quiz_id>\d+)/$',
        'wacep.analytics.views.create_table',
        name="create_table"),
)
