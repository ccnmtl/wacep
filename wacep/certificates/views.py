from annoying.decorators import render_to
from django.http import HttpResponseRedirect, HttpResponse, Http404
from pagetree.helpers import get_section_from_path
from pagetree.helpers import get_module, needs_submit, submitted
from django.contrib.auth.decorators import login_required
from django.template import RequestContext, loader
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth.models import User
from  wacep.certificates.models import Certificate, CertificateCourse
from datetime import datetime
from django.utils.timezone import utc

@login_required
@render_to('certificates/certificates_admin.html')
def certificates_admin(request):
    """ Where the staff go to award certificates to students. """
    the_students = User.objects.filter (is_staff = False)
    the_courses = CertificateCourse.objects.all()
    for c in the_courses:
        c.cached_graduate_user_ids = c.graduate_user_ids()
    return {'the_students' : the_students, 'the_courses': the_courses}

@login_required
@render_to('certificates/certificates_admin.html')
def update_certificates_admin(request):
    """ Where the staff go to award certificates to students. """
    courses_by_id = dict((c.id, c) for c in CertificateCourse.objects.all())
    certificates_to_keep = []
    for key in request.POST.keys():
        user_id_str, course_id_str = key.split(':')
        the_course = courses_by_id [int(course_id_str)]
        the_user   = User.objects.get(pk=int(user_id_str))
        the_certificate, new_graduate = Certificate.objects.get_or_create(user=the_user, course=the_course)
        if new_graduate:
            the_certificate.date = datetime.utcnow().replace(tzinfo=utc)
            the_certificate.save() # mazel tov!
        certificates_to_keep.append (the_certificate.id)
    for deleted_cert in Certificate.objects.exclude(id__in=certificates_to_keep):
        deleted_cert.delete()
    return HttpResponseRedirect('/_certificates/certificates_admin/')


@login_required
@render_to('certificates/roster.html')
def roster(request):
    """ Where the staff go to award certificates to students. """
    the_students = User.objects.filter (is_staff = False)
    the_courses = CertificateCourse.objects.all()
    for c in the_courses:
        c.cached_student_user_ids = c.student_user_ids()
    return {'the_students' : the_students, 'the_courses': the_courses}

@login_required
@render_to('certificates/roster.html')
def update_roster(request):
    """ Where the staff go to award certificates to students. """
    courses_by_id = dict((c.id, c) for c in CertificateCourse.objects.all())
    accesses_to_keep = []
    for key in request.POST.keys():
        user_id_str, course_id_str = key.split(':')
        the_course = courses_by_id [int(course_id_str)]
        the_user   = User.objects.get(pk=int(user_id_str))
        the_access, new_student = CourseAccess.objects.get_or_create(user=the_user, course=the_course)
        if new_student:
            the_access.date = datetime.utcnow().replace(tzinfo=utc)
            the_access.save() # mazel tov!
        accesses_to_keep.append (the_certificate.id)
    for deleted_accesses in CourseAccess.objects.exclude(id__in=accesses_to_keep):
        deleted_accesses.delete()
    return HttpResponseRedirect('/_certificates/roster/')

@login_required
@render_to('certificates/student_certificates.html')
def student_certificates(request):
    """ A list of all the certificates earned by a student."""
    the_courses = CertificateCourse.objects.all()
    print request.user.certificates_earned.all()
    return { 'the_courses': the_courses}

@login_required
@render_to('certificates/certificate.html')
def certificate(request, certificate_id):
    """ Show a nice certificate for the student."""
    return { 'certificate':Certificate.objects.get(pk=certificate_id)}
