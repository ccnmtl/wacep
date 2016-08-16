import django.views.static
import os.path

from django.conf.urls import url
from .views import weather_dj

media_root = os.path.join(os.path.dirname(__file__), "media")

urlpatterns = [
    url(r'^media/(?P<path>.*)$', django.views.static.serve,
        {'document_root': media_root}),
    url(r'^$', weather_dj, name='weather_dj'),
]
