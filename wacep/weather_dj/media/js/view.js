WeatherDJ.WeatherDJView = Backbone.View.extend({
    events: {
        "click .pause_button"   : "pause",
        "click .play_button"    : "play"
    },
    initialize: function(options) {
        "use strict";
        var self = this;
        self.initial_slider_values  =  {'a':0.2,  'b': 0.1, 'c':0.3, 'r': 0.2};
        self.paused = false;

        _.bindAll(this ,
            
            "render",
            "setUpEngine",
            "setUpSliders",
            "sliderValues",
            "loop",
            "pause",
            "play"
        );
        jQuery( "#tabs" ).tabs();
        self.setUpEngine();
        self.setUpSliders();
        self.play(); 
    },


    pause: function() {
        var self = this;
        jQuery ('.pause_button').hide()
        jQuery ('.play_button').show()
        self.paused = true;
    },


    play: function() {
        var self = this;
        jQuery ('.pause_button').show()
        jQuery ('.play_button').hide()
        self.paused = false;
        self.loop();
    },

    sliderValues: function() {
        var self = this;
        return {
            'a': jQuery('.slider.a').slider('value') / 100,
            'b': jQuery('.slider.b').slider('value') / 100,
            'c': jQuery('.slider.c').slider('value') / 100,
            'r': jQuery('.slider.r').slider('value') / 100
        }
    },

    loop: function () {
        var self = this;
        var outputs;
        var  i = 0;
        function loopTwo() {
            self.engine.setInputs(self.sliderValues());
            outputs = self.engine.generateOutputs();
            if (outputs['errors'] != null ) { 
                console.log (outputs['errors']);
                return;
            }
            var new_row = [
                outputs['date'].toDateString(),
                outputs['precipitation']      ,
                outputs['runoff']             ,
                outputs['groundwater']        ,
                outputs['streamflow']
            ];
            self.scrollingTable.addRow (new_row);
            self.scrollingTable.notify();
            i++;
            if (self.paused==false) {
                if (self.engine.getErrors() == null) {
                    loopOne();
                }
                else {
                    console.log (self.engine.getErrors());
                }
            }
        }

        function loopOne() {
            setTimeout( loopTwo , 800);
        }
        loopOne();
    },

    setUpSliders: function() {
        var self = this;
        jQuery( ".slider" ).slider(
            {
                  orientation: "horizontal",
                  range: "min",
                  animate: true
            }
        );
        // don't let a + b > 100
        function slide_a (event, ui) {
            if (ui.value + jQuery('.slider.b').slider('value') > 100) {
                event.preventDefault();
            }
        }
        function slide_b (event, ui) {
            if (ui.value + jQuery('.slider.a').slider('value') > 100) {
                event.preventDefault();
            }
        }
        jQuery ('.slider.a').slider ({
            'value': self.initial_slider_values['a'] * 100,
            'slide' : slide_a
        });
        jQuery ('.slider.b').slider ({
            'value': self.initial_slider_values['b'] * 100,
            'slide' : slide_b
         });
        jQuery ('.slider.c').slider ({'value': self.initial_slider_values['c'] * 100 });
        jQuery ('.slider.r').slider ({'value': self.initial_slider_values['r'] * 100 });
    },

    setUpEngine: function () {
        var self = this;
        "use strict";
        self.engine = new WeatherDJEngine();
        self.engine.setInputs(self.initial_slider_values);
        columnLabels = ['date', 'precipitation', 'runoff', 'groundwater', 'streamflow'];
        self.scrollingTable =  new ScrollingTable(columnLabels);
        self.table = new Table().hitch (self.scrollingTable);
        self.graph = new Graph().hitch (self.scrollingTable);
        self.scene = new Scene().hitch (self.scrollingTable);
    },


});