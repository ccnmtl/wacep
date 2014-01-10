from django import template
from quizblock.models import Response, Submission

register = template.Library()


class GetMultipleChoiceQuestionResponseNode(template.Node):
    def __init__(self, question, var_name):
        self.question = question
        self.var_name = var_name

    def render(self, context):
        q = context[self.question]
        u = context['request'].user
        quiz = q.quiz
        submissions = Submission.objects.filter(quiz=quiz,
                                                user=u).order_by("-submitted")
        if submissions.count() == 0:
            return ''
        submission = submissions[0]
        responses = Response.objects.filter(question=q,
                                            submission=submission)
        indices = []
        for answer_idx, answer in enumerate(q.answer_set.all()):
            for response in responses:
                if answer.value == response.value:
                    indices.append("#" + str(answer_idx + 1))
        if responses.count() > 0:
            context[self.var_name] = ', '.join(indices)
        else:
            context[self.var_name] = None
        return ''


@register.tag('getmultiplechoiceresponse')
def getmultiplechoiceresponse(parser, token):
    question = token.split_contents()[1:][0]
    var_name = token.split_contents()[1:][2]
    return GetMultipleChoiceQuestionResponseNode(question, var_name)
