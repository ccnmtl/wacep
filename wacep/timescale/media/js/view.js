Timescale.TimescaleView = Backbone.View.extend({
    
    events: {
        "change .timescale_select": "menuChanged",
        "click .reset_button" : "resetButtonPushed"

        /*
        "click .done-button": "goToNextPhase",
        "click .previous_phase": "goToPreviousPhase",
        "click .change_scenario": "goToFirstPhase",
        "click .game-phase-help-button-div" : "showGamePhaseHelpBox",
        "click .help_box": "closeHelpBox",
        "click .add_a_row_button": "addARow",
        "click .wipe-table-button": "showWipeTableWarning",
        "click .wipe-table-confirm-button": "wipeTable",
        "click .wipe-table-cancel-button": "cancelWipeTable"
        */
    },
    /*
    phases: null,
    current_phase : null,
    */
    initialize: function(options) {
        "use strict";
        var self = this;
        _.bindAll(this ,
            "render",
            "getSettings",
            "finishInitialize",
            "setUpMenus",
            "menuChanged",
            "resetButtonPushed"
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
            url: '/_timescale/settings/',
            data: {
            },
            dataType: 'json',
            error: function () {
                alert('There was an error.');
            },
            success: function (json, textStatus, xhr) {
                self.settings = json;
                self.finishInitialize();
            }
        });
    },

    finishInitialize: function () {
        var self = this;
        self.setUpMenus();
    },


    setUpMenus: function () {
        var self = this;
        var the_dropdown;
        the_dropdown = jQuery(".timescale_select.season");
        for (var i=0; i < self.settings.season_inputs.length; i++)  {
            var the_item = self.settings.season_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
        the_dropdown = jQuery(".timescale_select.graphing_mode");
        for (var i=0; i < self.settings.graphing_mode_inputs.length; i++)  {
            var the_item = self.settings.graphing_mode_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
        the_dropdown = jQuery(".timescale_select.year");
        for (var i=0; i < self.settings.year_inputs.length; i++)  {
            var the_item = self.settings.year_inputs[i];
            the_dropdown.append(jQuery('<option></option>').val(the_item.id).html(the_item.name));
        }
    },

    findCurrentState: function () {
        var self = this;
        var theSeason       = parseInt(jQuery ('.timescale_select.season').val())        || null;
        var theGraphingMode = parseInt(jQuery ('.timescale_select.graphing_mode').val()) || null;
        var theYear         = parseInt(jQuery ('.timescale_select.year').val())          || null;

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
            alert ("ERROR: That input combination was not found.");
            return;
        }

        // yes we do.
        var stateId = inputCombination.activity_state_id;
        var theState = _.find (self.settings.activity_states, function (st) { return (st.id == stateId)});
        if (typeof (theState) === "undefined") {
            alert ("ERROR: That input combination was not found.");
            return;
        }
        // theState has everything we need to know about decorating the page accordingly.
        self.currentState = theState;
        return theState;
    },

    menuChanged: function () {
        var self = this;
        var theState = self.findCurrentState();
        console.log (JSON.stringify (theState));
        if (theState.image_path === '') {
            jQuery ('.timescale_graph' ).replaceWith('<img class="timescale_graph">');
        }
        else {
            jQuery ('.timescale_graph' ).attr("src", theState.image_path);
        }
        jQuery ('.explanation_copy').html (theState.text);


        jQuery ('.variance .percent_trend')       .html (theState.percent_trend        );
        jQuery ('.variance .percent_interdecadal').html (theState.percent_interdecadal );
        jQuery ('.variance .percent_interannual') .html (theState.percent_interannual  );
        jQuery ('.year_data .year')               .html (theState.year                 );


        jQuery ('.year_data .trend')              .html (theState.year                 );
        jQuery ('.year_data .decadal')            .html (theState.year_decadal         );
        jQuery ('.year_data .interannual')        .html (theState.year_interannual     );



    },

    resetButtonPushed: function () {
        var self = this;
        jQuery('.timescale_select.season').val(0)
        jQuery('.timescale_select.graphing_mode').val(0)
        jQuery('.timescale_select.year').val(0)
        self.menuChanged();
    },

    /*
    showGamePhaseHelpBox: function () {
        "use strict";
        var self = this;
        var phase_info = self.currentPhaseInfo();
        var the_template = jQuery('#logic-model-help-box').html();
        var title_copy = phase_info.name;
        if (title_copy === '' || title_copy === undefined ) {
            title_copy = 'Lorem ipsum';
        }
        var body_copy = phase_info.instructions;
        if (body_copy === '' || body_copy === undefined ) {
            body_copy = 'Lorem ipsum';
        }
        var the_data = {
            'help_title'  : title_copy,
            'help_body'   : body_copy
        };
        var the_html = _.template(the_template, the_data);
        jQuery( ".help_box" ).html (the_html);
        jQuery( ".help_box" ).show();
    },

    closeHelpBox : function() {
        "use strict";
        var self = this;
        jQuery('.help_box').hide();
        jQuery('.help_box').html('');
    },

    showWipeTableWarning : function () {
        "use strict";
        var self = this;
        jQuery ('.wipe-table-button').hide();
        jQuery ('.wipe-table-button-div').show();
    },

    wipeTable : function () {
        "use strict";
        var self = this;
        jQuery('.text_box').each(function (a, b) {b.value = ''; });
        self.columns.each (function (a) {
            var box_models = a.get('boxModels');
            for (var i=0; i < box_models.length; i++)  {
                box_models[i].set ({'contents': ''});
                box_models[i].set({'color_int': 0});
                box_models[i].trigger ('setColor');
                //box_models[i].set ({color_int: -1});
                //box_models[i].trigger ('nextColor');
            }
        });
        jQuery ('.wipe-table-button').show();
        jQuery ('.wipe-table-button-div').hide();
        self.current_phase = 1;
        self.current_number_of_rows = LogicModel.NUMBER_OF_ROWS_INITIALLY_VISIBLE;
        self.adjustRows();
        self.paintPhase();

    },

    cancelWipeTable : function () {
        "use strict";
        var self = this;
        jQuery ('.wipe-table-button').show();
        jQuery ('.wipe-table-button-div').hide();
    },

    checkEmptyBoxes : function() {
        "use strict";
        var self = this;
        self.ok_to_proceed = false;0
        var number_of_empty_active_columns = 0;
        self.columns.each (function (a) {
            var column_is_active = a.get ('active');
            var box_models = a.get('boxModels');
            if (column_is_active) {
                var column_is_empty = true;
                for (var i=0; i < box_models.length; i++)  {
                    if (box_models[i].get('contents').length > 0) {
                        column_is_empty = false;
                    }
                }
                if (column_is_empty) {
                    number_of_empty_active_columns = number_of_empty_active_columns + 1;
                    return;
                }
            }
        });

        jQuery('.done-button').hide();
        if (number_of_empty_active_columns  === 0) {
            if (self.current_phase != self.phases.length - 1) {
                jQuery('.active_column').last().find ('.done-button').show();
                jQuery('.active_column').last().find ('.done-button').addClass('active');
                self.ok_to_proceed = true;
            }
        }
        else {
            jQuery('.active_column').last().find ('.done-button').show();
            jQuery('.active_column').last().find ('.done-button').removeClass('active');
            self.ok_to_proceed = false;
        }
    },

    */
    /*
    setUpColors : function (colors) {
        "use strict";
        var self = this;
        self.colors = { colors: colors };
        self.columns.each (function (a) {
            var box_models = a.get('boxModels');
            for (var i=0;i<box_models.length;i++)  {
                box_models[i].set ({colors:colors, color_int: -1});
                box_models[i].trigger ('nextColor');
            }
         });
    },

    addARow: function() {
        "use strict";
        var self = this;
        self.current_number_of_rows = self.current_number_of_rows + 1;
        self.adjustRows();
        if ( self.current_number_of_rows === LogicModel.NUMBER_OF_ROWS_TOTAL) {
            jQuery ('.add_a_row_button').hide();
        }
    },

    adjustRows: function() {
        var self = this;
        "use strict";
        self.columns.each (function (c) {
            var box_models = c.get('boxModels');
            for (var i=0;i<box_models.length;i++)  {
                if (box_models[i].get ('row') <= self.current_number_of_rows) {
                    box_models[i].trigger ('showBox');
                }
                else {
                    box_models[i].trigger ('hideBox');
                }
            }
         });
    },

    setUpPhases : function() {
        "use strict";
        var self = this;
        if (typeof LogicModel.DEBUG_PHASE !== "undefined") {
            self.current_phase = LogicModel.DEBUG_PHASE;
        } else {
            self.current_phase = 0;
        }
    },

    currentPhaseInfo: function() {
        "use strict";
        var self = this;
        return self.phases[self.current_phase];
    },

    paintPhase: function() {
        "use strict";
        return;
        var self = this;
        var phase_info = self.currentPhaseInfo();
        if (phase_info.hasOwnProperty ('already_seen'))  {
            //console.log ("Already seen")
        }
        else {
            self.showGamePhaseHelpBox();
            phase_info.already_seen = true;
        }

        var active_columns_for_this_phase = self.columns_in_each_phase[phase_info.id];
        self.columns.each (function (col) {
            if (active_columns_for_this_phase !== undefined) {
                var whether_active = (active_columns_for_this_phase.indexOf (col.id) != -1 );
                col.set ({active: whether_active});
            }
            // default is true, btw.
        });
        self.columns.each (function (a) { a.trigger ('turnOnActiveBoxes'); });
        // set the #phase_container span so that
        // the CSS can properly paint this phase of the game.
        jQuery("#phase_container").attr("class", phase_info.css_classes);
        jQuery('.logic-model-game-phase-name').html(phase_info.name);

        if (self.current_phase === 0) {
            jQuery ('.previous_phase').hide();
            jQuery("li.previous").show();
            self.ok_to_proceed = true;
        } else {
            jQuery("li.previous").hide();
            jQuery ('.previous_phase').show();
        }


        
        if (self.current_phase == self.phases.length - 1) {
                jQuery("li.next").show();
            //jQuery ('.next_phase').hide();
        } else {
                jQuery("li.next").hide();
            //jQuery ('.next_phase').show();
        }
        
        // unhide the last active donebutton on the page:
        jQuery('.done-button').removeClass ('visible');


        // unhide the last active donebutton on the page:
        jQuery('.add_a_row_button').removeClass ('visible');
        jQuery('.active_column').first().find('.add_a_row_button').addClass('visible');

        if (self.current_phase !== 0) {
           self.checkEmptyBoxes();
        }
    },

    goToFirstPhase: function() {
        "use strict";
        var self = this;
        self.current_phase = 0;
        self.paintPhase();
    },

    goToNextPhase: function() {
        "use strict";
        var self = this;
        if (self.ok_to_proceed === false) {
            return;
        }
        self.current_phase = self.current_phase  + 1;
        self.paintPhase();
    },

    goToPreviousPhase: function() {
        "use strict";
        var self = this;
        jQuery("li.next, h1.section-label-header, li.previous").hide();
        self.current_phase = self.current_phase - 1;
        self.paintPhase();
    },
    */
    render: function() {
        "use strict";
        var self = this;
        console.log ("rendering.");

        //self.paintPhase();
    },



    /*
    onAddColumn: function(column) {
        "use strict";
        var self = this;
        var view = new LogicModel.ColumnView({
            model: column
        });
        view.parentView = self;

        view.boxes.bind("checkEmptyBoxes", self.checkEmptyBoxes);
        jQuery("div.logic-model-columns").append(view.el);
    },

    onAddScenario: function(scenario) {
        "use strict";
        var self = this;
        var view = new LogicModel.ScenarioView({
            model: scenario
        });
        view.LogicModelView = self;
        jQuery("div.logic-model-initial-scenario-list").append(view.el);
    }
*/
});