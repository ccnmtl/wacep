# flake8: noqa
# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'GraphingModeInput'
        db.create_table(u'figure_viewer_graphingmodeinput', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['GraphingModeInput'])

        # Adding model 'ClimateVariableInput'
        db.create_table(u'figure_viewer_climatevariableinput', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['ClimateVariableInput'])

        # Adding model 'SeasonInput'
        db.create_table(u'figure_viewer_seasoninput', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['SeasonInput'])

        # Adding model 'AnimationInput'
        db.create_table(u'figure_viewer_animationinput', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['AnimationInput'])

        # Adding model 'ModeOfVariabilityInput'
        db.create_table(u'figure_viewer_modeofvariabilityinput', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['ModeOfVariabilityInput'])

        # Adding model 'YearInput'
        db.create_table(u'figure_viewer_yearinput', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['YearInput'])

        # Adding model 'InputCombination'
        db.create_table(u'figure_viewer_inputcombination', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('topic', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.FigureViewerTopic'], null=True, blank=True)),
            ('season_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.SeasonInput'], null=True, blank=True)),
            ('climate_variable_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.ClimateVariableInput'], null=True, blank=True)),
            ('animation_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.AnimationInput'], null=True, blank=True)),
            ('year_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.YearInput'], null=True, blank=True)),
            ('mode_of_variability_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.ModeOfVariabilityInput'], null=True, blank=True)),
            ('graphing_mode_input', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.GraphingModeInput'], null=True, blank=True)),
            ('activity_state', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.ActivityState'])),
        ))
        db.send_create_signal(u'figure_viewer', ['InputCombination'])

        # Adding unique constraint on 'InputCombination', fields ['topic', 'season_input', 'climate_variable_input', 'animation_input']
        db.create_unique(u'figure_viewer_inputcombination', ['topic_id', 'season_input_id', 'climate_variable_input_id', 'animation_input_id'])

        # Adding model 'ActivityState'
        db.create_table(u'figure_viewer_activitystate', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('image_filename', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('colorbar_filename', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('order_rank', self.gf('django.db.models.fields.IntegerField')(default=0, null=True, blank=True)),
            ('title', self.gf('django.db.models.fields.CharField')(default='', max_length=256)),
            ('text', self.gf('django.db.models.fields.TextField')(default='', blank=True)),
            ('source', self.gf('django.db.models.fields.TextField')(default='', blank=True)),
            ('climate_impact', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
            ('graph_title', self.gf('django.db.models.fields.CharField')(default='', max_length=256, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['ActivityState'])

        # Adding model 'FigureViewerTopic'
        db.create_table(u'figure_viewer_figureviewertopic', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('slug', self.gf('django.db.models.fields.CharField')(default='TC', max_length=2)),
        ))
        db.send_create_signal(u'figure_viewer', ['FigureViewerTopic'])

        # Adding model 'FigureViewerBlock'
        db.create_table(u'figure_viewer_figureviewerblock', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('topic', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['figure_viewer.FigureViewerTopic'], null=True, blank=True)),
        ))
        db.send_create_signal(u'figure_viewer', ['FigureViewerBlock'])


    def backwards(self, orm):
        # Removing unique constraint on 'InputCombination', fields ['topic', 'season_input', 'climate_variable_input', 'animation_input']
        db.delete_unique(u'figure_viewer_inputcombination', ['topic_id', 'season_input_id', 'climate_variable_input_id', 'animation_input_id'])

        # Deleting model 'GraphingModeInput'
        db.delete_table(u'figure_viewer_graphingmodeinput')

        # Deleting model 'ClimateVariableInput'
        db.delete_table(u'figure_viewer_climatevariableinput')

        # Deleting model 'SeasonInput'
        db.delete_table(u'figure_viewer_seasoninput')

        # Deleting model 'AnimationInput'
        db.delete_table(u'figure_viewer_animationinput')

        # Deleting model 'ModeOfVariabilityInput'
        db.delete_table(u'figure_viewer_modeofvariabilityinput')

        # Deleting model 'YearInput'
        db.delete_table(u'figure_viewer_yearinput')

        # Deleting model 'InputCombination'
        db.delete_table(u'figure_viewer_inputcombination')

        # Deleting model 'ActivityState'
        db.delete_table(u'figure_viewer_activitystate')

        # Deleting model 'FigureViewerTopic'
        db.delete_table(u'figure_viewer_figureviewertopic')

        # Deleting model 'FigureViewerBlock'
        db.delete_table(u'figure_viewer_figureviewerblock')


    models = {
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'figure_viewer.activitystate': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'ActivityState'},
            'climate_impact': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'colorbar_filename': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'graph_title': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'image_filename': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256', 'blank': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'}),
            'source': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'text': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'title': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'})
        },
        u'figure_viewer.animationinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'AnimationInput'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.climatevariableinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'ClimateVariableInput'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.figureviewerblock': {
            'Meta': {'object_name': 'FigureViewerBlock'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'topic': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.FigureViewerTopic']", 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.figureviewertopic': {
            'Meta': {'object_name': 'FigureViewerTopic'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'slug': ('django.db.models.fields.CharField', [], {'default': "'TC'", 'max_length': '2'})
        },
        u'figure_viewer.graphingmodeinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'GraphingModeInput'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.inputcombination': {
            'Meta': {'ordering': "['activity_state']", 'unique_together': "(('topic', 'season_input', 'climate_variable_input', 'animation_input'),)", 'object_name': 'InputCombination'},
            'activity_state': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.ActivityState']"}),
            'animation_input': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.AnimationInput']", 'null': 'True', 'blank': 'True'}),
            'climate_variable_input': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.ClimateVariableInput']", 'null': 'True', 'blank': 'True'}),
            'graphing_mode_input': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.GraphingModeInput']", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mode_of_variability_input': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.ModeOfVariabilityInput']", 'null': 'True', 'blank': 'True'}),
            'season_input': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.SeasonInput']", 'null': 'True', 'blank': 'True'}),
            'topic': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.FigureViewerTopic']", 'null': 'True', 'blank': 'True'}),
            'year_input': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['figure_viewer.YearInput']", 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.modeofvariabilityinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'ModeOfVariabilityInput'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.seasoninput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'SeasonInput'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        u'figure_viewer.yearinput': {
            'Meta': {'ordering': "['order_rank']", 'object_name': 'YearInput'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            'order_rank': ('django.db.models.fields.IntegerField', [], {'default': '0', 'null': 'True', 'blank': 'True'})
        },
        u'pagetree.hierarchy': {
            'Meta': {'object_name': 'Hierarchy'},
            'base_url': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '256'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'})
        },
        u'pagetree.pageblock': {
            'Meta': {'ordering': "('section', 'ordinality')", 'object_name': 'PageBlock'},
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            'css_extra': ('django.db.models.fields.CharField', [], {'max_length': '256', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'label': ('django.db.models.fields.CharField', [], {'max_length': '256', 'null': 'True', 'blank': 'True'}),
            'object_id': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'ordinality': ('django.db.models.fields.PositiveIntegerField', [], {'default': '1'}),
            'section': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['pagetree.Section']"})
        },
        u'pagetree.section': {
            'Meta': {'object_name': 'Section'},
            'deep_toc': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'depth': ('django.db.models.fields.PositiveIntegerField', [], {}),
            'hierarchy': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['pagetree.Hierarchy']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'label': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'numchild': ('django.db.models.fields.PositiveIntegerField', [], {'default': '0'}),
            'path': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'}),
            'show_toc': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'slug': ('django.db.models.fields.SlugField', [], {'max_length': '50'})
        }
    }

    complete_apps = ['figure_viewer']
