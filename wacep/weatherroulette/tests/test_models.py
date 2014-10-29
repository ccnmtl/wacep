from django.test import TestCase
from .factories import (
    GameStateFactory, MoveFactory, PuzzleFactory, PuzzleRoundFactory,
    UserFactory
)


class TestGameState(TestCase):
    def test_is_valid_from_factory(self):
        u = UserFactory()
        GameStateFactory(user=u)


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
    def test_is_valid_from_factory(self):
        PuzzleFactory()

    def test_unicode(self):
        p = PuzzleFactory()
        self.assertEqual(str(p), p.display_name)

    def test_autoslug(self):
        p = PuzzleFactory(display_name='Puzzle Display Name')
        self.assertEqual(p.slug, 'puzzle-display-name')


class TestPuzzleRound(TestCase):
    def test_is_valid_from_factory(self):
        PuzzleRoundFactory()
