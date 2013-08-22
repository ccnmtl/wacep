# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Removing unique constraint on 'InputCombination', fields ['activity_state']
        db.delete_unique('timescale_inputcombination', ['activity_state_id'])

        # Deleting field 'ActivityState.image_path'
        db.delete_column('timescale_activitystate', 'image_path')

        # Adding field 'ActivityState.image_filename'
        db.add_column('timescale_activitystate', 'image_filename',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=256),
                      keep_default=False)


        # Changing field 'ActivityState.css_classes'
        db.alter_column('timescale_activitystate', 'css_classes', self.gf('django.db.models.fields.CharField')(max_length=256))

    def backwards(self, orm):
        # Adding unique constraint on 'InputCombination', fields ['activity_state']
        db.create_unique('timescale_inputcombination', ['activity_state_id'])

        # Adding field 'ActivityState.image_path'
        db.add_column('timescale_activitystate', 'image_path',
                      self.gf('django.db.models.fields.FilePathField')(path='/var/www/images_for_timescale_tool', max_length=100, null=True, blank=True),
                      keep_default=False)

        # Deleting field 'ActivityState.image_filename'
        db.delete_column('timescale_activitystate', 'image_filename')


        # Changing field 'ActivityState.css_classes'
        db.alter_column('timescale_activitystate', 'css_classes', self.gf('django.db.models.fields.TextField')(null=True))

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
            'css_classes': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image_filename': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
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