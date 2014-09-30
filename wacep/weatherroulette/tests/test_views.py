from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import GameState
from .factories import (
    GameStateFactory, MoveFactory, PuzzleFactory, PuzzleRoundFactory,
    UserFactory
)


class TestGameState(APITestCase):
    def setUp(self):
        self.u = UserFactory()
        self.client.force_authenticate(user=self.u)

    def test_game_state_is_created_on_get(self):
        resp = self.client.get(reverse('game-state'))
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['user'], self.u.id)

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
        #self.assertEqual(resp.status_code, status.HTTP_201_CREATED)

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
