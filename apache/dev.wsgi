import os, sys, site

# enable the virtualenv
site.addsitedir('/var/www/wacep/wacep/ve/lib/python2.7/site-packages')

# paths we might need to pick up the project's settings
sys.path.append('/var/www/wacep/wacep/')

os.environ['DJANGO_SETTINGS_MODULE'] = 'wacep.settings_dev'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
