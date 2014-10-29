import factory
from django.contrib.auth.models import User
from wacep.weatherroulette.models import (
    GameState, Move, Puzzle, PuzzleRound
)


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: "user_%d" % n)


class PuzzleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Puzzle

    display_name = factory.Sequence(lambda n: 'Test Puzzle {0}'.format(n))
    description = factory.Sequence(lambda n: 'Description {0}'.format(n))


class PuzzleRoundFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = PuzzleRound

    year = 1999
    puzzle = factory.SubFactory(PuzzleFactory)
    below_forecast = 20
    normal_forecast = 20
    above_forecast = 60
    rainfall_observation = 'Above'


class GameStateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = GameState

    user = factory.SubFactory(UserFactory)
    current_inventory = 300
    current_round = factory.SubFactory(PuzzleRoundFactory)


class MoveFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Move

    game_state = factory.SubFactory(GameStateFactory)
    puzzle = factory.SubFactory(PuzzleFactory)
    puzzle_round = factory.SubFactory(PuzzleRoundFactory)
    year = 1998
    hats = 80
    shirts = 10
    umbrellas = 10
    starting_inventory = 300
    ending_inventory = 80
