# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'HurricaneYear'
        db.create_table(u'forecaster_hurricaneyear', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('year', self.gf('django.db.models.fields.DateField')()),
            ('named_storms', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('hurricanes', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('nino_sst_anomalies', self.gf('django.db.models.fields.FloatField')(default=0.0)),
        ))
        db.send_create_signal(u'forecaster', ['HurricaneYear'])


    def backwards(self, orm):
        # Deleting model 'HurricaneYear'
        db.delete_table(u'forecaster_hurricaneyear')


    models = {
        u'forecaster.hurricaneyear': {
            'Meta': {'ordering': "['year']", 'object_name': 'HurricaneYear'},
            'hurricanes': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'named_storms': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'nino_sst_anomalies': ('django.db.models.fields.FloatField', [], {'default': '0.0'}),
            'year': ('django.db.models.fields.DateField', [], {})
        }
    }

    complete_apps = ['forecaster']