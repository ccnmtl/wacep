# Create your views here.
from annoying.decorators import render_to
from django.contrib.auth.models import User
from django.http import HttpResponse
from pagetree.models import Section
from quizblock.models import Answer, Question, Submission, Quiz, Response
from django.shortcuts import render, render_to_response
from quizblock.models import Question



def user_responses(user):
    result = {}
    for s in user.submission_set.order_by('submitted'):
        for r in s.response_set.all():
            result[r.question.id] = r.value
    return result


def get_row(user, all_questions):
    responses = user_responses(user)
    user_questions = []
    question_ids = responses.keys()
    for q in all_questions:
        # print type(q)
        # print "individual question q " + str(q)
        if q.id in question_ids:  # this is using keys grabbed above
            # print type(q.id) # int
            # print q.id # value of int
            # print type(question_ids) type list
            user_questions.append(responses[q.id])
        else:
            user_questions.append(None)
    # print type(user) # this is user object
    # print type(user_questions) # this is list...
    # individual objects of lists are quizblock questions...
    return {
        'user': user,
        'user_questions': user_questions
    }


def get_table():
    all_questions = Question.objects.all()
    all_users = User.objects.all()
    the_table = []

    for u in all_users:
        the_table.append(get_row(u, all_questions))
    return the_table



@render_to('analytics/analytics_table.html')
def quiz_table(request, quiz_id):
    the_table = []
    quiz = Quiz.objects.get(pk=quiz_id)
    quiz_questions = Question.objects.filter(quiz=quiz)
    for each in quiz_questions:
        responses = Response.objects.filter(question=each)
        for response in responses:
            first_name = response.submission.user.first_name
            last_name = response.submission.user.last_name
            email = response.submission.user.email
            response = response.value
            question = each.text
            print question
            quiz = quiz
            print quiz
            row ={ "first_name" : first_name, "last_name" : last_name, "email" : email, "response" : response, "question" : question, "quiz" : quiz}
            the_table.append(row)
    return {'the_table': the_table}


@render_to('analytics/analytics_table.html')
def website_table(request):
    return {'the_table': get_table()}


@render_to('analytics/analytics_table.html')
def analytics_table(request):
    """keep the code in here to a minimum"""
    return {
        'the_table': generate_the_table()
    }


def table_to_csv(request, table):
    response = HttpResponse(mimetype='text/csv')
    response['Content-Disposition'] = 'attachment; filename=wacep.csv'
    writer = csv.writer(response)
    for row in table:
        writer.get_row(row)
    return response


def csv(request):
    return table_to_csv(request, get_table())

