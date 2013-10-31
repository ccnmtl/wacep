from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseForbidden
from wacep.figure_viewer.models import AnimationInput, ClimateVariableInput, SeasonInput, InputCombination, ActivityState, FigureViewerTopic
from django.utils import simplejson


@login_required
def settings(request):
    #if not request.is_ajax() or request.method != "POST":
    #    return HttpResponseForbidden()

    the_settings = {
        'year_inputs':            [y.to_json() for y in AnimationInput          .objects.all()],
        'graphing_mode_inputs':   [g.to_json() for g in ClimateVariableInput  .objects.all()],
        'season_inputs':          [s.to_json() for s in SeasonInput        .objects.all()],
        'input_combinations':     [i.to_json() for i in InputCombination   .objects.all()],
        'topics':                 [t.to_json() for t in FigureViewerTopic  .objects.all()],
        'activity_states':        [a.to_json() for a in ActivityState      .objects.all()]
    }

    return HttpResponse(simplejson.dumps(the_settings, indent=2),  mimetype="application/json")

