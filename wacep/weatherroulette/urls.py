from django.conf.urls import patterns, include, url
from rest_framework import routers
from wacep.weatherroulette.views import (
    AdminView,
    AdminExportPuzzleView,
    AdminExportParticipantDataView,
    GameStateView, MoveViewSet, PuzzleViewSet,
    PuzzleRoundViewSet
)


router = routers.DefaultRouter(trailing_slash=False)
router.register(r'moves', MoveViewSet)
router.register(r'puzzles', PuzzleViewSet)
router.register(r'puzzle_rounds', PuzzleRoundViewSet)

urlpatterns = patterns(
    '',
    url(r'^api/', include(router.urls)),
    url(r'^api/game_state', GameStateView.as_view(), name='game-state'),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    url(r'^admin/?$', AdminView.as_view(), name='weatherroulette-admin'),
    url(r'^admin/export-game/(?P<pk>\d+)/?$',
        AdminExportPuzzleView.as_view(),
        name='weatherroulette-admin-export-puzzle'),
    url(r'^admin/export-participant-data/?$',
        AdminExportParticipantDataView.as_view(),
        name='weatherroulette-admin-export-participant-data')
)
