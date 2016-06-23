# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('weatherroulette', '0003_auto_20160617_0848'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamestate',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
        ),
    ]
