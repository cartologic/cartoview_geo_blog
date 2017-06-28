from .models import Post


def blog_latest(requets):
    return {'latest_posts': Post.objects.all()[:10]}
