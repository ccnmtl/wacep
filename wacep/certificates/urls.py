from django.conf.urls.defaults import patterns, url
import os.path

media_root = os.path.join(os.path.dirname(__file__), "media")

urlpatterns = patterns(
    '',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve',
     {'document_root': media_root}),
    url(r'^certificates_admin/$',
        'wacep.certificates.views.certificates_admin',
        name='certificates_admin'),
    url(r'^update_certificates_admin/$',
        'wacep.certificates.views.update_certificates_admin',
        name='update_certificates_admin'),
    url(r'^student_certificates/$',
        'wacep.certificates.views.student_certificates',
        name='student_certificates'),
    url(r'^certificate/(?P<certificate_id>.*)$',
        'wacep.certificates.views.certificate',
        name='certificate'),
)