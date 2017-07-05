# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '24_to_26'),
        ('cartoview_geo_blog', '0002_auto_20170627_2039'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='resources',
            field=models.ForeignKey(related_name='posts', blank=True, to='base.ResourceBase', null=True),
        ),
    ]
