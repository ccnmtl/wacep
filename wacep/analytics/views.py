# Create your views here.
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from annoying.decorators import render_to
from django.contrib.auth.models import User
from django.http import HttpResponse
import csv
from pagetree.models import Section
from quizblock.models import Answer, Question, Submission, Quiz
from django.shortcuts import render, render_to_response
#from wacep.main import Question, Answer


questions = []
answers = []

def get_answers(request):
    answers = Answer.objects.all()
    return render(request, 'analytics/table_1.html', {"answers": answers})

def get_submission_quiz(request):
    submissions = Submission.objects.all()
    return render(request, 'analytics/table_2.html', {"submissions": submissions})

def get_submission_quiz_quiz(request):
    quizzes = Quiz.objects.all()
    keep = []
    for q in quizzes:
        keep.append(q.submission_set.all())

    return render(request, 'analytics/table_3.html', { "keep" : keep })#{"submissions": submissions, "quizzes" : quizzes})



def get_user_quiz_answers(request):
    submission_objects = Submission.objects.all()
    question_objects = Question.objects.all()
    answer_objects = Answer.objects.all()
    #print "Objects retrieved"

    question_submission_table = []
    question_answer_table = []
    x = 0
    y = 0
    #print "tables and counters created"

    #go over submissions, for each row, grab user and quiz, search for questions of quiz and answers
    for submission in submission_objects:
        print submission.quiz

        #hang on to submission quiz to search for it in quizzes
        submission_quiz = submission.quiz
        for q in question_objects:
            quiz_quiz = q.quiz
            if submission_quiz == quiz_quiz:
                question_submission_table[x] = zip(submission_quiz, quiz_quiz)


        #for a in answer_objects:
        #    if 



    # for answer in answer_objects:
    #     key_1 = answer_objects[answer]
    #     for sub_que in question_submission_table:
    #         key_2 = question_submission_table[sub_que]
    #         if key_1[question] == key_2[question]:
    #             question_answer_table = dict(key_1.items() + key_2.items())
    #             counter_two = counter_two + 1

    return render(request, 'analytics/table_4.html', {"question_submission_table": question_submission_table})
# def responses_for(the_user):
#     """The user's responses to quiz questions.
#     If there is more than one response
#     to a question, returns the most recent."""
#     result = {}

#     for sub in the_user.submission_set.order_by('submitted'):
#         for resp in sub.response_set.all():
#             result[resp.question.id] = resp.value #what exactly is this doing? getting the id and setting it to the value?
#             print "result[resp.question.id] " + result[resp.question.id]
#             print "resp.value " + resp.value
#     return result

# def get_results(the_user, all_questions):
#     user_questions = []
#     responses = responses_for(the_user)
#     question_ids = responses.keys()

#     for the_question in all_questions:
#         if the_question.id in question_ids:
#             user_questions.append(responses[the_question.id])
#         else:
#             user_questions.append(None)
#     return {
#         'the_user': the_user,
#         #'the_profile': the_profile,
#         'user_questions': user_questions
#     }

# def user_responses_try_one(request):
#     the_table = []
#     all_users = User.objects.all()
#     all_questions = Question.objects.all()
#     for u in all_users:
#         the_table.append(get_results(u, all_questions))
#     return the_table



# def get_question_answer(request):
#     answers = Answer.objects.all()
#     questions = []
#     for a in answers:
#         #questions = a.answer_set.all()
#         questions.append(a.answer_set.all())




#     class Submission(models.Model):
# 259     1       quiz = models.ForeignKey(Quiz)
# 260     1       user = models.ForeignKey(User)
# 261     1       submitted = models.DateTimeField(default=datetime.now)
# 262         
# 263     1       def __unicode__(self):
# 264     1           return "quiz %d submission by %s at %s" % (self.quiz.id,
# 265                                                            unicode(self.user),
# 266                                                            self.submitted)
# # def get_quizzes(request):
#     quizzes = Quizzes.objects.all()
#     questions = []
#     for quiz in quizzes:

#         #get_question(quiz)
#     return render(request, 'analytics/table_1.html', {"quizzes": quizzes})

#def get_question(q):
#    questions = q
    #get_





# @login_required
# @staff_member_required
# def analytics_csv(request):
#     return table_to_csv(request, generate_the_table())


# # @login_required
# # @staff_member_required
# # @render_to('analytics/analytics_table.html')
# # def analytics_table(request):
# #     """keep the code in here to a minimum"""
# #     return {
# #         'the_table': generate_the_table()
# #     }


# # @login_required
# # @staff_member_required
# # @render_to('analytics/analytics_table.html')
# # def analytics_table_testing(request):
# #     """keep the code in here to a minimum"""
# #     return {
# #         'the_table': generate_the_table(True)
# #     }


# def table_to_csv(request, table):
#     response = HttpResponse(mimetype='text/csv')
#     response['Content-Disposition'] = 'attachment; filename=wacep.csv'
#     writer = csv.writer(response)
#     for row in table:
#         writer.writerow(row)
#     return response


# def generate_the_table(testing=False):
#     #all_sections = [s for s in Section.objects.get(pk=1).get_tree()
#     #                if s.is_leaf_or_has_content()]
#     #all_questions = find_the_questions(all_sections)
#     questions = []
#     questions = Question.objects.all()
#     all_users = []
#     if testing:
#         all_users = User.objects.all()
#     else:
#         all_users = User.objects.filter(is_staff=False)

#     the_table = []
#     heading = generate_heading(all_sections, all_questions, testing)

#     #the_table.append([("column %d" % (a + 1)) for a in range(len(heading))])
#     the_table.append(heading)

#     for the_user in all_users:
#         the_table.append(generate_row(the_user, all_sections,
#                                       all_questions, testing))

#     return the_table

# '''We dont have sections...'''
# # def find_the_questions(sections_in_order):
# #     """ returns all the questions,
# #     in all the quizzes,
# #     in the order they are presented
# #     in the sections."""
# #     result = []
# #     all_questions = []
# #     quizzes_we_want = [25, 15]

#     #first get all the questions in pagetree order:
#     # for the_section in sections_in_order:
#     #     for the_pageblock in the_section.pageblock_set.all():
#     #         if the_pageblock.block().__class__.display_name == 'Quiz':
#     #             all_questions.extend(the_pageblock.block().question_set.all())

#     #filter out most of the questions; re-label one of them.
#     #enduring_materials_question_id = 50
# #     for the_q in all_questions:
#         #print 'question id ', the_q.id
#         #print 'quiz ', the_q.quiz
#         #print 'quiz id ', the_q.quiz.id
#         #if the_q.id == enduring_materials_question_id:
#         #    the_q.text = 'Enduring materials acknowledgement'

# #        if the_q.quiz.id in quizzes_we_want:
# #            result.append(the_q)

# #    return result


# def generate_heading(all_sections, all_questions, testing):
#     result = [
#         'hrsa id', 'encrypted email', 'joined', 'last login',
#         'enduring materials checkbox',
#     ]

#     if testing:
#         result.extend(['User ID', 'username', 'plaintext email', 'is staff'])

#     for section in all_sections:
#         result.append("%d: %s" % (section.id, section))

#     result.extend(["%d: %s%s" % (question.id, question.text[0:64],
#                                  (len(question.text) > 64 and '... ' or ''))
#                    for question in all_questions])
#     return result


# def generate_row(the_user, all_sections, all_questions, testing, cemb_pk=50):
#     line = generate_row_info(the_user, all_sections, all_questions,
#                              cemb_pk=cemb_pk)

#     the_profile = line['the_profile']

#     result = []

#     if the_profile:
#         result.extend([
#             the_profile.hrsa_id,
#             the_profile.encrypted_email
#         ])
#     else:
#         result.extend([
#             None,
#             None
#         ])

#     result.extend([
#         line['the_user'].date_joined,
#         line['the_user'].last_login,
#         line['read_intro'],
#     ])

#     if testing:
#         result.extend([
#             line['the_user'].id,
#             line['the_user'].username,
#             line['the_user'].email,
#             line['the_user'].is_staff
#         ])

#     result.extend(line['user_sections'])
#     result.extend(line['user_questions'])
#     return result


# def generate_row_info(the_user, all_sections, all_questions, cemb_pk=50):

#     responses = responses_for(the_user)
#     timestamps = timestamps_for(the_user)

#     user_sections = []
#     user_questions = []
#     section_ids = timestamps.keys()
#     question_ids = responses.keys()

#     for the_section in all_sections:
#         if the_section.id in section_ids:
#             user_sections.append(timestamps[the_section.id])
#         else:
#             user_sections.append(None)

#     for the_question in all_questions:
#         if the_question.id in question_ids:
#             user_questions.append(responses[the_question.id])
#         else:
#             user_questions.append(None)

#     the_profile = None
#     try:
#         the_profile = the_user.get_profile()
#     except UserProfile.DoesNotExist:
#         pass

#     return {
#         'the_user': the_user,
#         'the_profile': the_profile,
#         'user_questions': user_questions,
#         'user_sections': user_sections,
#         'read_intro': checked_enduring_materials_box(the_user, cemb_pk)
#     }


# #hard-coding the section pk is still a terrible idea
# #but at least now it's injectable for testing
# def checked_enduring_materials_box(the_user, section_pk=50):
#     enduring_materials_section = Section.objects.get(pk=section_pk)
#     return SectionQuizAnsweredCorrectly.objects.filter(
#         user=the_user, section=enduring_materials_section).exists()


# def timestamps_for(the_user):
#     the_timestamps = the_user.sectiontimestamp_set.all()
#     result = dict([(t.section.id, t.timestamp) for t in the_timestamps])
#     return result


# def responses_for(the_user):
#     """The user's responses to quiz questions.
#     If there is more than one response
#     to a question, returns the most recent."""
#     result = {}

#     for sub in the_user.submission_set.order_by('submitted'):
#         for resp in sub.response_set.all():
#             result[resp.question.id] = resp.value
#     return result
