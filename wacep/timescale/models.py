from django.db import models
from django.contrib.contenttypes import generic
from pagetree.models import PageBlock
from django.db.models import FilePathField
from django import forms

class YearInput (models.Model):
    name  = models.CharField(max_length=256, default = '')
    order_rank = models.IntegerField(default=0, null=True, blank=True, )
    
    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

class GraphingModeInput (models.Model):
    name  = models.CharField(max_length=256, default = '')
    order_rank = models.IntegerField(default=0, null=True, blank=True, )
    
    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

class SeasonInput (models.Model):
    name  = models.CharField(max_length=256, default = '')
    order_rank = models.IntegerField(default=0, null=True, blank=True, )
    
    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

class InputCombination (models.Model):
    """A combination of inputs that that puts the activity in a certain state."""

    season_input        = models.ForeignKey ('SeasonInput',       null=True, blank=True)
    graphing_mode_input = models.ForeignKey ('GraphingModeInput', null=True, blank=True)
    year_input          = models.ForeignKey ('YearInput',         null=True, blank=True)
    activity_state      = models.ForeignKey ('ActivityState')

    def __unicode__(self):
        return "Inputs resulting in state %s " % self.activity_state

    class Meta:
        ordering = ['activity_state']
        unique_together = ("season_input", "graphing_mode_input", "year_input")

    def to_json(self):
        result = {
            'season_input_id'           : self.season_input.id if self.season_input        else None,
            'graphing_mode_input_id'    : self.graphing_mode_input.id if self.graphing_mode_input else None,
            'year_input_id'             : self.year_input.id          if self.year_input          else None,
            'activity_state_id'         : self.activity_state.id,
            'id'                        : self.id
        }
        
        return result


class ActivityState (models.Model):
    name  = models.CharField(max_length=256, default = '')
    image_filename = models.CharField(max_length=256, default = '')
    order_rank = models.IntegerField(default=0, null=True, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):
        fn = self.image_filename
        where = '/_timescale/media/img'
        path = '%s/%s' % (where, fn) if (fn != '') else ''
        return {
            'name'       : self.name,
            'id'         : self.id,
            'image_path' : path
        }


class TimescaleBlock(models.Model):
    pageblocks = generic.GenericRelation(PageBlock)
    template_file = "timescale/timescale.html"
    js_template_file = "timescale/block_js.html"
    css_template_file = "timescale/block_css.html"
    display_name = "Timescale Maproom Activity"

    def pageblock(self):
        return self.pageblocks.all()[0]

    def __unicode__(self):
        return unicode(self.pageblock())

    def needs_submit(self):
        return False

    @classmethod
    def add_form(self):
        return TimescaleBlockForm()

    def edit_form(self):
        return TimescaleBlockForm(instance=self)

    @classmethod
    def create(self, request):
        form = TimescaleBlockForm(request.POST)
        return form.save()

    def edit(self, vals, files):
        form = TimescaleBlockForm(data=vals,
                                          files=files,
                                          instance=self)
        if form.is_valid():
            form.save()

    def unlocked(self, user):
        return True


class TimescaleBlockForm(forms.ModelForm):
    class Meta:
        model = TimescaleBlock

