# flake8: noqa
# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'YearInput'
        db.create_table('timescale_yearinput', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['YearInput'])

        # Adding model 'GraphingModeInput'
        db.create_table('timescale_graphingmodeinput', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['GraphingModeInput'])

        # Adding model 'SeasonInput'
        db.create_table('timescale_seasoninput', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal('timescale', ['SeasonInput'])

        # Adding model 'InputCombination'
        db.create_table('timescale_inputcombination', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('season_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.SeasonInput'], null=True, blank=True)),
            ('graphing_mode_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.GraphingModeInput'], null=True, blank=True)),
            ('year_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.YearInput'], null=True, blank=True)),
            ('activity_state', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timescale.ActivityState'])),
        ))
        db.send_create_signal('timescale', ['InputCombination'])

        # Adding unique constraint on 'InputCombination', fields ['season_input', 'graphing_mode_input', 'year_input']
        db.create_unique('timescale_inputcombination', ['season_input_id', 'graphing_mode_input_id', 'year_input_id'])

        # Adding model 'ActivityState'
        db.create_table('timescale_activitystate', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('image_filename', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('legend_filename', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('show_left_side', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('show_year_details', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('text', self.gf('django.db.models.fields.TextField')(default='', blank=True)),
            ('climate_impact', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('graph_title', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('y_scale_title', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('percent_interannual', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('percent_interdecadal', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('percent_trend', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('year', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('year_trend', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('year_decadal', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('year_interannual', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('year_sum', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('year_percentile', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
        ))
        db.send_create_signal('timescale', ['ActivityState'])

        # Adding model 'TimescaleBlock'
        db.create_table('timescale_timescaleblock', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal('timescale', ['TimescaleBlock'])


    def backwards(self, orm):
        # Removing unique constraint on 'InputCombination', fields ['season_input', 'graphing_mode_input', 'year_input']
        db.delete_unique('timescale_inputcombination', ['season_input_id', 'graphing_mode_input_id', 'year_input_id'])

        # Deleting model 'YearInput'
        db.delete_table('timescale_yearinput')

        # Deleting model 'GraphingModeInput'
        db.delete_table('timescale_graphingmodeinput')

        # Deleting model 'SeasonInput'
        db.delete_table('timescale_seasoninput')

        # Deleting model 'InputCombination'
        db.delete_table('timescale_inputcombination')

        # Deleting model 'ActivityState'
        db.delete_table('timescale_activitystate')

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
        'timescale.activitystate': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'ActivityState'},
            'climate_impact': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'graph_title': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image_filename': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'legend_filename': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'}),
            'percent_interannual': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'percent_interdecadal': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'percent_trend': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'show_left_side': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'show_year_details': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'text': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'y_scale_title': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'year': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'year_decadal': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'year_interannual': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'year_percentile': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'year_sum': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'year_trend': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'})
        },
        'timescale.graphingmodeinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'GraphingModeInput'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        'timescale.inputcombination': {
            'Meta': {'ordering': "['activity_state']", 'unique_together': "(('season_input', 'graphing_mode_input', 'year_input'),)", 'object_name': 'InputCombination'},
            'activity_state': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.ActivityState']"}),
            'graphing_mode_input': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.GraphingModeInput']", 'null': 'True', 'blank': 'True'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'season_input': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.SeasonInput']", 'null': 'True', 'blank': 'True'}),
            'year_input': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timescale.YearInput']", 'null': 'True', 'blank': 'True'})
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
