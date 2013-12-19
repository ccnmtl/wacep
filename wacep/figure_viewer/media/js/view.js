FigureViewer.FigureViewerView = Backbone.View.extend({

    events: {
        "change .figure_viewer_select": "menuChanged",
        "change .figure_viewer_radio":  "menuChanged",
        "click .reset_button"     : "resetButtonPushed",
        "click .help_icon"        : "showHelp",
        "click .help_ok_button"   : "hideHelp",
        "click .edit_this_state"  : "editCopy",
        "click .start_animate"  : "startAnimatePushed",
        "click .end_animate"    : "endAnimatePushed"
    },

    initialize: function(options) {
        "use strict";
        var self = this;
        _.bindAll(this ,
            "render",
            "getSettings",
            "setUpMenus",
            "set_up_menu",
            "menuChanged",
            "inputsChanged",
            "resetButtonPushed",
            "showHelp",
            "hideHelp",
            "startAnimatePushed",
            "endAnimatePushed",
            "whetherAnimationIsOn",
            "editCopy",
            "extraPrep",
            "extraCleanup",
            "disable_an_option",
            "enable_an_option"
        );
        self.topic_slug = jQuery('.topic_slug').html();

        jQuery('#right-content').removeClass ('span9');
        // makes the div go back to its default (wider) width.
        jQuery('.animate_buttons_span').hide();
        self.getSettings();
    },


    whetherAnimationIsOn: function() {
        "use strict";
        var self = this;
        return jQuery('.end_animate').is(':visible');
        //jQuery('.help_box').show();
    },


    startAnimatePushed: function() {
        "use strict";
        var self = this;
        self.setAnimateButtonstoOn();
        self.inputsChanged();
    },

    endAnimatePushed: function() {
        "use strict";
        var self = this;
        self.setAnimateButtonstoOff();
        self.inputsChanged();
    },

    setAnimateButtonstoOff: function() {
        jQuery('.start_animate').show();
        jQuery('.end_animate').hide();
    },

    setAnimateButtonstoOn: function() {
        jQuery('.start_animate').hide();
        jQuery('.end_animate').show();
    },

    getSettings: function() {
        "use strict";

        // Fetch the list of columns and scenarios from the back end.
        var self = this;
        
        var url = '/_figure_viewer/settings/' + self.topic_slug + '/';
        jQuery.ajax({
            type: 'POST',
            url: url,
            data: {
            },
            dataType: 'json',
            error: function () {
                alert('There was an error.');
            },
            success: function (json, textStatus, xhr) {
                self.settings = json;
                self.render();
            }
        });
    },

    set_up_menu: function (css_class, inputs){
        "use strict";
        var self = this;
        var the_dropdown = jQuery(css_class);        
        var suppressed_items = self.settings.topic.topic_settings.menu_items_to_suppress;
        for (var i=0; i < inputs.length; i++)  {
            var the_item = inputs[i];
            var item_class = the_item.name.replace(/ /g, "_").toLowerCase();
            if ( jQuery.inArray(item_class,  suppressed_items) === -1) {
                the_dropdown.append(jQuery('<option class="' + item_class +  '"></option>').val(the_item.id).html(the_item.name));
            }
        }
    },

    setUpMenus: function () {
        "use strict";
        var self = this;
        self.set_up_menu (".figure_viewer_select.season",              self.settings.season_inputs);
        self.set_up_menu (".figure_viewer_select.mode_of_variability", self.settings.mode_of_variability_inputs);
        self.set_up_menu (".figure_viewer_select.graphing_mode",       self.settings.graphing_mode_inputs);
        self.set_up_menu (".figure_viewer_select.year",                self.settings.year_inputs);
        self.set_up_menu (".figure_viewer_select.climate_variable",    self.settings.climate_variable_inputs);
    },

    findCurrentState: function () {
        "use strict";

        var self = this;
        var theSeason = parseInt(jQuery('.figure_viewer_select.season').val(), 10) || null;
        var theGraphingMode = parseInt(jQuery('.figure_viewer_select.graphing_mode').val(), 10) || null;
        var theClimateVariable  = parseInt(jQuery('.figure_viewer_select.climate_variable').val(), 10) || null;
        var theYear = parseInt(jQuery('.figure_viewer_select.year').val(), 10) || null;
        var theModeOfVariability = parseInt(jQuery('.figure_viewer_select.mode_of_variability').val(), 10) || null;

        var theAnimation = null;
        if (self.settings.topic.topic_settings.use_animation ) {
            if (self.whetherAnimationIsOn()) {
                theAnimation = 1;
            }
            else {
                theAnimation = 2;
            }
        }
        /*
        console.log ('theSeason '            + theSeason);
        console.log ('theGraphingMode '      + theGraphingMode);
        console.log ('theClimateVariable '   + theClimateVariable);
        console.log ('theYear '              + theYear);
        console.log ('theModeOfVariability ' + theModeOfVariability);
        console.log ('theAnimation         ' + theAnimation);
        */
        
        // do we know how to deal with this particular combination of inputs?


        var inputFinder = function (inputCombination) {
            // returns true if this inputcombination matches what we're looking for.
            return (
                (inputCombination.season_input_id                    ==  theSeason            ) &&
                (inputCombination.climate_variable_input_id          ==  theClimateVariable   ) &&
                (inputCombination.animation_input_id                 ==  theAnimation         ) &&
                (inputCombination.mode_of_variability_input_id       ==  theModeOfVariability ) &&
                (inputCombination.graphing_mode_input_id             ==  theGraphingMode      ) &&
                (inputCombination.year_input_id                      ==  theYear              )
            );
        };

        var defaultInputFinder = function (inputCombination) {
            return (inputCombination.is_default === true);
        };
        var inputCombination = _.find (self.settings.input_combinations, inputFinder);


        if (typeof (inputCombination) === "undefined") {
            inputCombination = _.find (self.settings.input_combinations, defaultInputFinder);
        }

        if (typeof (inputCombination) === "undefined") {
            alert ("ERROR: Could not find either that input combination or a default state.");
            return;
        }

        // Yes, we do.
        var stateId = inputCombination.activity_state_id;
        var theState = _.find(self.settings.activity_states, function (st) {
            return (st.id == stateId);
        });
        if (inputCombination.show_animate_buttons) {
            jQuery('.animate_buttons_span').show();
        }
        else {
            jQuery('.animate_buttons_span').hide();
        }
        if (typeof (theState) === "undefined") {
            alert ("ERROR: That state was not found.");
            return;
        }

        // theState has everything we need to know about decorating the page accordingly.
        self.currentState = theState;
        return theState;

    },

    menuChanged: function () {
        "use strict";
        var self = this;
        self.setAnimateButtonstoOff();
        self.inputsChanged();
    },

    inputsChanged: function () {
        "use strict";
        var self = this;
        self.extraPrep();
        var theState = self.findCurrentState();
        if (theState.image_path === '') {
            jQuery('.figure_viewer_graph' ).replaceWith('<img class="figure_viewer_graph">');
        }
        else {
            jQuery('.figure_viewer_graph' ).attr("src", theState.image_path);
            jQuery('.show_hide_div.left_side')      .show ();

        }
        if (theState.color_bar === '') {
            jQuery('.figure_viewer_color_bar' ).replaceWith('<img class="figure_viewer_color_bar">');
        }
        else {
            jQuery('.figure_viewer_color_bar' ).attr("src", theState.color_bar);
        }

        jQuery('.explanation_copy')         .html (theState.text);
        jQuery('.source_copy')              .html (theState.source);

        self.extraCleanup();
    },

    extraPrep: function() {
        // Sorry, only found out about this functionality really late, so I'm just tacking it on.
        "use strict";
        var self = this;
        if (self.topic_slug === 'NV') {
            var enso_selected;
            var el_nino_selected;
            var la_nina_selected;
            enso_selected =  jQuery('.figure_viewer_select.mode_of_variability option:selected').hasClass ('enso');
            el_nino_selected = jQuery('.figure_viewer_select.graphing_mode option:selected').hasClass ('el_nino');
            la_nina_selected = jQuery('.figure_viewer_select.graphing_mode option:selected').hasClass ('la_nina');
            if (enso_selected) {
                self.enable_an_option('el_nino');
                self.enable_an_option('la_nina');
            }
            else {
                self.disable_an_option('el_nino');
                self.disable_an_option('la_nina');
                if (el_nino_selected || la_nina_selected) {
                    jQuery('.figure_viewer_select.graphing_mode').val(0);
                }
            }
            if (!el_nino_selected && !la_nina_selected) {
                jQuery('.figure_viewer_select.year').val(0);
            }
        }
    },

    disable_an_option: function (the_class) {
            jQuery('.figure_viewer_select option.' + the_class ).attr('disabled','disabled');
    },
    enable_an_option: function (the_class) {
            jQuery('.figure_viewer_select option.' + the_class ).removeAttr('disabled');
    },
    


    extraCleanup: function () {
        // Sorry, only found out about this functionality really late, so I'm just tacking it on.
        "use strict";
        var self = this;
        var la_nina_years = ['1988', '1999', '2010'];
        var el_nino_years = ['1982', '1986', '1997'];

        if (self.topic_slug === 'NV') {
            var el_nino_selected;
            var la_nina_selected;
            el_nino_selected = jQuery('.figure_viewer_select.graphing_mode option:selected').hasClass ('el_nino');
            la_nina_selected = jQuery('.figure_viewer_select.graphing_mode option:selected').hasClass ('la_nina');
            if (el_nino_selected || la_nina_selected) {
                jQuery('.figure_viewer_select.year').show();
                if (el_nino_selected) {
                    jQuery.map(el_nino_years, function (a) {self.enable_an_option(a);});
                }
                else {
                    jQuery.map(el_nino_years, function (a) {self.disable_an_option(a);});
                }
                if (la_nina_selected) {
                    jQuery.map(la_nina_years, function (a) {self.enable_an_option(a);});
                }
                else { 
                    jQuery.map(la_nina_years, function (a) {self.disable_an_option(a);});
                }
            } else {
                // set year to null:
                jQuery('.figure_viewer_select.year').hide();
            }
        }
    },

    editCopy: function() {
        "use strict";
        var self = this;
        window.open(self.currentState.absolute_url, '', '');
        return false;
    },


    showHelp: function() {
        "use strict";
        var self = this;
        jQuery('.help_box').show();
        return false;
    },


    hideHelp: function() {
        "use strict";
        var self = this;
        jQuery('.help_box').hide();
        return false;
    },

    resetButtonPushed: function () {
        "use strict";
        var self = this;
        jQuery('.figure_viewer_select.season').val(0);
        jQuery('.figure_viewer_select.graphing_mode').val(0);
        jQuery('.figure_viewer_select.climate_variable').val(0);
        jQuery('.figure_viewer_select.graphing_mode').val(0);
        jQuery('.figure_viewer_select.year').val(0);
        jQuery('.figure_viewer_select.mode_of_variability').val(0);
        self.setAnimateButtonstoOff();
        self.inputsChanged();
        jQuery("div.show_hide_div.left_side").hide();
        return false;
    },


    render: function() {
        "use strict";
        var self = this;
        self.setUpMenus();
        self.menuChanged();
    }
});