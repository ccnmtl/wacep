from django.contrib import admin
from wacep.weatherroulette.models import GameState, Puzzle, PuzzleRound

admin.site.register(GameState)
admin.site.register(Puzzle)
admin.site.register(PuzzleRound)
