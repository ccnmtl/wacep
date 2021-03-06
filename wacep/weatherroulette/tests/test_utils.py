from django.test import TestCase

from wacep.weatherroulette.utils import Utils
from wacep.weatherroulette.tests.factories import (
    GameStateFactory, MoveFactory, PuzzleFactory, PuzzleRoundFactory,
    UserFactory
)


class TestUtils(TestCase):
    def setUp(self):
        self.u = UserFactory(username='test_user')
        self.gs = GameStateFactory(user=self.u)

    def test_active_participants_empty(self):
        self.assertEqual(Utils.active_participants(), [])

    def test_participant_moves_empty(self):
        self.assertEqual(Utils.participant_moves([], []), [])

    def test_participant_moves_for_csv_empty(self):
        self.assertEqual(Utils.participant_moves_for_csv([], []), [])

    def test_participant_moves_for_csv(self):
        puzzle_a = PuzzleFactory(display_name='puzzle a')
        puzzleround_a_first = PuzzleRoundFactory(puzzle=puzzle_a, year='1998')
        PuzzleRoundFactory(puzzle=puzzle_a, year='1999')
        PuzzleRoundFactory(puzzle=puzzle_a, year='2000')

        puzzle_b = PuzzleFactory(display_name='puzzle b')

        puzzle_c = PuzzleFactory(display_name='puzzle c')

        puzzles = [puzzle_a, puzzle_b, puzzle_c]

        self.assertEqual(
            Utils.participant_moves_for_csv(puzzles, [self.u]),
            [['puzzle a', None, 1998, 1999, 2000],
             ['Forecast', 'Above', 60, 60, 60],
             [None, 'Normal', 20, 20, 20],
             [None, 'Below', 20, 20, 20],
             ['Observation', None, u'Wet', u'Wet', u'Wet'],
             [],
             ['puzzle b', None],
             ['Forecast', 'Above'],
             [None, 'Normal'],
             [None, 'Below'],
             ['Observation', None],
             [],
             ['puzzle c', None],
             ['Forecast', 'Above'],
             [None, 'Normal'],
             [None, 'Below'],
             ['Observation', None],
             []]
        )

        # Now add some moves
        MoveFactory(
            game_state=self.gs, puzzle_round=puzzleround_a_first, hats=100)

        self.assertEqual(
            Utils.participant_moves_for_csv(puzzles, [self.u]),
            [['puzzle a', None, 1998, 1999, 2000],
             ['Forecast', 'Above', 60, 60, 60],
             [None, 'Normal', 20, 20, 20],
             [None, 'Below', 20, 20, 20],
             ['Observation', None, u'Wet', u'Wet', u'Wet'],
             ['Player: test_user'],
             ['Investment', 'Above', 10],
             [None, 'Normal', 10],
             [None, 'Below', 100],
             ['Money at end of round', None, 210],
             [],
             ['puzzle b', None],
             ['Forecast', 'Above'],
             [None, 'Normal'],
             [None, 'Below'],
             ['Observation', None],
             [],
             ['puzzle c', None],
             ['Forecast', 'Above'],
             [None, 'Normal'],
             [None, 'Below'],
             ['Observation', None],
             []]
        )
