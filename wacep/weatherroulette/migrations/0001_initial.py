# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import autoslug.fields
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='GameState',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('current_inventory', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Move',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('year', models.PositiveSmallIntegerField()),
                ('hats', models.PositiveIntegerField()),
                ('shirts', models.PositiveIntegerField()),
                ('umbrellas', models.PositiveIntegerField()),
                ('starting_inventory', models.PositiveIntegerField()),
                ('ending_inventory', models.PositiveIntegerField(null=True, blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('game_state', models.ForeignKey(related_name='move_ids', to='weatherroulette.GameState')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Puzzle',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('display_name', models.TextField()),
                ('slug', autoslug.fields.AutoSlugField(editable=False)),
                ('description', models.TextField(blank=True)),
                ('lessons_learned', models.TextField(blank=True)),
                ('is_locked', models.BooleanField(default=False)),
                ('has_secret_player', models.BooleanField(default=False)),
                ('starting_inventory', models.PositiveIntegerField(default=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['id'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PuzzleRound',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('year', models.PositiveSmallIntegerField()),
                ('rainfall_observation', models.CharField(max_length=255, choices=[(b'Dry', b'Dry'), (b'Normal', b'Normal'), (b'Wet', b'Wet')])),
                ('below_forecast', models.PositiveSmallIntegerField()),
                ('normal_forecast', models.PositiveSmallIntegerField()),
                ('above_forecast', models.PositiveSmallIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('puzzle', models.ForeignKey(related_name='puzzle_round_ids', to='weatherroulette.Puzzle')),
            ],
            options={
                'ordering': ['year'],
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='move',
            name='puzzle_round',
            field=models.ForeignKey(to='weatherroulette.PuzzleRound'),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='move',
            unique_together=set([('game_state', 'puzzle_round')]),
        ),
        migrations.AddField(
            model_name='gamestate',
            name='current_round',
            field=models.ForeignKey(to='weatherroulette.PuzzleRound', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gamestate',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, unique=True),
            preserve_default=True,
        ),
    ]
