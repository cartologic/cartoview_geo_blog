# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_manager', '0001_initial'),
        ('cartoview_geo_blog', '0004_auto_20170705_0143'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='resource',
        ),
        migrations.AddField(
            model_name='post',
            name='app',
            field=models.ForeignKey(related_name='posts', blank=True, to='app_manager.AppInstance', null=True),
        ),
    ]
