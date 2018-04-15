from allauth.account.decorators import login_required
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import render, HttpResponse, redirect, HttpResponseRedirect
from django.http import JsonResponse,HttpResponseBadRequest
from cartoview.app_manager.models import AppInstance
from django.shortcuts import get_object_or_404
from .decorators import user_is_post_author
from .models import Post
from . import APP_NAME


def index(request):
    return render(request, template_name="%s/index.html" % APP_NAME,
                  context={'posts': Post.objects.all()})


def test(request):
    return render(request, template_name="%s/edit.html" % APP_NAME,
                  context={})

import json
@login_required
def new(request):
    if request.method == 'POST':
        data=json.loads(request.body)
        print data
        app=data.get('app',None)
        post=data.get('post',None)
        if app and post :
            app_obj=get_object_or_404(AppInstance, id=app['id'])
            obj=Post.objects.create(app=app_obj,author=request.user,title=post.get('title',"No Title Provided"),
            comments=post.get('comments',False),content=post.get('content',''))
            return JsonResponse({'url':'{}'.format(obj.get_absolute_url())})
        else:
            return HttpResponseBadRequest('no enough paramters')
    return render(request, template_name='cartoview_geo_blog/new.html', context={})


@login_required
@user_is_post_author
def edit(request, id):
    obj = get_object_or_404(Post, id=id)
    processed_data={'post':{'id':obj.id,'title':obj.title,'content':obj.content,'comments':obj.comments},'app':{'id':obj.app.id,'name':obj.app.app.name,'title':obj.app.title,'abstract':obj.app.abstract}}
    if request.method == 'POST':
        data=json.loads(request.body)
        print data
        app=data.get('app',None)
        post=data.get('post',None)
        if app and post :
            app_obj=get_object_or_404(AppInstance, id=app['id'])
            obj.app=app_obj
            obj.title=post.get('title',"No Title Provided")
            obj.comments=post.get('comments',False)
            obj.content=post.get('content','')
            obj.save()
            return JsonResponse({'url':'{}'.format(obj.get_absolute_url())})
        else:
            return HttpResponseBadRequest('no enough paramters')
    return render(request, template_name='cartoview_geo_blog/edit.html', context={'instance':json.dumps(processed_data)})


def details(request, id):
    obj = get_object_or_404(Post, id=id)
    return render(request, template_name='cartoview_geo_blog/details.html', context={'post': obj})
