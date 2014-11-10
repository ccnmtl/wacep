from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import user_passes_test

from .utils import Utils


class AdminRequiredMixin(object):
    @method_decorator(user_passes_test(Utils.is_admin))
    def dispatch(self, *args, **kwargs):
        return super(AdminRequiredMixin, self).dispatch(*args, **kwargs)
