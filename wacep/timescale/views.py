import json
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from wacep.timescale.models import YearInput, GraphingModeInput
from wacep.timescale.models import SeasonInput, InputCombination, ActivityState


@login_required
def settings(request):
    the_settings = {
        'year_inputs': [y.to_json() for y in YearInput.objects.all()],
        'graphing_mode_inputs': [g.to_json()
                                 for g in GraphingModeInput.objects.all()],
        'season_inputs': [s.to_json() for s in SeasonInput.objects.all()],
        'input_combinations': [i.to_json()
                               for i in InputCombination.objects.all()],
        'activity_states': [a.to_json() for a in ActivityState.objects.all()]
    }

    return HttpResponse(
        json.dumps(the_settings, indent=2),
        content_type="application/json")
