FigureViewer.FigureViewerView = Backbone.View.extend({

    events: {
        "change .figure_viewer_select": "menuChanged",
        "click .reset_button"     : "resetButtonPushed",
        "click .help_icon"        : "showHelp",
        "click .help_ok_button"   : "hideHelp",
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
            "hideHelp"
        );

        jQuery ('#right-content').removeClass ('span9');
        // makes the div go back to its default (wider) width.
        self.getSettings();
    },

    getSettings: function() {
        "use strict";

        // Fetch the list of columns and scenarios from the back end.
        var self = this;
        jQuery.ajax({
            type: 'POST',
            url: '/_figure_viewer/settings/',
            data: {
            },
            dataType: 'json',
            error: function () {
                alert('There was an error.');
            },
            success: function (json, textStatus, xhr) {
                self.settings = json;
                console.log ('Got the settings');
                console.log (self.settings);
                self.render();
            }
        });
    },

    setUpMenus: function () {
        var self = this;
        var the_dropdown;
        the_dropdown = jQuery(".figure_viewer_select.season");
        for (var i=0; i < self.settings.season_inputs.length; i++)  {
            var the_item = self.settings.season_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
        /*
        the_dropdown = jQuery(".figure_viewer_select.graphing_mode");
        for (var i=0; i < self.settings.graphing_mode_inputs.length; i++)  {
            var the_item = self.settings.graphing_mode_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
        */
        the_dropdown = jQuery(".figure_viewer_select.year");
        for (var i=0; i < self.settings.year_inputs.length; i++)  {
            var the_item = self.settings.year_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
        the_dropdown = jQuery(".figure_viewer_select.climate_variable");
        for (var i=0; i < self.settings.climate_variable_inputs.length; i++)  {
            var the_item = self.settings.climate_variable_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
    },

    findCurrentState: function () {
        //console.log ("FIND CURRENT STATE")

        var self = this;
        console.log (self.settings);
        var self = this;
        var theSeason       = parseInt(jQuery ('.figure_viewer_select.season').val())        || null;
        var theGraphingMode = parseInt(jQuery ('.figure_viewer_select.graphing_mode').val()) || null;
        var theCLimateVariable  = parseInt(jQuery ('.figure_viewer_select.climate_variable').val())          || null;
        //var theAnimate         = parseInt(jQuery ('.figure_viewer_select.animate').val())          || null;
        var theYear         = parseInt(jQuery ('.figure_viewer_select.year').val())          || null;

        // do we know how to deal with this particular combination of inputs?


        var inputFinder = function (inputCombination) { 
            return (
                (inputCombination.season_input_id                    ==  theSeason       ) &&
                (inputCombination.graphing_mode_input_id             ==  theGraphingMode ) &&
                (inputCombination.year_input_id                      ==  theYear         )
            );
        }
        var inputCombination = _.find (self.settings.input_combinations, inputFinder);
        if (typeof (inputCombination) === "undefined") {
            // No, we don't. Kthxbye.
            alert ("ERROR: That input combination was not found.");
            return;
        }

        // Yes, we do.
        var stateId = inputCombination.activity_state_id;
        var theState = _.find (self.settings.activity_states, function (st) { return (st.id == stateId)});
        if (typeof (theState) === "undefined") {
            alert ("ERROR: That input combination was not found.");
            return;
        }

        // theState has everything we need to know about decorating the page accordingly.
        self.currentState = theState;
        console.log (theState);
        return theState;

    },

    menuChanged: function () {
        "use strict";
        var self = this;
        console.log ("MenuChanged;");

        var theState = self.findCurrentState();
        if (theState.image_path === '') {
            jQuery ('.figure_viewer_graph' ).replaceWith('<img class="figure_viewer_graph">');
        }
        else {
            jQuery ('.figure_viewer_graph' ).attr("src", theState.image_path);
        }
        /*
        if (theState.image_path === '') {
            jQuery ('.figure_viewer_color_key' ).replaceWith('<img class="figure_viewer_color_key">');
        }
        else {
            jQuery ('.figure_viewer_color_key' ).attr("src", theState.legend_path);
        }
        */
        /*
        jQuery ('.figure_viewer_graph_title')         .html (theState.graph_title);
        jQuery ('.figure_viewer_graph_y_axis')        .html (theState.y_scale_title);
        jQuery ('.explanation_copy')              .html (theState.text);

        jQuery ('.variance .percent_trend')       .html (theState.percent_trend        );
        jQuery ('.variance .percent_interdecadal').html (theState.percent_interdecadal );
        jQuery ('.variance .percent_interannual') .html (theState.percent_interannual  );

        jQuery ('.year_data .year')               .html (theState.year                 );
        jQuery ('.year_data .trend')              .html (theState.year_trend           );
        jQuery ('.year_data .decadal')            .html (theState.year_decadal         );
        jQuery ('.year_data .interannual')        .html (theState.year_interannual     );
        jQuery ('.year_data .sum')                .html (theState.year_sum             );
        jQuery ('.year_data .standard_dev')       .html (theState.year_percentile      );
        */

        /*
        if (theState.show_year_details == false) {
            jQuery ('.show_hide_div.year_details')      .hide ();
        } else {
            jQuery ('.show_hide_div.year_details')      .show ();
        }

        if (theState.show_left_side == false) {
            jQuery ('.show_hide_div.left_side')      .hide ();
        } else {
            jQuery ('.show_hide_div.left_side')      .show ();
        }

        if (jQuery('.edit_this_state').length > 0 ) {
            jQuery('.edit_this_state')[0].href = theState.absolute_url
        }
        */

            /*
        if (theState.climate_impact) {
            var climateImpactLabels = {

                extremely_wet : 'Extremely Wet',
                wet           : 'Wet',
                normal        : 'Normal',
                dry           : 'Dry',
                extremely_dry : 'Extremely Dry',
            }
            
            jQuery ("#year_for_highlight_rectangle") .attr("class", 'year_' + theState.year);
            jQuery ("#impact_level")                 .attr("class", theState.climate_impact);
            jQuery ('.impact_bubble_title').html (climateImpactLabels[theState.climate_impact])
            
        }
        */
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
        console.log ("Starting rendering")
        console.log (self.settings);
        var self = this;
        self.setUpMenus();
        self.menuChanged();
        self.showHelp();
        console.log ("Done rendering")
    },


});