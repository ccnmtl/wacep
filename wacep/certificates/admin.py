from django.contrib import admin
from  wacep.certificates.models import Certificate, CertificateCourse
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('user', 'course','date')
admin.site.register(Certificate, CertificateAdmin)

class CertificateCourseAdmin(admin.ModelAdmin):
    list_display = ('__unicode__',
    				'order_rank')
admin.site.register(CertificateCourse, CertificateCourseAdmin)