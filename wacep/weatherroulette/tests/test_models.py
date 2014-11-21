from django.test import TestCase
from .factories import (
    GameStateFactory, MoveFactory, PuzzleFactory, PuzzleRoundFactory,
    UserFactory
)


class TestGameState(TestCase):
    def setUp(self):
        self.u = UserFactory(username='test_user')
        self.gs = GameStateFactory(user=self.u)

    def test_is_valid_from_factory(self):
        u = UserFactory()
        GameStateFactory(user=u)

    def test_active_participants_empty(self):
        self.assertEqual(self.gs.active_participants(), [])

    def test_participant_moves_empty(self):
        self.assertEqual(self.gs.participant_moves([], []), [])

    def test_participant_moves_for_csv_empty(self):
        self.assertEqual(self.gs.participant_moves_for_csv([], []), [])

    def test_participant_moves_for_csv(self):
        puzzle_a = PuzzleFactory(display_name='puzzle a')
        puzzleround_a_first = PuzzleRoundFactory(puzzle=puzzle_a, year='1998')
        PuzzleRoundFactory(puzzle=puzzle_a, year='1999')
        PuzzleRoundFactory(puzzle=puzzle_a, year='2000')

        puzzle_b = PuzzleFactory(display_name='puzzle b')

        puzzle_c = PuzzleFactory(display_name='puzzle c')

        puzzles = [puzzle_a, puzzle_b, puzzle_c]

        self.assertEqual(
            self.gs.participant_moves_for_csv(puzzles, [self.u]),
            [
                ['puzzle a', 1998, 1999, 2000], [],
                ['puzzle b'], [],
                ['puzzle c'], []
            ]
        )

        # Now add some moves
        MoveFactory(
            game_state=self.gs, puzzle_round=puzzleround_a_first, hats=100)

        self.assertEqual(
            self.gs.participant_moves_for_csv(puzzles, [self.u]),
            [
                ['puzzle a', 1998, 1999, 2000],
                ['test_user', 210],
                [],
                ['puzzle b'], [],
                ['puzzle c'], []
            ]
        )


class TestMove(TestCase):
    def test_is_valid_from_factory(self):
        MoveFactory()

    def test_calculate_ending_inventory(self):
        m = MoveFactory()
        pr = PuzzleRoundFactory()
        result = m.calculate_ending_inventory(pr)
        self.assertEqual(m.ending_inventory, 230)
        self.assertEqual(result, 230)

    def test_calculate_ending_inventory_on_pre_save(self):
        pr = PuzzleRoundFactory()
        m = MoveFactory(puzzle_round=pr)
        m.save()
        self.assertEqual(m.ending_inventory, 230)


class TestPuzzle(TestCase):
    def setUp(self):
        self.p = PuzzleFactory()

    def test_is_valid_from_factory(self):
        PuzzleFactory()

    def test_unicode(self):
        self.assertEqual(str(self.p), self.p.display_name)

    def test_autoslug(self):
        p = PuzzleFactory(display_name='Puzzle Display Name')
        self.assertEqual(p.slug, 'puzzle-display-name')

    def test_active_participants_empty(self):
        self.assertEqual(self.p.active_participants([]), [])


class TestPuzzleRound(TestCase):
    def test_is_valid_from_factory(self):
        PuzzleRoundFactory()
