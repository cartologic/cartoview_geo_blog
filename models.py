from cartoview.app_manager.models import AppInstance
from ckeditor_uploader.fields import RichTextUploadingField
from django.core.urlresolvers import reverse_lazy
from django.db import models
from geonode.people.models import Profile


class Post(models.Model):
    app = models.ForeignKey(AppInstance, related_name='posts', null=True, blank=True)
    title = models.CharField(max_length=100)
    content = RichTextUploadingField('contents')
    author = models.ForeignKey(Profile, related_name='posts')
    ctime = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    comments = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse_lazy('post-details', kwargs={'id': self.id})

    def __unicode__(self):
        return self.title

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'
        ordering = ['-ctime', '-updated']

class CustomUser(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)