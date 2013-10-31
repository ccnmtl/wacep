from django.contrib import admin
from  wacep.figure_viewer.models import ClimateVariableInput, SeasonInput, AnimationInput, InputCombination, ActivityState

class SeasonInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'order_rank')
admin.site.register(SeasonInput, SeasonInputAdmin)

class ClimateVariableInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'order_rank')
admin.site.register(ClimateVariableInput, ClimateVariableInputAdmin)

class AnimationInputAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'order_rank')
admin.site.register(AnimationInput, AnimationInputAdmin)

class InputCombinationAdmin(admin.ModelAdmin):
    list_display = ('season_input', 'climate_variable_input', 'animation_input', '__unicode__',)
admin.site.register(InputCombination, InputCombinationAdmin)

class ActivityStateAdmin(admin.ModelAdmin):
    list_display = ('__unicode__', 'image_filename', 'order_rank')
admin.site.register(ActivityState, ActivityStateAdmin)

