# flake8: noqa
# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'GameState'
        db.create_table(u'weatherroulette_gamestate', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['auth.User'], unique=True)),
            ('current_puzzle', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['weatherroulette.Puzzle'], null=True)),
            ('current_round', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['weatherroulette.PuzzleRound'], null=True)),
            ('current_inventory', self.gf('django.db.models.fields.PositiveIntegerField')(default=0)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'weatherroulette', ['GameState'])

        # Adding model 'Move'
        db.create_table(u'weatherroulette_move', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('game_state', self.gf('django.db.models.fields.related.ForeignKey')(related_name='move_ids', to=orm['weatherroulette.GameState'])),
            ('puzzle', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['weatherroulette.Puzzle'])),
            ('puzzle_round', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['weatherroulette.PuzzleRound'])),
            ('year', self.gf('django.db.models.fields.PositiveSmallIntegerField')()),
            ('hats', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('shirts', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('umbrellas', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('starting_inventory', self.gf('django.db.models.fields.PositiveIntegerField')()),
            ('ending_inventory', self.gf('django.db.models.fields.PositiveIntegerField')(null=True, blank=True)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'weatherroulette', ['Move'])

        # Adding unique constraint on 'Move', fields ['game_state', 'year']
        db.create_unique(u'weatherroulette_move', ['game_state_id', 'year'])

        # Adding model 'Puzzle'
        db.create_table(u'weatherroulette_puzzle', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('display_name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=255)),
            ('slug', self.gf('autoslug.fields.AutoSlugField')(unique_with=(), max_length=50, populate_from='display_name')),
            ('description', self.gf('django.db.models.fields.TextField')()),
            ('is_locked', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('has_secret_player', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('starting_inventory', self.gf('django.db.models.fields.PositiveIntegerField')(default=300)),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'weatherroulette', ['Puzzle'])

        # Adding model 'PuzzleRound'
        db.create_table(u'weatherroulette_puzzleround', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('puzzle', self.gf('django.db.models.fields.related.ForeignKey')(related_name='puzzle_round_ids', to=orm['weatherroulette.Puzzle'])),
            ('year', self.gf('django.db.models.fields.PositiveSmallIntegerField')()),
            ('rainfall_observation', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('below_forecast', self.gf('django.db.models.fields.PositiveSmallIntegerField')()),
            ('normal_forecast', self.gf('django.db.models.fields.PositiveSmallIntegerField')()),
            ('above_forecast', self.gf('django.db.models.fields.PositiveSmallIntegerField')()),
            ('created_at', self.gf('django.db.models.fields.DateTimeField')(auto_now_add=True, blank=True)),
            ('updated_at', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
        ))
        db.send_create_signal(u'weatherroulette', ['PuzzleRound'])


    def backwards(self, orm):
        # Removing unique constraint on 'Move', fields ['game_state', 'year']
        db.delete_unique(u'weatherroulette_move', ['game_state_id', 'year'])

        # Deleting model 'GameState'
        db.delete_table(u'weatherroulette_gamestate')

        # Deleting model 'Move'
        db.delete_table(u'weatherroulette_move')

        # Deleting model 'Puzzle'
        db.delete_table(u'weatherroulette_puzzle')

        # Deleting model 'PuzzleRound'
        db.delete_table(u'weatherroulette_puzzleround')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Group']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "u'user_set'", 'blank': 'True', 'to': u"orm['auth.Permission']"}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'weatherroulette.gamestate': {
            'Meta': {'object_name': 'GameState'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'current_inventory': ('django.db.models.fields.PositiveIntegerField', [], {'default': '0'}),
            'current_puzzle': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['weatherroulette.Puzzle']", 'null': 'True'}),
            'current_round': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['weatherroulette.PuzzleRound']", 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']", 'unique': 'True'})
        },
        u'weatherroulette.move': {
            'Meta': {'unique_together': "(('game_state', 'year'),)", 'object_name': 'Move'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'ending_inventory': ('django.db.models.fields.PositiveIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'game_state': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'move_ids'", 'to': u"orm['weatherroulette.GameState']"}),
            'hats': ('django.db.models.fields.PositiveIntegerField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'puzzle': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['weatherroulette.Puzzle']"}),
            'puzzle_round': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['weatherroulette.PuzzleRound']"}),
            'shirts': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'starting_inventory': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'umbrellas': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'year': ('django.db.models.fields.PositiveSmallIntegerField', [], {})
        },
        u'weatherroulette.puzzle': {
            'Meta': {'ordering': "['display_name']", 'object_name': 'Puzzle'},
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.TextField', [], {}),
            'display_name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'}),
            'has_secret_player': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_locked': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'slug': ('autoslug.fields.AutoSlugField', [], {'unique_with': '()', 'max_length': '50', 'populate_from': "'display_name'"}),
            'starting_inventory': ('django.db.models.fields.PositiveIntegerField', [], {'default': '300'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        },
        u'weatherroulette.puzzleround': {
            'Meta': {'ordering': "['year']", 'object_name': 'PuzzleRound'},
            'above_forecast': ('django.db.models.fields.PositiveSmallIntegerField', [], {}),
            'below_forecast': ('django.db.models.fields.PositiveSmallIntegerField', [], {}),
            'created_at': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'normal_forecast': ('django.db.models.fields.PositiveSmallIntegerField', [], {}),
            'puzzle': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'puzzle_round_ids'", 'to': u"orm['weatherroulette.Puzzle']"}),
            'rainfall_observation': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'updated_at': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'year': ('django.db.models.fields.PositiveSmallIntegerField', [], {})
        }
    }

    complete_apps = ['weatherroulette']
