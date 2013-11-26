from django.conf.urls.defaults import patterns, url
urlpatterns = patterns(
    '',
    # url(r'^$',
    #     'wacep.analytics.views.analytics_table',
    #     name="analytics_table"),

    # url(r'^answers/$',
    #     'wacep.analytics.views.get_answers',
    #     name="answers"),

    # url(r'^submissions/$',
    #     'wacep.analytics.views.get_submission_quiz',
    #     name="submissions"),

    # url(r'^submissions2/$',
    #     'wacep.analytics.views.get_submission_quiz_quiz',
    #     name="submissions2"),

    # url(r'^get_user_quiz_answers/$',
    #     'wacep.analytics.views.get_user_quiz_answers',
    #     name="submissions2"),


    url(r'^website_table/$',
        'wacep.analytics.views.website_table',
        name="website_table"),



    # url(r'^testing/$',
    #     'wacep.analytics.views.analytics_table_testing',
    #     name="analytics_table_testing"),

    # url(r'csv/$',
    #     'wacep.analytics.views.analytics_csv',
    #     name="analytics_csv")
)
