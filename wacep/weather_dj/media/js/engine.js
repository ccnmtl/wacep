importPackage(java.lang);

var WeatherDJCore = (function() {
	"use strict";
    // settings:
    var max_rain = 0.4;

    // inputs
    var a; // Fraction of rainwater that enters the ground per tick.
    var b; // Fraction of rainfall that re-enters the atmosphere through evapo-transpiration per tick.
    var c; // Fraction of groundwater that enters the stream channel per tick.
    var r = 0.2; // rain probability per tick.

    // outputs
    var precipitation;
    var runoff;
    var groundwater;
    var streamflow;
    var errors; // should be null

    // constructor
    function WeatherDJCore(){
	"use strict";
    	groundwater = 1.0;
    };

    WeatherDJCore.prototype.getRain = function () {
	"use strict";
	var it_rained = (Math.random() < r);
	if ( it_rained) {
	    return 	Math.random() * max_rain;
	}
	else {
	    return 0.0;
	}
    }
    
    
    WeatherDJCore.prototype.tick = function() {
	"use strict";
	if (errors)  {
	    return;
	}
	
        precipitation = this.getRain();
        var old_groundwater = groundwater;
        runoff      = precipitation * (1-a-b);
        streamflow  = runoff+(c *old_groundwater);
        groundwater = (old_groundwater * (1-c))+(a*precipitation);
    };
    
    
    WeatherDJCore.prototype.validate = function() {
        if (a + b > 1.0) {
            errors = 'a + b must be less than 1.0';
        }
        if (a > 1.0) {
            errors = 'c must be less than 1.0';
        }
        if (b > 1.0) {
            errors = 'c must be less than 1.0';
        }
        if (c > 1.0) {
            errors = 'c must be less than 1.0';
        }
        if (r > 1.0) {
            errors = 'r must be less than 1.0';
        }
	
    }
    
    WeatherDJCore.prototype.setInputs = function(values) {
	"use strict";
        a = values ['a'];
        b = values ['b'];
        c = values ['c'];
        r = values ['r'];
	this.validate();
       if (errors) {
            return;
        }
    };
    
    WeatherDJCore.prototype.getOutputs= function() {
	"use strict";
	this.tick();
	if (errors){
	    return {'errors': errors};
	}
        return {
            'precipitation': precipitation  ,
            'runoff'       : runoff         ,
            'groundwater'  : groundwater    ,
            'streamflow'   : streamflow     ,
            'errors'	   : errors         
        };
    };
    
    return WeatherDJCore;
})();


var ScrollingTable = (function() {
    "use strict";
    // settings:
    var numRows = 3;
    var columnTitles = [];
    var rows;

    // constructor
    function ScrollingTable(_columnTitles){
	"use strict";
    	columnTitles = _columnTitles;
	rows = new Array (numRows);
    };

    ScrollingTable.prototype.addRow = function (row) {
	"use strict";
	if (row.length != columnTitles.length) {
	    return;
	}
	delete rows [0];
	for (var i=1;i<numRows;i++) { 
	    rows[i-1] = rows [i]
	}
	rows[numRows-1] = row;
    }

    ScrollingTable.prototype.getContents= function() {
	"use strict";
	return rows;
    }

    return ScrollingTable;
})();



////////////////
//testing:

function log(str) {
    "use strict";
    System.out.println(str);
}

function main() {
    "use strict";
    var weatherDJ = new WeatherDJCore();
    weatherDJ.setInputs({'a':0.2,  'b': 0.1, 'c':0.3, 'r': 0.4});
    var t = new ScrollingTable(['precipitation', 'runoff', 'groundwater', 'streamflow'])
    for (var i=0;i<30;i++) { 
	outputs = weatherDJ.getOutputs();
	t.addRow ( [
	    outputs['precipitation'],
	    outputs['runoff'],
	    outputs['groundwater'],
	    outputs['streamflow']
	]);
    }
    log (JSON.stringify (t.getContents(), null, 4));
}

main();
