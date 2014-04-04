from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.generic.base import View
from wacep.forecaster.linear_regression import linregress
from wacep.forecaster.models import HurricaneYear
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
        hurricanes = HurricaneYear.objects.all()

        predictor = [float(i) for i in request.POST.getlist('predictor[]')]
        predictand = [int(i) for i in request.POST.getlist('predictand[]')]

        # predictor = Nino 3.4 ASO
        # predictand = named storms || hurricanes
        #predictor1 = []  # x
        #predictand1 = []  # y
        #for i in range(0, 48):
        #    predictor1.append(hurricanes[i].nino_sst_anomalies)
        #    predictand1.append(hurricanes[i].hurricanes)

        slope, intercept, r_value, std_err = linregress(predictor, predictand)

        context = {
            'slope': slope,
            'intercept': intercept,
            'r_value': r_value,
            'std_err': std_err,
            'r_squared': r_value ** 2
        }
        return self.render_to_json_response(context)
