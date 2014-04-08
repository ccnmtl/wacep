from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand
from optparse import make_option
from wacep.forecaster.models import HurricaneYear
import csv
import re


class Command(BaseCommand):

    option_list = BaseCommand.option_list + (
        make_option('--csv', dest='csv_file',
                    help='CSV file containing forecast data'),
        make_option('--delete', action='store_true', dest='delete',
                    default=False, help='Overwrite existing data'),
    )

    def handle(self, *app_labels, **options):
        args = "Usage: ./manage.py import_forecast_data --csv forecast data"

        if not options.get('csv_file'):
            print args
            return

        csv_file = options.get('csv_file')

        if options.get('delete', False):
            HurricaneYear.objects.all().delete()

        reader = csv.reader(open(csv_file))

        # Matches any 4-digit number:
        year_re = re.compile('^\d{4}$')

        for row in reader:
            year = int(row[0])
            # If year does not match our regex:
            if not year_re.match(str(year)) or year < 1500 or year > 3000:
                raise ValidationError(u'%s is not a valid year.' % year)

            HurricaneYear.objects.create(year=year,
                                         named_storms=row[1],
                                         hurricanes=row[2],
                                         nino_sst_anomalies=row[3])
