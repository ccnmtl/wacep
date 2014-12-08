from django.contrib.auth.models import User
from django.http import HttpResponse

from wacep.weatherroulette.models import Move, PuzzleRound


class Utils(object):
    @staticmethod
    def is_admin(user):
        """
        Is the given user an "Admin"? (i.e., are they able to access the
        Weather Roulette admin interface?)
        """
        return user.groups.filter(name='WeatherRoulette Admins').exists()

    # Here's some static methods that have to do with the game's state.
    @staticmethod
    def active_participants():
        """
        Get a list of all the participants who are playing, or have played,
        any puzzles.
        """
        return [x for x in User.objects.all()
                if Move.objects.filter(game_state__user=x).exists()]

    @staticmethod
    def moves_for_participant(participant, puzzle):
        """
        Find all the moves for the given participant, in the given puzzle.
        """
        return Move.objects.filter(
            game_state__user=participant,
            puzzle_round__puzzle=puzzle)

    @staticmethod
    def participant_moves(puzzles, participants):
        """
        Given a list of puzzles and a list of participants, generate a list
        that contains useful Move data relating to how those participants
        performed in the given puzzles.
        """
        participant_moves = []

        for puzzle in puzzles:
            for participant in puzzle.active_participants(participants):
                moves = Utils.moves_for_participant(
                    participant, puzzle)

                el = {
                    'puzzle_id': puzzle.id,
                    'puzzle_name': puzzle.display_name,
                    'participant_id': participant.id,
                    'participant_name': participant.username,
                    'moves': [{
                        'year': move.puzzle_round.year,
                        'above_forecast': move.puzzle_round.above_forecast,
                        'normal_forecast': move.puzzle_round.normal_forecast,
                        'below_forecast': move.puzzle_round.below_forecast,
                        'umbrellas': move.umbrellas,
                        'shirts': move.shirts,
                        'hats': move.hats,
                        'rainfall_observation':
                        move.puzzle_round.rainfall_observation,
                        'ending_inventory': move.ending_inventory
                    } for move in moves]
                }
                participant_moves.append(el)

        return participant_moves

    @staticmethod
    def participant_moves_for_csv(puzzles, participants):
        """
        Gets participant_moves in a format that can be in a put in a CSV.

        Returns a 2d list.
        """
        participant_moves = Utils.participant_moves(puzzles, participants)
        output = []

        for puzzle in puzzles:
            puzzle_data = []
            puzzle_data.append(
                [puzzle.display_name] +
                [pr.year
                 for pr in PuzzleRound.objects.filter(puzzle=puzzle)]
            )
            my_participants = [p for p in participant_moves
                               if p['puzzle_id'] == puzzle.id]
            for participant in my_participants:
                puzzle_data.append(
                    [participant['participant_name']] +
                    [m['ending_inventory'] for m in participant['moves']]
                )

            puzzle_data.append([])
            output = output + puzzle_data

        return output


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
