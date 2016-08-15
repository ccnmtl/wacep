import django.views.static
import os.path

from django.conf.urls import url
from .views import (
    certificates_admin, update_certificates_admin, certificate,
    show_graduation, student_certificates, update_roster,
    roster,
)

media_root = os.path.join(os.path.dirname(__file__), "media")

urlpatterns = [
    url(r'^media/(?P<path>.*)$', django.views.static.serve,
        {'document_root': media_root}),
    url(r'^certificates_admin/$', certificates_admin,
        name='certificates_admin'),
    url(r'^update_certificates_admin/$', update_certificates_admin,
        name='update_certificates_admin'),
    url(r'^roster/$', roster, name='roster'),
    url(r'^update_roster/$', update_roster, name='update_roster'),
    url(r'^student_certificates/$', student_certificates,
        name='student_certificates'),
    url(r'^certificate_of_completion/(?P<user_id>.*)$',
        show_graduation, name='courses_completed'),
    url(r'^certificate/(?P<certificate_id>.*)$', certificate,
        name='certificate'),
]
