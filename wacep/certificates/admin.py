from django.contrib import admin
from  wacep.certificates.models import Certificate, CertificateCourse, CourseAccess
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class CertificateAdmin(admin.ModelAdmin):
    list_display = ('user', 'course','date')
admin.site.register(Certificate, CertificateAdmin)

class CourseAccessAdmin(admin.ModelAdmin):
    list_display = ('user', 'course','date')
admin.site.register(CourseAccess, CourseAccessAdmin)


class CertificateCourseAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(CertificateCourse, CertificateCourseAdmin)

def duct_tape_certificate_function(course, user_obj, function_name):
    def certificate_function(user):
        if user.is_staff:
            return ''
        if course in [ cert.course for cert in user.certificates_earned.all()]:
            alt_text = '%s graduated from this class.' % user.__unicode__()
            return '<img src="/media/admin/img/icon-yes.gif" alt="%s" title="%s">' % (alt_text, alt_text)
        else:
            alt_text = '%s did not graduate from this class.' % user.__unicode__()
            return '<img src="/media/admin/img/icon-no.gif"  alt="%s"  title="%s">' % (alt_text, alt_text)

    certificate_function.__name__ = function_name
    certificate_function.allow_tags = True
    setattr(user_obj, function_name, certificate_function)

function_names = []
for course in CertificateCourse.objects.all():
    function_name =  'Course_#_%s' % course.id
    duct_tape_certificate_function(course, User, function_name)
    function_names.append (function_name)
    
UserAdmin.list_display += tuple(function_names)
