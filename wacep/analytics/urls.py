from django.conf.urls import url
from .views import export_csv, course_table

urlpatterns = [
    url(r'^export_csv/(?P<section_id>\d+)/$', export_csv,
        name="export_csv"),
    url(r'^course_table/(?P<section_id>\d+)/$', course_table,
        name="course_table"),
]
