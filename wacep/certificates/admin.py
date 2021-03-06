from django.contrib import admin
from wacep.certificates.models import Certificate, CertificateCourse
from wacep.certificates.models import CourseAccess


class CertificateAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'date')
admin.site.register(Certificate, CertificateAdmin)


class CourseAccessAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'date')
admin.site.register(CourseAccess, CourseAccessAdmin)


class CertificateCourseAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
                    'order_rank')
admin.site.register(CertificateCourse, CertificateCourseAdmin)


def duct_tape_certificate_function(course, user_obj, function_name):
    def certificate_function(user):
        if user.is_staff:
            return ''
        if course not in [ca.course for ca in user.courses_i_take.all()]:
            return ''
        if course in [cert.course for cert in user.certificates_earned.all()]:
            alt_text = '%s graduated from this class.' % user.__unicode__()
            css_class = 'color:green'
            return (
                '<span  alt="%s" title="%s" style="%s" >Graduated</span>' % (
                    alt_text, alt_text, css_class))
        alt_text = '%s is enrolled in this class.' % user.__unicode__()
        css_class = 'color:blue'
        return '<span  alt="%s" title="%s" style="%s" >Enrolled</span>' % (
            alt_text, alt_text, css_class)

    certificate_function.__name__ = function_name
    certificate_function.allow_tags = True
    setattr(user_obj, function_name, certificate_function)
