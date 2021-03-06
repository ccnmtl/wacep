import os, sys, site

# enable the virtualenv
site.addsitedir('/var/www/wacep/wacep/ve/lib/python2.7/site-packages')

# paths we might need to pick up the project's settings
sys.path.append('/var/www/wacep/wacep/')

os.environ['DJANGO_SETTINGS_MODULE'] = 'wacep.settings_dev'

import django
django.setup()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
