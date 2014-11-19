# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityState',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=256)),
                ('image_filename', models.CharField(default=b'', max_length=256, blank=True)),
                ('legend_filename', models.CharField(default=b'', max_length=256, blank=True)),
                ('show_left_side', models.BooleanField(default=False)),
                ('show_year_details', models.BooleanField(default=False)),
                ('order_rank', models.IntegerField(default=0, null=True, blank=True)),
                ('text', models.TextField(default=b'', blank=True)),
                ('climate_impact', models.CharField(default=b'', max_length=256, blank=True)),
                ('graph_title', models.CharField(default=b'', max_length=256, blank=True)),
                ('y_scale_title', models.CharField(default=b'', max_length=256, blank=True)),
                ('percent_interannual', models.CharField(default=b'', max_length=256, blank=True)),
                ('percent_interdecadal', models.CharField(default=b'', max_length=256, blank=True)),
                ('percent_trend', models.CharField(default=b'', max_length=256, blank=True)),
                ('year', models.CharField(default=b'', max_length=256, blank=True)),
                ('year_trend', models.CharField(default=b'', max_length=256, blank=True)),
                ('year_decadal', models.CharField(default=b'', max_length=256, blank=True)),
                ('year_interannual', models.CharField(default=b'', max_length=256, blank=True)),
                ('year_sum', models.CharField(default=b'', max_length=256, blank=True)),
                ('year_percentile', models.CharField(default=b'', max_length=256, blank=True)),
            ],
            options={
                'ordering': ['order_rank'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='GraphingModeInput',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=256)),
                ('order_rank', models.IntegerField(default=0, null=True, blank=True)),
            ],
            options={
                'ordering': ['order_rank'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='InputCombination',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activity_state', models.ForeignKey(to='timescale.ActivityState')),
                ('graphing_mode_input', models.ForeignKey(blank=True, to='timescale.GraphingModeInput', null=True)),
            ],
            options={
                'ordering': ['activity_state'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SeasonInput',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=256)),
                ('order_rank', models.IntegerField(default=0, null=True, blank=True)),
            ],
            options={
                'ordering': ['order_rank'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TimescaleBlock',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='YearInput',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=256)),
                ('order_rank', models.IntegerField(default=0, null=True, blank=True)),
            ],
            options={
                'ordering': ['order_rank'],
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='inputcombination',
            name='season_input',
            field=models.ForeignKey(blank=True, to='timescale.SeasonInput', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='inputcombination',
            name='year_input',
            field=models.ForeignKey(blank=True, to='timescale.YearInput', null=True),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='inputcombination',
            unique_together=set([('season_input', 'graphing_mode_input', 'year_input')]),
        ),
    ]
