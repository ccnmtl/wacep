# flake8: noqa
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('certificates', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certificatecourse',
            name='section',
            field=models.OneToOneField(null=True, blank=True, to='pagetree.Section', help_text=b'The section corresponding to this course.'),
        ),
    ]
