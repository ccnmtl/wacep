WeatherDJ.WeatherDJView = Backbone.View.extend({
    events: {
        "click .pause_button"   : "pause",
        "click .play_button"    : "play",
        "click .show_labels_button"  : "showLabels",
        "click .hide_labels_button"  : "hideLabels",
    },

    initialize: function(options) {
        var self = this;

        _.bindAll(this ,
            "setUpEngine",
            "setUpSliders",
            "sliderValues",
            "loop",
            "pause",
            "play",
            "showLabels",
            "hideLabels"
        );

        self.initial_slider_values  =  {'a':0.2,  'b': 0.1, 'c':0.3, 'r': 0.2};
        self.columnLabels = ['date', 'precipitation', 'runoff', 'groundwater', 'streamflow'];
        self.paused = true;
        jQuery("button.pause_button").hide();
        jQuery("#tabs").tabs();
        jQuery('.hide_labels_button').hide();
        self.setUpEngine();
        self.scrollingTable =  new ScrollingTable(self.columnLabels);
        self.table = new Table().hitch (self.scrollingTable);
        self.graph = new Graph().hitch (self.scrollingTable);
        self.scene = new Scene().hitch (self.scrollingTable);

        self.scene.sliderValues = self.sliderValues;

        self.setUpSliders();
    },

    loop: function () {
        "use strict";
        var self = this;

        var loop_functions = [
            function () {
                setTimeout( loop_functions[1] , 1200);
            },
            function() {
                if (self.paused) {
                    return;
                } 
                self.engine.setInputs(self.sliderValues());
                var outputs = self.engine.generateOutputs();
                if (outputs.errors != null ) { 
                    console.log (outputs.errors);
                    return;
                }
                var new_row = [
                    outputs.date.toDateString(),
                    outputs.precipitation,
                    outputs.runoff,
                    outputs.groundwater,
                    outputs.streamflow
                ];
                self.scrollingTable.addRow (new_row);
                self.scrollingTable.notify();
                if (self.engine.getErrors() == null) {
                    loop_functions[0]();
                } else {
                    console.log (self.engine.getErrors());
                }
            }
        ];
        loop_functions[0]();
    },

    play: function() {
        "use strict";
        var self = this;
        jQuery('.pause_button').show();
        jQuery('.play_button').hide();
        self.paused = false;
        self.loop();
    },

    pause: function() {
        "use strict";
        var self = this;
        jQuery('.pause_button').hide();
        jQuery('.play_button').show();
        self.paused = true;
    },


    showLabels: function() {
        "use strict";
        var self = this;
        jQuery('.show_labels_button').hide();
        jQuery('.hide_labels_button').show();
        self.scene.turnOnLabels();
    },

    hideLabels: function() {
        "use strict";
        var self = this;
        jQuery('.hide_labels_button').hide();
        jQuery('.show_labels_button').show();
        self.scene.turnOffLabels();
    },


    sliderValues: function() {
        "use strict";
        var self = this;
        return {
            'a': jQuery('.slider.a').slider('value') / 100,
            'b': jQuery('.slider.b').slider('value') / 100,
            'c': jQuery('.slider.c').slider('value') / 100,
            'r': jQuery('.slider.r').slider('value') / 100
        };
    },

    setUpSliders: function() {
        "use strict";
        var self = this;
        jQuery( ".slider" ).slider(
            {
                  orientation: "horizontal",
                  range: "min",
                  animate: true
            }
        );        
        function updatePerviousnessPlusEvapoTranspiration(value) {
            // update the total value
            jQuery("#perviousness_plus_evapotranspiration").html(Math.round(value));            
        }
        // don't let a + b > 100
        function slide_a (event, ui) {
            var bValue = jQuery('.slider.b').slider('value');
            if (ui.value +  bValue > 100) {
                event.preventDefault();
            } else {
                updatePerviousnessPlusEvapoTranspiration(ui.value + bValue);                
            }
        }
        function slide_b (event, ui) {
            var aValue = jQuery('.slider.a').slider('value');
            if (ui.value + aValue > 100) {
                event.preventDefault();
            } else {
                updatePerviousnessPlusEvapoTranspiration(ui.value + aValue);                
            }
        }
        jQuery('.slider.a').slider ({
            'value': self.initial_slider_values.a * 100,
            'slide' : slide_a
        });
        jQuery('.slider.b').slider ({
            'value': self.initial_slider_values.b * 100,
            'slide' : slide_b
         });
        jQuery('.slider.c').slider({'value': self.initial_slider_values.c * 100 });
        jQuery('.slider.r').slider({'value': self.initial_slider_values.r * 100 });
        
        updatePerviousnessPlusEvapoTranspiration(
                (self.initial_slider_values.a + self.initial_slider_values.b) * 100);
    },

    setUpEngine: function () {
        "use strict";
        var self = this;
        self.engine = new WeatherDJEngine();
        self.engine.setInputs(self.initial_slider_values);
    },

});