from django.contrib import admin
from  wacep.timescale.models import YearInput, GraphingModeInput, SeasonInput, InputCombination, ActivityState

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
    list_display = ('__unicode__',
    				'order_rank')
admin.site.register(ActivityState, ActivityStateAdmin)

class InputCombinationAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',)
admin.site.register(InputCombination, InputCombinationAdmin)


