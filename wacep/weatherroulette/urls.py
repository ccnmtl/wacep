from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView
from rest_framework import routers
from wacep.weatherroulette.views import (
    GameStateView, MoveViewSet, PuzzleViewSet, PuzzleRoundViewSet
)


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'moves', MoveViewSet)
router.register(r'puzzles', PuzzleViewSet)
router.register(r'puzzle_rounds', PuzzleRoundViewSet)

urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(
        template_name="weatherroulette/index.html")),
    url(r'^api/', include(router.urls)),
    url(r'^api/game_state', GameStateView.as_view(), name='game-state'),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework'))
)
