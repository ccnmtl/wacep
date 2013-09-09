# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Removing unique constraint on 'ActivePhase', fields ['game_phase', 'column']
        db.delete_unique('timescale_activephase', ['game_phase_id', 'column_id'])

        # Deleting model 'Column'
        db.delete_table('timescale_column')

        # Deleting model 'ActivePhase'
        db.delete_table('timescale_activephase')

        # Deleting model 'BoxColor'
        db.delete_table('timescale_boxcolor')

        # Deleting model 'GamePhase'
        db.delete_table('timescale_gamephase')

        # Deleting model 'Scenario'
        db.delete_table('timescale_scenario')

        # Adding model 'YearInput'
        db.create_table('timescale_yearinput', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['YearInput'])

        # Adding model 'InputCombination'
        db.create_table('timescale_inputcombination', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('season_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.SeasonInput'])),
            ('graphing_mode_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.GraphingModeInput'])),
            ('year_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.YearInput'])),
            ('activity_state', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.ActivityState'], unique='True')),
        ))
        db.send_create_signal('timescale', ['InputCombination'])

        # Adding unique constraint on 'InputCombination', fields ['season_input', 'graphing_mode_input', 'year_input']
        db.create_unique('timescale_inputcombination', ['season_input_id', 'graphing_mode_input_id', 'year_input_id'])

        # Adding model 'GraphingModeInput'
        db.create_table('timescale_graphingmodeinput', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['GraphingModeInput'])

        # Adding model 'ActivityState'
        db.create_table('timescale_activitystate', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('image_path', self.gf('django.db.models.fields.FilePathField')(path='/var/www/images_for_timescale_tool', max_length=100)),
            ('css_classes', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['ActivityState'])

        # Adding model 'SeasonInput'
        db.create_table('timescale_seasoninput', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['SeasonInput'])


    def backwards(self, orm):
        # Removing unique constraint on 'InputCombination', fields ['season_input', 'graphing_mode_input', 'year_input']
        db.delete_unique('timescale_inputcombination', ['season_input_id', 'graphing_mode_input_id', 'year_input_id'])

        # Adding model 'Column'
        db.create_table('timescale_column', (
            ('help_definition', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
            ('help_examples', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('css_classes', self.gf('django.db.models.fields.CharField')(default='', max_length=256, null=True, blank=True)),
            ('flavor', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal('timescale', ['Column'])

        # Adding model 'ActivePhase'
        db.create_table('timescale_activephase', (
            ('column', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.Column'])),
            ('game_phase', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.GamePhase'])),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal('timescale', ['ActivePhase'])

        # Adding unique constraint on 'ActivePhase', fields ['game_phase', 'column']
        db.create_unique('timescale_activephase', ['game_phase_id', 'column_id'])

        # Adding model 'BoxColor'
        db.create_table('timescale_boxcolor', (
            ('color', self.gf('django.db.models.fields.CharField')(default='FFFFFF', max_length=6)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
        ))
        db.send_create_signal('timescale', ['BoxColor'])

        # Adding model 'GamePhase'
        db.create_table('timescale_gamephase', (
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('css_classes', self.gf('django.db.models.fields.CharField')(default='', max_length=256, null=True, blank=True)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('instructions', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['GamePhase'])

        # Adding model 'Scenario'
        db.create_table('timescale_scenario', (
            ('title', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('difficulty', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('instructions', self.gf('django.db.models.fields.TextField')(default='', null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['Scenario'])

        # Deleting model 'YearInput'
        db.delete_table('timescale_yearinput')

        # Deleting model 'InputCombination'
        db.delete_table('timescale_inputcombination')

        # Deleting model 'GraphingModeInput'
        db.delete_table('timescale_graphingmodeinput')

        # Deleting model 'ActivityState'
        db.delete_table('timescale_activitystate')

        # Deleting model 'SeasonInput'
        db.delete_table('timescale_seasoninput')


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
        'timescale.activitystate': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'ActivityState'},
            'css_classes': ('django.db.models.fields.TextField', [], {'default': "''", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image_path': ('django.db.models.fields.FilePathField', [], {'path': "'/var/www/images_for_timescale_tool'", 'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.graphingmodeinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'GraphingModeInput'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.inputcombination': {
            'Meta': {'ordering': "['activity_state']", 'unique_together': "(('season_input', 'graphing_mode_input', 'year_input'),)", 'object_name': 'InputCombination'},
            'activity_state': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.ActivityState']", 'unique': "'True'"}),
            'graphing_mode_input': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.GraphingModeInput']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'season_input': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.SeasonInput']"}),
            'year_input': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.YearInput']"})
        },
        'timescale.seasoninput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'SeasonInput'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.timescaleblock': {
            'Meta': {'object_name': 'TimescaleBlock'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        'timescale.yearinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'YearInput'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['timescale']