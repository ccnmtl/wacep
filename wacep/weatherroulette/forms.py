from django import forms
from django.contrib import admin

from .models import Puzzle


class PuzzleAdminForm(forms.ModelForm):
    class Meta:
        model = Puzzle
        widgets = {
            'display_name': admin.widgets.AdminTextInputWidget
        }
        exclude = []
