from django.conf.urls import patterns, url, include
from django.views.generic import TemplateView
from . import views, APP_NAME
from cartoview.urls import urlpatterns as carto_urls

urlpatterns = patterns('',
                       url(r'^$', views.index, name='%s.list' % APP_NAME),
                       url(r'^test$', views.test, name='%s.test' % APP_NAME),
                       url(r'^new/$', views.new, name='%s.new' % APP_NAME),
                       url(r'^(?P<id>[\d]+)/edit/$', views.edit, name='%s.edit' % APP_NAME),
                       url(r'^(?P<id>[\d]+)/view/$', views.details, name='post-details'),

                       )
