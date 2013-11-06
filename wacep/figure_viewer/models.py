from django.db import models
from django.contrib.contenttypes import generic
from pagetree.models import PageBlock
from django import forms


class GraphingModeInput (models.Model):
    name = models.CharField(max_length=256, default='')
    order_rank = models.IntegerField(default=0, null=True, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class ClimateVariableInput (models.Model):
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

class AnimationInput(models.Model):
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


class ModeOfVariabilityInput(models.Model):
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

class YearInput (models.Model):
    name = models.CharField(max_length=256, default='')
    order_rank = models.IntegerField(default=0, null=True, blank=True)

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


    topic = models.ForeignKey ('FigureViewerTopic',  null=True, blank=True)

    season_input                    = models.ForeignKey ('SeasonInput',                null=True, blank=True)
    climate_variable_input          = models.ForeignKey ('ClimateVariableInput',       null=True, blank=True)
    animation_input                 = models.ForeignKey ('AnimationInput',             null=True, blank=True)


    year_input                      = models.ForeignKey ('YearInput',                   null=True, blank=True)
    mode_of_variability_input       = models.ForeignKey ('ModeOfVariabilityInput',      null=True, blank=True)
    graphing_mode_input             = models.ForeignKey ('GraphingModeInput',           null=True, blank=True)


    activity_state                  = models.ForeignKey ('ActivityState')
    #default_state                   = models.BooleanField (default = False, help_text= 'Set this to true only for the default / initial state of the activity.')


    def __unicode__(self):
        return "Inputs resulting in state %s " % self.activity_state

    class Meta:
        ordering = ['activity_state']
        unique_together = ("topic", "season_input", "climate_variable_input", "animation_input")

    def to_json(self):
        result = {
            'topic_id'                  : self.topic_id if self.topic else None,
            'season_input_id'           : self.season_input.id if self.season_input        else None,
            'climate_variable_input_id' : self.climate_variable_input_id   if self.climate_variable_input_id          else None,
            'animation_input_id'        : self.animation_input_id   if self.animation_input_id          else None,
            'year_input_id'             : self.year_input.id if self.year_input        else None,
            'mode_of_variability_input_id' : self.mode_of_variability_input_id   if self.mode_of_variability_input_id          else None,
            'graphing_mode_input_id'    : self.graphing_mode_input_id   if self.graphing_mode_input_id          else None,
            'activity_state_id'         : self.activity_state.id,
            'id'                        : self.id
        }
        
        return result


class ActivityState (models.Model):
    name  = models.CharField(max_length=256, default = '')
    image_filename     = models.CharField(max_length=256, default = '', blank=True)
    colorbar_filename  = models.CharField(max_length=256, default = '', blank=True)
    order_rank = models.IntegerField(default=0, null=True, blank=True)
    title = models.CharField(max_length=256, default = '')
    text          = models.TextField(blank=True, default = '')

    climate_impact       = models.CharField(max_length=256, blank=True, default = '')
    graph_title          = models.CharField(max_length=256, blank=True, default = '')

    def get_absolute_url(self):
        return "/admin/figure_viewer/activitystate/%i/" % self.id

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['order_rank']

    def to_json(self):

        where = '/_figure_viewer/media/img'

        fn = self.image_filename
        image_path = '%s/%s' % (where, fn) if (fn != '') else ''

        fn = self.colorbar_filename
        colorbar_path = '%s/%s' % (where, fn) if (fn != '') else ''


        return {
            'name'       : self.name,
            'id'         : self.id,
            'image_path'  : image_path,
            'color_bar'  : colorbar_path,
            'absolute_url' : self.get_absolute_url()
        }


class FigureViewerTopic (models.Model):
    TOPIC_CHOICES = (
        ('GC', 'Global Climatologies'),
        ('NV', 'Modes of Natural Variability'),
        ('TC', 'Teleconnections'),
    )
    slug = models.CharField(max_length=2, choices=TOPIC_CHOICES, default='TC')
    def __unicode__(self):
        return self.slug

    def to_json(self):
        result = {
            'slug'                      : self.id,
            'id'                        : self.id
        }
        return result;

class FigureViewerBlock(models.Model):
    pageblocks = generic.GenericRelation(PageBlock, related_name = "FigureViewerBlocks")

    topic = models.ForeignKey ('FigureViewerTopic',  null=True, blank=True)

    template_file = "figure_viewer/figure_viewer.html"
    js_template_file = "figure_viewer/block_js.html"
    css_template_file = "figure_viewer/block_css.html"
    display_name = "Figure Viewer Activity"

    #topic = models.CharField(max_length=2, choices=TOPIC_CHOICES, default='CLIMATOLOGIES')
    # This activity comes in three different "flavors" which are displayed in different places.
    # Basic differences are described in methods here in this class,
    # depending on the value of "TOPIC CHOICES."

    def input_types (self):

        """The dropdown / radio buttons needed to decide which ActivityState to show."""
        if self.topic == None:
                raise ValueError ("This figure viewer isn't associated with a topic." )
        if self.topic.slug == 'GC':
            return ['season','climate_variable','animation']
        elif self.topic.slug == 'NV':
            return ['mode_of_variability', 'graphing_mode', 'year']
        elif self.topic.slug ==  'TC':
            return ['mode_of_variability', 'graphing_mode']
        else:
            raise ValueError ("Can't find the topic %s." % self.topic)

    def pageblock(self):
        return self.pageblocks.all()[0]

    def __unicode__(self):
        return unicode(self.pageblock())

    def needs_submit(self):
        return False

    @classmethod
    def add_form(self):
        return FigureViewerBlockForm()

    def edit_form(self):
        return FigureViewerBlockForm(instance=self)

    @classmethod
    def create(self, request):
        form = FigureViewerBlockForm(request.POST)
        return form.save()

    def edit(self, vals, files):
        form = FigureViewerBlockForm(data=vals,
                                          files=files,
                                          instance=self)
        if form.is_valid():
            form.save()

    def unlocked(self, user):
        return True

class FigureViewerBlockForm(forms.ModelForm):
    class Meta:
        model = FigureViewerBlock

