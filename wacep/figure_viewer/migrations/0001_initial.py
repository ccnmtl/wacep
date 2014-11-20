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
                ('colorbar_filename', models.CharField(default=b'', max_length=256, blank=True)),
                ('order_rank', models.IntegerField(default=0, null=True, blank=True)),
                ('title', models.CharField(default=b'', max_length=256)),
                ('text', models.TextField(default=b'', blank=True)),
                ('source', models.TextField(default=b'', blank=True)),
                ('climate_impact', models.CharField(default=b'', max_length=256, blank=True)),
                ('graph_title', models.CharField(default=b'', max_length=256, blank=True)),
            ],
            options={
                'ordering': ['order_rank'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='AnimationInput',
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
            name='ClimateVariableInput',
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
            name='FigureViewerBlock',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='FigureViewerTopic',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slug', models.CharField(default=b'TC', max_length=2, choices=[(b'GC', b'Global Climatologies'), (b'NV', b'Modes of Natural Variability'), (b'TC', b'Teleconnections')])),
            ],
            options={
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
                ('activity_state', models.ForeignKey(to='figure_viewer.ActivityState')),
                ('animation_input', models.ForeignKey(blank=True, to='figure_viewer.AnimationInput', null=True)),
                ('climate_variable_input', models.ForeignKey(blank=True, to='figure_viewer.ClimateVariableInput', null=True)),
                ('graphing_mode_input', models.ForeignKey(blank=True, to='figure_viewer.GraphingModeInput', null=True)),
            ],
            options={
                'ordering': ['activity_state'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ModeOfVariabilityInput',
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
            name='mode_of_variability_input',
            field=models.ForeignKey(blank=True, to='figure_viewer.ModeOfVariabilityInput', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='inputcombination',
            name='season_input',
            field=models.ForeignKey(blank=True, to='figure_viewer.SeasonInput', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='inputcombination',
            name='topic',
            field=models.ForeignKey(blank=True, to='figure_viewer.FigureViewerTopic', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='inputcombination',
            name='year_input',
            field=models.ForeignKey(blank=True, to='figure_viewer.YearInput', null=True),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='inputcombination',
            unique_together=set([('topic', 'season_input', 'climate_variable_input', 'animation_input')]),
        ),
        migrations.AddField(
            model_name='figureviewerblock',
            name='topic',
            field=models.ForeignKey(blank=True, to='figure_viewer.FigureViewerTopic', null=True),
            preserve_default=True,
        ),
    ]
