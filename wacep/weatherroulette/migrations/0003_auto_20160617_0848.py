# flake8: noqa
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import autoslug.fields


class Migration(migrations.Migration):

    dependencies = [
        ('weatherroulette', '0002_auto_20150617_1148'),
    ]

    operations = [
        migrations.AlterField(
            model_name='puzzle',
            name='slug',
            field=autoslug.fields.AutoSlugField(populate_from=b'display_name', editable=False),
        ),
    ]
