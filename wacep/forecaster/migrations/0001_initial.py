# flake8: noqa
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HurricaneYear',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('year', models.PositiveSmallIntegerField()),
                ('named_storms', models.IntegerField(default=0)),
                ('hurricanes', models.IntegerField(default=0)),
                ('nino_sst_anomalies', models.FloatField(default=0.0)),
            ],
            options={
                'ordering': ['year'],
            },
            bases=(models.Model,),
        ),
    ]
