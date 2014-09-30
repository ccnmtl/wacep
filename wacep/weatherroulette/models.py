from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from autoslug import AutoSlugField


class GameState(models.Model):
    """
    A GameState holds all the data needed for a user's game.
    """
    user = models.ForeignKey(User, unique=True)

    current_puzzle = models.ForeignKey('Puzzle', null=True)
    current_round = models.ForeignKey('PuzzleRound', null=True)

    # Money for current round
    current_inventory = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return unicode('Game state for user: %s, puzzle: %s' %
                       (self.user, self.current_puzzle))


class Move(models.Model):
    """
    A Move represents what the user chose to buy for one round.
    """
    game_state = models.ForeignKey('GameState', related_name='move_ids')
    puzzle = models.ForeignKey('Puzzle')
    puzzle_round = models.ForeignKey('PuzzleRound')
    year = models.PositiveSmallIntegerField()
    hats = models.PositiveIntegerField()
    shirts = models.PositiveIntegerField()
    umbrellas = models.PositiveIntegerField()
    starting_inventory = models.PositiveIntegerField()
    ending_inventory = models.PositiveIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('game_state', 'year',)

    def __unicode__(self):
        return unicode('Move for %s' % (self.year))

    # Calculates the ending inventory for this move, given a puzzle round.
    # Sets self.ending_inventory and returns the value
    def calculate_ending_inventory(self, puzzle_round):
        new_inv = self.starting_inventory - self.hats - self.shirts - \
            self.umbrellas

        if self.puzzle_round.rainfall_observation == 'Above':
            new_inv += (self.umbrellas * 3)
        elif self.puzzle_round.rainfall_observation == 'Normal':
            new_inv += (self.shirts * 3)
        elif self.puzzle_round.rainfall_observation == 'Below':
            new_inv += (self.hats * 3)

        self.ending_inventory = new_inv
        return self.ending_inventory


@receiver(pre_save, sender=Move)
def calc_ending_inventory(sender, instance, *args, **kwargs):
    instance.ending_inventory = instance.calculate_ending_inventory(
        instance.puzzle_round)


class Puzzle(models.Model):
    """
    A Puzzle is a pre-defined weather prediction puzzle for students to
    solve.
    """

    display_name = models.CharField(max_length=255, unique=True)
    slug = AutoSlugField(populate_from='display_name')
    description = models.TextField()
    is_locked = models.BooleanField(default=False)
    has_secret_player = models.BooleanField(default=False)
    starting_inventory = models.PositiveIntegerField(default=300)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return unicode(self.display_name)

    class Meta:
        ordering = ['display_name']


class PuzzleRound(models.Model):
    """
    PuzzleRound represents a year of climate data. Each Puzzle has a
    pre-defined set of PuzzleRounds.
    """
    puzzle = models.ForeignKey('Puzzle', related_name='puzzle_round_ids')
    year = models.PositiveSmallIntegerField()

    RAINFALL_CHOICES = (
        ('Below', 'Below'),
        ('Normal', 'Normal'),
        ('Above', 'Above')
    )
    rainfall_observation = models.CharField(
        max_length=255, choices=RAINFALL_CHOICES)

    below_forecast = models.PositiveSmallIntegerField()
    normal_forecast = models.PositiveSmallIntegerField()
    above_forecast = models.PositiveSmallIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return unicode(self.year)

    class Meta:
        ordering = ['year']
