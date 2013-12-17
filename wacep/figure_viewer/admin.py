from django.contrib import admin
from .models import ClimateVariableInput, ModeOfVariabilityInput
from .models import SeasonInput, AnimationInput, InputCombination
from .models import ActivityState, YearInput, GraphingModeInput


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
    list_display = ('id', 'topic', 'season_input', 'climate_variable_input',
                    'animation_input', 'mode_of_variability_input',
                    'year_input', 'graphing_mode_input', '__unicode__')

    fields = ('mode_of_variability_input', 'graphing_mode_input',
              'animation_input', 'activity_state', 'topic')
admin.site.register(InputCombination, InputCombinationAdmin)


class ActivityStateAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'image_filename', 'order_rank')
admin.site.register(ActivityState, ActivityStateAdmin)
