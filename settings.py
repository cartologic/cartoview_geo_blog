import os
import cartoview_geo_blog

import sys

current_folder = os.path.dirname(cartoview_geo_blog.__file__)
sys.path.append(os.path.join(current_folder, 'libs'))
TEMPLATES[0]["OPTIONS"]['context_processors'] += (
    'cartoview_geo_blog.context_processors.blog_latest','cartoview_geo_blog.context_processors.posts_panel')
POSTS_PANEL = False
