from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import AnimationInput, ClimateVariableInput
from .models import ModeOfVariabilityInput, SeasonInput, GraphingModeInput
from .models import YearInput, InputCombination, ActivityState
from .models import FigureViewerTopic
from django.utils import simplejson


@login_required
def settings(request, topic_slug):
    #if not request.is_ajax() or request.method != "POST":
    #    return HttpResponseForbidden()
    class_map = {
        'graphing_mode_inputs':       GraphingModeInput,
        'animation_inputs':           AnimationInput,
        'climate_variable_inputs':    ClimateVariableInput,
        'season_inputs':              SeasonInput,
        'year_inputs':                YearInput,
        'mode_of_variability_inputs': ModeOfVariabilityInput,
        'activity_states':            ActivityState,
    }

    the_settings = {}
    for label, clazz in class_map.iteritems():
        its_json = getattr(clazz, 'to_json')
        the_settings[label] = map(its_json, clazz.objects.all())

    input_combos = InputCombination.objects.filter(topic__slug=topic_slug)
    the_settings['input_combinations'] = [i.to_json() for i in input_combos]
    the_settings['topic'] = FigureViewerTopic.objects.get(
        slug=topic_slug).to_json()

    return HttpResponse(simplejson.dumps(the_settings, indent=2),
                        mimetype="application/json")
