var WeatherDJEngine = (function() {
	"use strict";
    // settings:
    var max_rain = 5.0;

    // inputs
    var a; // Fraction of rainwater that enters the ground per tick.
    var b; // Fraction of rainfall that re-enters the atmosphere through evapo-transpiration per tick.
    var c; // Fraction of groundwater that enters the stream channel per tick.
    var r; // rain probability per tick.

    // outputs
    var precipitation;
    var runoff;
    var groundwater;
    var streamflow;
    var date;
    var errors; // should be null

    // constructor
    function WeatherDJEngine() {
        groundwater = 1.0;
        date = new Date();
    }

    WeatherDJEngine.prototype.getRain = function () {
        var it_rained = (Math.random() < r);
        if (it_rained) {
            return Math.random() * max_rain;
        } else {
            return 0.0;
        }
    };
        
    WeatherDJEngine.prototype.getErrors = function() {
        return errors;
    };

    WeatherDJEngine.prototype.incrementClock = function() {
        date.setDate (date.getDate() + 1);
    };
    
    WeatherDJEngine.prototype.tick = function() {
        if (errors)  {
            return;
        }
	
        precipitation = this.getRain();
        var old_groundwater = groundwater;
        runoff      = (1-a-b) * precipitation;
        streamflow  = runoff+(c *old_groundwater);
        groundwater = (1-c) * old_groundwater  + a * precipitation;
        this.incrementClock();
    };
    
    WeatherDJEngine.prototype.validate = function() {
        errors = null;

        if (a + b > 1.0) {
            errors = 'a + b must be less than 1.0';
            return;
        }
        if (a > 1.0) {
            errors = 'c must be less than 1.0';
            return;
        }
        if (b > 1.0) {
            errors = 'c must be less than 1.0';
            return;
        }
        if (c > 1.0) {
            errors = 'c must be less than 1.0';
            return;
        }
        if (r > 1.0) {
            errors = 'r must be less than 1.0';
            return;
        }
        errors = null;
    };
    
    WeatherDJEngine.prototype.setInputs = function(values) {
        a = values.a;
        b = values.b;
        c = values.c;
        r = values.r;
        this.validate();
        if (errors) {
            return;
        }
    };
    
    WeatherDJEngine.prototype.generateOutputs= function() {
        this.tick();
        if (errors) {
            return {'errors': errors};
        }
        return {
            'date': date,
            'precipitation': precipitation,
            'runoff': runoff,
            'groundwater': groundwater,
            'streamflow': streamflow,
            'errors': errors
        };
    };



        
    return WeatherDJEngine;
})();
