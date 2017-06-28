from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from .models import Post


def user_is_post_author(function):
    def wrap(request, *args, **kwargs):
        post = get_object_or_404(Post, id=kwargs['id'])
        if post.author == request.user or request.user.is_superuser:
            return function(request, *args, **kwargs)
        else:
            raise PermissionDenied

    return wrap
