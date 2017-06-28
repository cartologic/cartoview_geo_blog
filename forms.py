from ckeditor.widgets import CKEditorWidget
from django import forms

from .models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = ('author',)
        widgets={
            'content':CKEditorWidget()
        }
