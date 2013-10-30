from annoying.decorators import render_to
from django.http import HttpResponseRedirect, Http404, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from wacep.certificates.models import Certificate, CertificateCourse
from wacep.certificates.models import CourseAccess
from datetime import datetime
from django.utils.timezone import utc
from django.db.models import Max

@staff_member_required
@render_to('certificates/certificates_admin.html')
def certificates_admin(request):
    """ Where the staff go to award certificates to students. """
    all_students = User.objects.filter(is_staff=False)
    the_students = [student for student
                    in all_students
                    if len(student.courses_i_take.all()) > 0]
    the_courses = CertificateCourse.objects.all()
    for c in the_courses:
        c.cached_student_user_ids = c.student_user_ids()
        c.cached_graduate_user_ids = c.graduate_user_ids()

    return {'the_students': the_students, 'the_courses': the_courses}


@staff_member_required
@render_to('certificates/certificates_admin.html')
def update_certificates_admin(request):
    courses_by_id = dict((c.id, c) for c in CertificateCourse.objects.all())
    certificates_to_keep = []
    for key in request.POST.keys():
        user_id_str, course_id_str = key.split(':')
        the_course = courses_by_id[int(course_id_str)]
        the_user = User.objects.get(pk=int(user_id_str))
        the_certificate, new_graduate = Certificate.objects.get_or_create(
            user=the_user, course=the_course)
        if new_graduate:
            the_certificate.date = datetime.utcnow().replace(tzinfo=utc)
            the_certificate.save()  # mazel tov!
        certificates_to_keep.append(the_certificate.id)
    for deleted_cert in Certificate.objects.exclude(
            id__in=certificates_to_keep):
        deleted_cert.delete()
    return HttpResponseRedirect('/_certificates/certificates_admin/')


@staff_member_required
@render_to('certificates/roster.html')
def roster(request):
    """ Where the staff go to grant course access to students. """
    the_students = User.objects.filter(is_staff=False)
    the_courses = CertificateCourse.objects.all()
    for c in the_courses:
        c.cached_student_user_ids = c.student_user_ids()
        c.cached_graduate_user_ids = c.graduate_user_ids()
    return {'the_students': the_students, 'the_courses': the_courses}


@staff_member_required
@render_to('certificates/roster.html')
def update_roster(request):
    """ update the roster of each course. """
    courses_by_id = dict((c.id, c) for c in CertificateCourse.objects.all())
    accesses_to_keep = []

    for key in request.POST.keys():
        user_id_str, course_id_str = key.split(':')
        the_course = courses_by_id[int(course_id_str)]
        the_user = User.objects.get(pk=int(user_id_str))
        the_access, new_student = CourseAccess.objects.get_or_create(
            user=the_user, course=the_course)
        if new_student:
            the_access.date = datetime.utcnow().replace(tzinfo=utc)
            the_access.save()  # mazel tov!
        accesses_to_keep.append(the_access.id)

    for deleted_accesses in CourseAccess.objects.exclude(
            id__in=accesses_to_keep):
        deleted_accesses.delete()
    return HttpResponseRedirect('/_certificates/roster/')


@login_required
@render_to('certificates/student_certificates.html')
def student_certificates(request):
    """ A list of all the certificates earned by a student."""
    #need to get the courses that the student is enfolled in
    user = request.user
    user_certs = Certificate.objects.filter(user=user)
    graduated = False
    if user_certs.count() == CertificateCourse.objects.all().count():
        graduated = True
    return {'the_courses': user_certs, 'graduated' : graduated}


def show_graduation(request, user_id):
    '''Double checks that the user with the appropriate id did
    graduate, link is public to those they wish to share.'''
    total_courses = CertificateCourse.objects.all().count()
    user = User.objects.get(pk=user_id)
    user_certs = Certificate.objects.filter(user=user).count()
    if total_courses == user_certs:
        date = get_oldest(user_certs, user)
        return HttpResponse("User Graduated")
    else:
        raise Http404

def get_oldest(set_of_certs, user):
    '''Returns oldest of the certificate objects.'''
    user_ = user
    hold_date = Certificate.objects.filter(user=user_)
    return hold_date.aggregate(Max('date'))



#this is not authenticated: the certificates themselves are public.
@render_to('certificates/certificate.html')
def certificate(request, certificate_id):
    """ Show a nice certificate two whomever wants."""
    try:
        return {'certificate': Certificate.objects.get(pk=certificate_id)}
    except Certificate.DoesNotExist:
        raise Http404
