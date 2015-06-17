# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weatherroulette', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='puzzle',
            options={'ordering': ['id'], 'verbose_name': 'game'},
        ),
        migrations.AlterModelOptions(
            name='puzzleround',
            options={'ordering': ['year'], 'verbose_name': 'game round'},
        ),
    ]
