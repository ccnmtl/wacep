# flake8: noqa
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('pagetree', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(null=True)),
            ],
            options={
                'ordering': ['course'],
                'verbose_name_plural': 'Course certificates',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CertificateCourse',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=256)),
                ('order_rank', models.IntegerField(default=0, null=True, blank=True)),
                ('description', models.TextField(default=b'', help_text=b'A description of this course, to appear on the Courses page.', blank=True)),
                ('section', models.ForeignKey(null=True, blank=True, to='pagetree.Section', help_text=b'The section corresponding to this course.', unique=True)),
            ],
            options={
                'ordering': ['order_rank'],
                'verbose_name_plural': 'Courses',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CourseAccess',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('date', models.DateTimeField(null=True)),
                ('course', models.ForeignKey(to='certificates.CertificateCourse')),
                ('user', models.ForeignKey(related_name='courses_i_take', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['course'],
                'verbose_name_plural': 'Access to courses',
            },
            bases=(models.Model,),
        ),
        migrations.AlterUniqueTogether(
            name='courseaccess',
            unique_together=set([('user', 'course')]),
        ),
        migrations.AddField(
            model_name='certificate',
            name='course',
            field=models.ForeignKey(to='certificates.CertificateCourse'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='certificate',
            name='user',
            field=models.ForeignKey(related_name='certificates_earned', to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
        migrations.AlterUniqueTogether(
            name='certificate',
            unique_together=set([('user', 'course')]),
        ),
    ]
