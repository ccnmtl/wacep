from django.contrib import admin
from wacep.timescale.models import YearInput, GraphingModeInput, SeasonInput
from wacep.timescale.models import InputCombination, ActivityState


class YearInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(YearInput, YearInputAdmin)


class GraphingModeInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(GraphingModeInput, GraphingModeInputAdmin)


class SeasonInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(SeasonInput, SeasonInputAdmin)


class ActivityStateAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'image_filename', 'order_rank')
admin.site.register(ActivityState, ActivityStateAdmin)


class InputCombinationAdmin(admin.ModelAdmin):
    list_display = ('season_input', 'graphing_mode_input', 'year_input',
                    '__unicode__',)
admin.site.register(InputCombination, InputCombinationAdmin)
