from django.db import models
from django.contrib.contenttypes import generic
from pagetree.models import PageBlock
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
    image_filename = models.CharField(max_length=256, default = '', blank=True)
    order_rank = models.IntegerField(default=0, null=True, blank=True)
    text = models.TextField(blank=True, default = '')

    climate_impact       = models.CharField(max_length=256, blank=True, default = '')
    graph_title          = models.CharField(max_length=256, blank=True, default = '')
    y_scale_title        = models.CharField(max_length=256, blank=True, default = '')
    percent_interannual  = models.CharField(max_length=256, blank=True, default = '')
    percent_interdecadal = models.CharField(max_length=256, blank=True, default = '')
    percent_trend        = models.CharField(max_length=256, blank=True, default = '')

    year                 = models.CharField(max_length=256, blank=True, default = '')
    year_decadal         = models.CharField(max_length=256, blank=True, default = '')
    year_interannual     = models.CharField(max_length=256, blank=True, default = '')

    overall_sum          = models.CharField(max_length=256, blank=True, default = '')
    overall_percentile   = models.CharField(max_length=256, blank=True, default = '')

    show_left_side       = models.BooleanField()
    show_year_details    = models.BooleanField()


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
            'image_path' : path,

            'text'                : self.text,

            'graph_title'         : self.graph_title,
            'y_scale_title'       : self.y_scale_title,

            'percent_interannual' : self.percent_interannual,
            'percent_interdecadal': self.percent_interdecadal,
            'percent_trend'       : self.percent_trend,

            'year'                : self.year,
            'year_interannual'    : self.year_interannual,
            'year_decadal'        : self.year_decadal,

            'overall_sum'         : self.overall_sum,
            'overall_percentile'  : self.overall_percentile,
            'climate_impact'      : self.climate_impact,

            'show_left_side'      : self.show_left_side,
            'show_year_details'   : self.show_year_details

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

