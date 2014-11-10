from django.contrib import admin
from wacep.weatherroulette.models import GameState, Move, Puzzle, PuzzleRound

admin.site.register(GameState)
admin.site.register(Move)
admin.site.register(Puzzle)
admin.site.register(PuzzleRound)
