# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'BoxColor'
        db.create_table('timescale_boxcolor', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('color', self.gf('django.db.models.fields.CharField')(default='FFFFFF', max_length=6)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['BoxColor'])

        # Adding model 'GamePhase'
        db.create_table('timescale_gamephase', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('instructions', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('css_classes', self.gf('django.db.models.fields.CharField')(default='', max_length=256, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['GamePhase'])

        # Adding model 'ActivePhase'
        db.create_table('timescale_activephase', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('game_phase', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.GamePhase'])),
            ('column', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.Column'])),
        ))
        db.send_create_signal('timescale', ['ActivePhase'])

        # Adding unique constraint on 'ActivePhase', fields ['game_phase', 'column']
        db.create_unique('timescale_activephase', ['game_phase_id', 'column_id'])

        # Adding model 'Scenario'
        db.create_table('timescale_scenario', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('title', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('difficulty', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('instructions', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['Scenario'])

        # Adding model 'Column'
        db.create_table('timescale_column', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('css_classes', self.gf('django.db.models.fields.CharField')(default='', max_length=256, null=True, blank=True)),
            ('help_definition', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
            ('help_examples', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
            ('flavor', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
        ))
        db.send_create_signal('timescale', ['Column'])

        # Adding model 'TimescaleBlock'
        db.create_table('timescale_timescaleblock', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal('timescale', ['TimescaleBlock'])


    def backwards(self, orm):
        # Removing unique constraint on 'ActivePhase', fields ['game_phase', 'column']
        db.delete_unique('timescale_activephase', ['game_phase_id', 'column_id'])

        # Deleting model 'BoxColor'
        db.delete_table('timescale_boxcolor')

        # Deleting model 'GamePhase'
        db.delete_table('timescale_gamephase')

        # Deleting model 'ActivePhase'
        db.delete_table('timescale_activephase')

        # Deleting model 'Scenario'
        db.delete_table('timescale_scenario')

        # Deleting model 'Column'
        db.delete_table('timescale_column')

        # Deleting model 'TimescaleBlock'
        db.delete_table('timescale_timescaleblock')


    models = {
        'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        'pagetree.hierarchy': {
            'Meta': {'object_name': 'Hierarchy'},
            'base_url': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'})
        },
        'pagetree.pageblock': {
            'Meta': {'ordering': "('section', 'ordinality')", 'object_name': 'PageBlock'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['contenttypes.ContentType']"}),
            'css_extra': ('django.db.models.fields.CharField', [], {'max_length': '256', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'label': ('django.db.models.fields.CharField', [], {'max_length': '256', 'null': 'True', 'blank': 'True'}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'ordinality': ('django.db.models.fields.PositiveIntegerField', [], {'default': '1'}),
            'section': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['pagetree.Section']"})
        },
        'pagetree.section': {
            'Meta': {'object_name': 'Section'},
            'depth': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'hierarchy': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['pagetree.Hierarchy']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'label': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'numchild': ('django.db.models.fields.PositiveIntegerField', [], {'default': '0'}),
            'path': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50'})
        },
        'timescale.activephase': {
            'Meta': {'ordering': "['game_phase', 'column']", 'unique_together': "(('game_phase', 'column'),)", 'object_name': 'ActivePhase'},
            'column': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.Column']"}),
            'game_phase': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.GamePhase']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'timescale.boxcolor': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'BoxColor'},
            'color': ('django.db.models.fields.CharField', [], {'default': "'FFFFFF'", 'max_length': '6'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.column': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'Column'},
            'css_classes': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'null': 'True', 'blank': 'True'}),
            'flavor': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'help_definition': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True', 'blank': 'True'}),
            'help_examples': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.gamephase': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'GamePhase'},
            'css_classes': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instructions': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.scenario': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'Scenario'},
            'difficulty': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instructions': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True', 'blank': 'True'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'})
        },
        'timescale.timescaleblock': {
            'Meta': {'object_name': 'TimescaleBlock'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        }
    }

    complete_apps = ['timescale']