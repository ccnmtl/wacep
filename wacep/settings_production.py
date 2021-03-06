# flake8: noqa
from settings_shared import *
from ccnmtlsettings.production import common

locals().update(
    common(
        project=project,
        base=base,
        STATIC_ROOT=STATIC_ROOT,
        INSTALLED_APPS=INSTALLED_APPS,
    ))

ALLOWED_HOSTS = ['waceponline.org', 'www.waceponline.org']

try:
    from local_settings import *
except ImportError:
    pass
