from django.contrib.auth.models import Group
from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import GameState, Puzzle
from .factories import (
    GameStateFactory, MoveFactory, PuzzleFactory, PuzzleRoundFactory,
    UserFactory
)


class AdminLoginTestMixin(object):
    def setUp(self):
        self.u = UserFactory(username='ccnmtl')
        self.u.set_password('test123')
        self.u.save()

        group = Group(name='WeatherRoulette Admins')
        group.save()
        self.u.groups.add(group)

        self.client.login(username='ccnmtl', password='test123')


class TestGameState(APITestCase):
    def setUp(self):
        self.u = UserFactory()
        self.client.force_authenticate(user=self.u)

    def test_game_state_is_created_on_get(self):
        resp = self.client.get(reverse('game-state'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['current_round_id'], None)
        self.assertEqual(resp.data['is_admin'], False)

    def test_game_state_is_updated_on_put(self):
        gs = GameStateFactory(user=self.u)
        new_round = PuzzleRoundFactory()
        new_inventory = 911
        url = reverse('game-state')
        data = {
            'game_state': {
                'current_round_id': new_round.id,
                'current_inventory': new_inventory
            }
        }

        resp = self.client.put(url, data)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)

        my_gs = GameState.objects.get(pk=gs.id)
        self.assertEqual(my_gs.current_round.id, new_round.id)
        self.assertEqual(my_gs.current_inventory, new_inventory)

    def test_game_state_is_success_on_empty_put(self):
        GameStateFactory(user=self.u)
        url = reverse('game-state')
        data = {}

        resp = self.client.put(url, data)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)


class TestGameStateUnAuthed(APITestCase):
    def test_game_state_index(self):
        resp = self.client.get(reverse('game-state'))
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


class TestMove(APITestCase):
    def setUp(self):
        self.u = UserFactory()
        self.client.force_authenticate(user=self.u)
        self.gs = GameStateFactory(user=self.u)

    def test_move_post(self):
        url = 'weatherroulette/api/moves'
        data = {
            'game_state': self.gs.id,
            'year': 1988,
            'hats': 80,
            'shirts': 10,
            'umbrellas': 10
        }
        self.client.post(url, data)

    def test_move_delete(self):
        m = MoveFactory()
        url = reverse('move-detail', args=(m.id,))
        self.client.delete(url)


class TestMoveUnAuthed(APITestCase):
    def test_move_isnt_created(self):
        m = MoveFactory()
        url = reverse('move-detail', args=(m.id,))
        resp = self.client.post(url)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


class TestPuzzleGET(APITestCase):
    def setUp(self):
        self.u = UserFactory()
        self.client.force_authenticate(user=self.u)

    def test_puzzle_index(self):
        PuzzleFactory()
        resp = self.client.get(reverse('puzzle-list'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data['puzzles']), 1)

    def test_puzzle_index_none(self):
        resp = self.client.get(reverse('puzzle-list'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data['puzzles']), 0)

    def test_puzzle_index_multiple(self):
        PuzzleFactory()
        PuzzleFactory()
        PuzzleFactory()
        resp = self.client.get(reverse('puzzle-list'))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data['puzzles']), 3)


class TestPuzzleUnAuthedGET(APITestCase):
    def test_puzzle_index(self):
        PuzzleFactory()
        resp = self.client.get(reverse('puzzle-list'))
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


class TestAdminView(AdminLoginTestMixin, TestCase):
    def test_empty_admin_index(self):
        resp = self.client.get(reverse('weatherroulette-admin-players'))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.context['participants'], [])
        self.assertEqual(resp.context['puzzles'], [])
        self.assertEqual(resp.context['participant_moves'], [])


class TestAdminViewUnAuthed(TestCase):
    def test_admin_get(self):
        resp = self.client.get(reverse('weatherroulette-admin-players'))
        self.assertEqual(resp.status_code, 302)

    def test_admin_post(self):
        resp = self.client.post(reverse('weatherroulette-admin-players'))
        self.assertEqual(resp.status_code, 302)

    def test_admin_post_lock_puzzle(self):
        puzzle = PuzzleFactory(is_locked=False)
        self.assertFalse(puzzle.is_locked)

        resp = self.client.post(
            reverse('weatherroulette-admin-players'),
            dict(lock=puzzle.id)
        )

        self.assertEqual(resp.status_code, 302)
        self.assertFalse(Puzzle.objects.get(pk=puzzle.id).is_locked)

    def test_admin_post_delete_puzzle(self):
        puzzle = PuzzleFactory()
        puzzle_id = puzzle.id

        resp = self.client.post(
            reverse('weatherroulette-admin-players'),
            dict(delete=puzzle_id)
        )

        self.assertEqual(resp.status_code, 302)
        self.assertTrue(Puzzle.objects.filter(pk=puzzle_id).exists())


class TestAdminExportPuzzleView(AdminLoginTestMixin, TestCase):
    def test_export_game(self):
        puzzle = PuzzleFactory()
        resp = self.client.get(reverse(
            'weatherroulette-admin-export-puzzle', args=(puzzle.id,)))
        self.assertEqual(resp.status_code, 200)


class TestAdminExportPuzzleViewUnAuthed(TestCase):
    def test_export_game(self):
        puzzle = PuzzleFactory()
        resp = self.client.get(reverse(
            'weatherroulette-admin-export-puzzle', args=(puzzle.id,)))
        self.assertEqual(resp.status_code, 302)


class TestAdminExportParticipantDataView(AdminLoginTestMixin, TestCase):
    def test_export_participant_data(self):
        resp = self.client.get(
            reverse('weatherroulette-admin-export-participant-data'))
        self.assertEqual(resp.status_code, 200)


class TestAdminExportParticipantDataViewUnAuthed(TestCase):
    def test_export_participant_data(self):
        resp = self.client.get(
            reverse('weatherroulette-admin-export-participant-data'))
        self.assertEqual(resp.status_code, 302)
