from django.http import HttpResponse


class ReportFileGenerator(object):
    """
    Class for generating report files in various formats.

    From:
    https://github.com/ccnmtl/dmt/blob/master/dmt/report/utils.py
    """

    def _gen_csv(self):
        """
        Generates the report as a CSV. Returns an HttpResponse.
        """
        import unicodecsv

        filename = self.filename + '.csv'
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = \
            "attachment; filename=\"%s\"" % (filename)

        writer = unicodecsv.writer(response, encoding='utf-8')
        writer.writerow(self.column_names)
        writer.writerows(self.rows)

        return response

    def generate(self, column_names, rows, filename):
        """
        Make a report.

        Arguments:
          column_names (list)
            Column names to use for the table header.

          rows (2d list)
            Rows of data.

          filename (string)
            The filename to use, without the extension.
        """
        self.column_names = column_names
        self.rows = rows
        self.filename = filename

        return self._gen_csv()


class Utils(object):
    @staticmethod
    def is_admin(user):
        """
        Is the given user an "Admin"? (i.e., are they able to access the
        Weather Roulette admin interface?)
        """
        return user.groups.filter(name='WeatherRoulette Admins').exists()
