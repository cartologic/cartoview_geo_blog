from django.conf import settings

from .models import Post


def posts_panel(request):
    return {'POSTS_PANEL':settings.POSTS_PANEL}


def blog_latest(request):
    return {'latest_posts': Post.objects.all()[:10]}
