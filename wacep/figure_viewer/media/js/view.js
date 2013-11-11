FigureViewer.FigureViewerView = Backbone.View.extend({

    events: {
        "change .figure_viewer_select": "menuChanged",

        "change .figure_viewer_radio":  "menuChanged",


        "click .reset_button"     : "resetButtonPushed",
        "click .help_icon"        : "showHelp",
        "click .help_ok_button"   : "hideHelp",
        "click .edit_this_state"  : "editCopy"
    },

    initialize: function(options) {
        "use strict";
        var self = this;
        _.bindAll(this ,
            "render",
            "getSettings",
            "setUpMenus",
            "menuChanged",
            "resetButtonPushed",
            "showHelp",
            "hideHelp",
            "editCopy"
        );

        jQuery ('#right-content').removeClass ('span9');
        // makes the div go back to its default (wider) width.
        self.getSettings();
    },

    getSettings: function() {
        "use strict";

        // Fetch the list of columns and scenarios from the back end.
        var self = this;
        var topic_slug = jQuery('.topic_slug').html();
        jQuery.ajax({
            type: 'POST',
            url: '/_figure_viewer/settings/' + topic_slug + '/',
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
        console.log (inputs);
        var the_dropdown = jQuery(css_class);
        for (var i=0; i < inputs.length; i++)  {
            var the_item = inputs[i];
            item_class = the_item.name.replace(/ /g, "_").toLowerCase()
            the_dropdown.append(jQuery('<option class="' + item_class +  '"></option>').val(the_item.id).html(the_item.name));
        }
    },

    setUpMenus: function () {
        var self = this;
        self.set_up_menu (".figure_viewer_select.season",              self.settings.season_inputs);
        self.set_up_menu (".figure_viewer_select.mode_of_variability", self.settings.mode_of_variability_inputs);
        self.set_up_menu (".figure_viewer_select.graphing_mode",       self.settings.graphing_mode_inputs);
        self.set_up_menu (".figure_viewer_select.year",                self.settings.year_inputs);
        self.set_up_menu (".figure_viewer_select.climate_variable",    self.settings.climate_variable_inputs);
    },

    findCurrentState: function () {

        var self = this;
        var theSeason                        = parseInt(jQuery ('.figure_viewer_select.season').val())        || null;
        var theGraphingMode                  = parseInt(jQuery ('.figure_viewer_select.graphing_mode').val()) || null;
        var theClimateVariable               = parseInt(jQuery ('.figure_viewer_select.climate_variable').val())       || null;
        var theYear                          = parseInt(jQuery ('.figure_viewer_select.year').val())          || null;
        var theModeOfVariability             = parseInt(jQuery ('.figure_viewer_select.mode_of_variability').val())   || null;


        //var theAnimation         = parseInt(jQuery ('.figure_viewer_radio.animate').val())          || null;
        var theAnimation = null;
        if (jQuery ('.figure_viewer_radio:checked').length > 0) {
            var theAnimation         = parseInt(jQuery ('.figure_viewer_radio:checked')[0].value)         || null;
        }

        // do we know how to deal with this particular combination of inputs?


        var inputFinder = function (inputCombination) { 
            return (
                (inputCombination.season_input_id                    ==  theSeason            ) &&
                (inputCombination.climate_variable_input_id          ==  theClimateVariable   ) &&
                (inputCombination.animation_input_id                 ==  theAnimation         ) &&
                (inputCombination.mode_of_variability_input_id       ==  theModeOfVariability ) &&
                (inputCombination.graphing_mode_input_id             ==  theGraphingMode      ) &&
                (inputCombination.year_input_id                      ==  theYear              )
            );
        }


        var inputCombination = _.find (self.settings.input_combinations, inputFinder);


        if (typeof (inputCombination) === "undefined") {
            // No, we don't. Kthxbye.
            alert ("ERROR: That input combination was not found.");
            return;
        }
        console.log (inputCombination);
        // Yes, we do.
        var stateId = inputCombination.activity_state_id;
        var theState = _.find (self.settings.activity_states, function (st) { return (st.id == stateId)});


        console.log (theState);
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
        var theState = self.findCurrentState();
        console.log (theState);
        if (theState.image_path === '') {
            console.log ('No image found.')
            jQuery ('.figure_viewer_graph' ).replaceWith('<img class="figure_viewer_graph">');
        }
        else {
            console.log (theState.image_path);
            jQuery ('.figure_viewer_graph' ).attr("src", theState.image_path);
            jQuery ('.show_hide_div.left_side')      .show ();

        }
        if (theState.color_bar === '') {
            console.log ('No colorbar image found.')
            jQuery ('.figure_viewer_color_bar' ).replaceWith('<img class="figure_viewer_color_bar">');
        }
        else {
            console.log ('Yes colorbar image found.')
            jQuery ('.figure_viewer_color_bar' ).attr("src", theState.color_bar);
        }
        
        jQuery ('.explanation_copy')         .html (theState.text);
        jQuery ('.source_copy')              .html (theState.source);

    },

    editCopy: function() {
        "use strict";
        var self = this;
        window.open(self.currentState.absolute_url, 'times', 'times 2');
    },


    showHelp: function() {
        "use strict";
        var self = this;
        jQuery('.help_box').show();
    },


    hideHelp: function() {
        "use strict";
        var self = this;
        jQuery('.help_box').hide();
    },

    resetButtonPushed: function () {
        "use strict";
        var self = this;
        jQuery('.figure_viewer_select.season').val(0)
        jQuery('.figure_viewer_select.graphing_mode').val(0)
        jQuery('.figure_viewer_select.year').val(0)
        self.menuChanged();
    },

    render: function() {
        "use strict";
        var self = this;
        var self = this;
        self.setUpMenus();
        self.menuChanged();
        self.showHelp();
    },


});