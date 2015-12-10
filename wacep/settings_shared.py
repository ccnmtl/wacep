# Django settings for wacep project.
import os.path
from ccnmtlsettings.shared import common

project = 'wacep'
base = os.path.dirname(__file__)

locals().update(common(project=project, base=base))

PROJECT_APPS = [
    'wacep.certificates',
    'wacep.main',
    'wacep.figure_viewer',
    'wacep.timescale',
    'wacep.weather_dj',
    'wacep.weatherroulette',
]

USE_TZ = True

INSTALLED_APPS += [  # noqa
    'sorl.thumbnail',
    'typogrify',
    'bootstrapform',
    'django_extensions',
    'rest_framework',
    'wacep.main',
    'pagetree',
    'pageblocks',
    'quizblock',
    'wacep.timescale',
    'wacep.figure_viewer',
    'wacep.weather_dj',
    'wacep.certificates',
    'wacep.forecaster',
    'wacep.weatherroulette',
    'bootstrap3',
]

PAGEBLOCKS = [
    'pageblocks.TextBlock',
    'pageblocks.HTMLBlock',
    'pageblocks.PullQuoteBlock',
    'pageblocks.ImageBlock',
    'pageblocks.ImagePullQuoteBlock',
    'quizblock.Quiz',
    'timescale.TimescaleBlock',
    'figure_viewer.FigureViewerBlock',
]

THUMBNAIL_SUBDIR = "thumbs"

COMPRESS_PRECOMPILERS = (
    ('text/less', 'lessc {infile} {outfile}'),
)

LOGIN_REDIRECT_URL = "/"

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),

    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',),
    'DEFAULT_RENDERER_CLASSES': (
        'wacep.weatherroulette.renderers.EmberJSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'PAGINATE_BY': 10,
    'PAGINATE_BY_PARAM': 'page_size',
    'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}
