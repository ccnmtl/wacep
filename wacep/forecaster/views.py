from django.http import HttpResponse
from django.views.generic.base import View
from wacep.forecaster.linear_regression import linregress
import json


class JSONResponseMixin(object):
    """
    A mixin that can be used to render a JSON response.
    """
    def render_to_json_response(self, context, **response_kwargs):
        """
        Returns a JSON response, transforming 'context' to make the payload.
        """
        return HttpResponse(
            self.convert_context_to_json(context),
            content_type='application/json',
            **response_kwargs
        )

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        # Note: This is *EXTREMELY* naive; in reality, you'll need
        # to do much more complex handling to ensure that arbitrary
        # objects -- such as Django model instances or querysets
        # -- can be serialized as JSON.
        return json.dumps(context)


class LinearRegressionView(JSONResponseMixin, View):

    def post(self, request):
        predictor = [float(i) for i in request.POST.getlist('predictor[]')]
        predictand = [int(i) for i in request.POST.getlist('predictand[]')]

        slope, intercept, r_value, std_err = linregress(predictor, predictand)
        r_squared = r_value ** 2

        context = {
            'slope': slope,
            'intercept': intercept,
            'std_err': std_err,
            'r_value': r_value,
            'r_squared': r_squared
        }
        return self.render_to_json_response(context)
