from account.decorators import login_required
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, HttpResponse, redirect, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from .models import Post
from .forms import PostForm
from . import APP_NAME


def index(request):
    return render(request, template_name="%s/index.html" % APP_NAME,
                  context={'posts': Post.objects.all()})


@login_required
def new(request):
    form = PostForm()
    if request.method == 'POST':
        form = PostForm(request.POST or None)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.author = request.user
            obj.save()
            return HttpResponseRedirect(obj.get_absolute_url())
    return render(request, template_name='cartoview_geo_blog/new.html', context={'form': form})


@login_required
def edit(request, id):
    obj = get_object_or_404(Post, id=id)
    form = PostForm(instance=obj)
    if request.method == 'POST':
        form = PostForm(request.POST or None, instance=obj)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.author = request.user
            obj.save()
            return HttpResponseRedirect(obj.get_absolute_url())
    return render(request, template_name='cartoview_geo_blog/new.html', context={'form': form})


def details(request, id):
    obj = get_object_or_404(Post, id=id)
    return render(request, template_name='cartoview_geo_blog/details.html', context={'post': obj})
