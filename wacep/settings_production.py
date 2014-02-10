# flake8: noqa
from settings_shared import *

TEMPLATE_DIRS = (
    "/var/www/wacep/wacep/wacep/templates",
)

MEDIA_ROOT = '/var/www/wacep/uploads/'
# put any static media here to override app served static media
STATICMEDIA_MOUNTS = (
    ('/sitemedia', '/var/www/wacep/wacep/sitemedia'),
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'wacep',
        'HOST': '',
        'PORT': 6432, #see /etc/pgbouncer/pgbouncer.ini
        'USER': '',
        'PASSWORD': '',
    }
}

COMPRESS_ROOT = "/var/www/wacep/wacep/media/"
DEBUG = False
TEMPLATE_DEBUG = DEBUG

ALLOWED_HOSTS = ['waceponline.org', 'www.waceponline.org']
SHOW_SPLASH = True

if 'migrate' not in sys.argv:
    INSTALLED_APPS.append('raven.contrib.django.raven_compat')

try:
    from local_settings import *
except ImportError:
    pass
