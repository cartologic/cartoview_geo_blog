# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cartoview_geo_blog', '0003_post_resources'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='resources',
            new_name='resource',
        ),
    ]
