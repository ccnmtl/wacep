from django.contrib import admin
from .forms import PuzzleAdminForm
from .models import GameState, Move, Puzzle, PuzzleRound

admin.site.register(GameState)
admin.site.register(Move)


class WeatherRouletteAdminSite(admin.AdminSite):
    site_header = 'Weather Roulette | Manage'
    site_title = 'Weather Roulette | Manage'
    index_title = ''
    index_template = 'weatherroulette/index.html'
    app_index_template = 'weatherroulette/app_index.html'


wr_admin_site = WeatherRouletteAdminSite(name='wradmin')


class PuzzleRoundInline(admin.TabularInline):
    model = PuzzleRound


class PuzzleAdmin(admin.ModelAdmin):
    inlines = [PuzzleRoundInline]
    exclude = ['description']
    form = PuzzleAdminForm


wr_admin_site.register(Puzzle, PuzzleAdmin)
