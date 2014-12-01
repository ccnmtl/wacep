from django.conf.urls import patterns, include, url
from rest_framework import routers
from .admin import wr_admin_site
from .views import (
    AdminPlayersView,
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
    url(r'^admin/', include(wr_admin_site.urls)),
    url(r'^admin/players/$', AdminPlayersView.as_view(),
        name='weatherroulette-admin-players'),
    url(r'^admin/export_game/(?P<pk>\d+)/?$',
        AdminExportPuzzleView.as_view(),
        name='weatherroulette-admin-export-puzzle'),
    url(r'^admin/export_participant_data/?$',
        AdminExportParticipantDataView.as_view(),
        name='weatherroulette-admin-export-participant-data'),
)
