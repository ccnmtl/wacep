from django.contrib import admin
from  wacep.figure_viewer.models import ClimateVariableInput, ModeOfVariabilityInput, SeasonInput, AnimationInput, InputCombination, ActivityState, YearInput, GraphingModeInput, SeasonInput


class SeasonInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'order_rank')
admin.site.register(SeasonInput, SeasonInputAdmin)

class ClimateVariableInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'order_rank')
admin.site.register(ClimateVariableInput, ClimateVariableInputAdmin)

class AnimationInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'order_rank')
admin.site.register(AnimationInput, AnimationInputAdmin)

class ModeOfVariabilityInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(ModeOfVariabilityInput, ModeOfVariabilityInputAdmin)

class YearInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(YearInput, YearInputAdmin)

class GraphingModeInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(GraphingModeInput, GraphingModeInputAdmin)

###
class InputCombinationAdmin(admin.ModelAdmin):
    list_display = ('topic', 'season_input', 'climate_variable_input',
        'animation_input', 'mode_of_variability_input',
        'year_input', 'graphing_mode_input',  '__unicode__')

    #exclude = ('topic', 'season_input', 'climate_variable_input', 'year_input')
    fields = ('mode_of_variability_input','graphing_mode_input', 'year_input', 'animation_input','activity_state')
admin.site.register(InputCombination, InputCombinationAdmin)

class ActivityStateAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'image_filename', 'order_rank')
admin.site.register(ActivityState, ActivityStateAdmin)

