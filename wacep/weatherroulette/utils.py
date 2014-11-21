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

        if (self.formatted_data is not None):
            response.content = self.formatted_data
        else:
            writer = unicodecsv.writer(response, encoding='utf-8')
            writer.writerow(self.column_names)
            writer.writerows(self.rows)

        return response

    def _gen_json(self):
        """
        Generates the report as JSON. Returns an HttpResponse.
        """
        import json

        filename = self.filename + '.json'
        response = HttpResponse(content_type='application/json')
        response['Content-Disposition'] = \
            "attachment; filename=\"%s\"" % (filename)

        if (self.formatted_data is not None):
            try:
                # Attempt to pretty-print the json, by decoding it and
                # re-encoding it.
                my_json = json.dumps(json.loads(self.formatted_data), indent=4)
            except:
                my_json = self.formatted_data

            response.content = my_json
        else:
            response.content = 'NOT IMPLEMENTED'

        return response

    def generate(
        self,
        filename='export',
        column_names=[],
        rows=[],
        formatted_data=None,
        fileformat='csv'
    ):
        """
        Make a report.

        Arguments:
          column_names (list)
            Column names to use for the table header.

          rows (2d list)
            Rows of data.

          formatted_data (string)
            If this param is present, then this is used as the data instead of
            generating it from 'column_names' and 'rows'.

          filename (string)
            The filename to use, without the extension.
        """

        self.column_names = column_names
        self.rows = rows
        self.filename = filename
        self.formatted_data = formatted_data

        if fileformat == 'json':
            return self._gen_json()

        return self._gen_csv()


class Utils(object):
    @staticmethod
    def is_admin(user):
        """
        Is the given user an "Admin"? (i.e., are they able to access the
        Weather Roulette admin interface?)
        """
        return user.groups.filter(name='WeatherRoulette Admins').exists()
