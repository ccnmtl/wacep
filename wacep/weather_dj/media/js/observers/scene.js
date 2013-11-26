function Scene ( ) {}
Scene.prototype = new Observer();

Scene.prototype.update = function ( ) {
    "use strict";

    var info = this.getSubject().getLatestInfo();

    var a = jQuery('.slider.a').slider('value') / 100;
    var b = jQuery('.slider.b').slider('value') / 100;
    var c = jQuery('.slider.c').slider('value') / 100;
    var r = jQuery('.slider.r').slider('value') / 100;


    this.unsaturated_soil.animate().move(-600, - (500 + info['groundwater'] * 50))


    var river_angle = Math.ceil((Math.random() - 0.5));
    var river_level = 400 - info['streamflow'] * 50;
    this.river.animate().move (0,river_level).rotate(river_angle);

    var boat_angle = Math.ceil(10 * (Math.random() - 0.5));
    this.boat.animate().move (400 + (Math.random() * 10), river_level - 90).rotate( boat_angle );



    this.rain_rect.animate().attr({ width: (  info['precipitation'] * 50)})

    var outflow = Math.floor (c * info['groundwater'] * 10 / 3.0);
    this.changeArrow (this.arrows['outflow'], outflow, this.arrowSettings.outflow);

    var infiltration = Math.floor(a * info['precipitation'] * 2.0);
    this.changeArrow (this.arrows['infiltration'], infiltration, this.arrowSettings.infiltration);

    var evapotranspiration =  Math.floor (b * info['precipitation'] * 2);

    this.changeArrow (this.arrows['evapotranspiration_1'], evapotranspiration, this.arrowSettings.evapotranspiration_1);
    this.changeArrow (this.arrows['evapotranspiration_2'], evapotranspiration, this.arrowSettings.evapotranspiration_2);

    var runoff = Math.floor (info['runoff'] * 2);
    this.changeArrow (this.arrows['runoff'], runoff, this.arrowSettings.runoff);

}


Scene.prototype.prepareDOM = function () {
    "use strict";
    window.draw = SVG (jQuery('.scene')[0]);


    this.scene_settings = {
        'sky' : {
            'size': {
                'x':800,
                'y':600
            },
            'position': {
                'x':0,
                'y':-200
            },
            'color': '#2af'
        },

        'sun' : {
            'radius':100,
            'position': {
                'x': 680,
                'y': 30
            },
            'color': 'yellow'
        },

        'boat' : {
            'position': {
                'x': 400,
                'y': 300
            }
        },

        'river' : {
            'size': {
                'x':800,
                'y':600
            },
            'position': {
                'x':0,
                'y':400
            },
            'color': 'blue'
        },
        'tree' : {
            'size': {
                'x':200,
                'y':200
            },
            'position': {
                'x':570,
                'y':80
            }
        },
        'cloud' : {
            'size': {
                'x':200,
                'y':200
            },
            'position': {
                'x':100,
                'y':0
            }
        },
        'grass_mask' : {
            'size': {
                'x':800,
                'y':800
            },
            'position': {
                'x':  0,
                'y':-140
            }
        },
        'grass' : {
            'size': {
                'x':800,
                'y':800
            },
            'position': {
                'x':  0,
                'y':-200
            },
            'color': '#5d5'
        },

        'saturated_soil_mask' : {
            'size': {
                'x':800,
                'y':800
            },
            'position': {
                'x':  0,
                'y':  -140
            }
        },

        'saturated_soil_rect' : {
            'size': {
                'x':800,
                'y':800
            },
            'position': {
                'x':  0,
                'y':-200
            },
            'color': '#654'
        },

        'saturated_soil_ellipse' : {
            'size': {
                'x':2000,
                'y':900
            },
            'position': {
                'x':  -600,
                'y': -500
            },
            'color': '#a98'
        },

        'rain_rect' : {
            'size': {
                'x':100,
                'y':600
            },
            'position': {
                'x':  180,
                'y': -220
            },
            'color': 'lightblue'
        },

        'rain_mask' : {
            'size': {
                'x':800,
                'y':800
            },
            'position': {
                'x':  80,
                'y': -160
            }
        }
        ///

    }

    /*
    function my_move (what_to_move, position) {
        what_to_move.move (position.x, position.y);
    }
    */
    
    function my_rect (size) {
        return window.draw.rect (size.x, size.y);
    }

    function my_ellipse (size) {
        return window.draw.ellipse (size.x, size.y);
    }
    
    SVG.Shape.prototype.my_move = function (position) {
        return this.move (position.x, position.y);
    }

    SVG.Shape.prototype.my_size = function (position) {
        return this.size (position.x, position.y);
    }

    SVG.Shape.prototype.my_size_move = function (settings) {
        return this.size (settings.size.x, settings.size.y)
        .move (settings.position.x, settings.position.y);
    }


    var set = this.scene_settings;

    this.sky = my_rect(set.sky.size)
        .my_move ( set.sky.position)
        .fill (set.sky.color);
    this.sun = draw.circle(set.sun.radius)
        .my_move (set.sun.position)
        .fill (set.sun.color);
    this.boat = draw.image('/hydrologic_cycle/media/img/boat.png')
        .my_move (set.boat.position);
    this.river = my_rect(set.river.size)
        .my_move (set.river.position)
        .fill (set.river.color);
    this.tree = draw.image('/hydrologic_cycle/media/img/tree.png')
        .my_size_move (set.tree);
    this.cloud = draw.image('/hydrologic_cycle/media/img/cloud.png')
        .my_size_move (set.cloud);
    this.grass_mask = draw.image('/hydrologic_cycle/media/img/grass.jpg')
        .my_size_move (set.grass_mask);
    this.grass = my_rect(set.grass.size)
        .my_move ( set.grass.position)
        .fill (set.grass.color)
        .maskWith(this.grass_mask)
    this.saturated_soil_mask = draw.image('/hydrologic_cycle/media/img/mask_1.jpg')
        .my_size_move ( set.saturated_soil_mask);
    this.saturated_soil_rect = my_rect(set.saturated_soil_rect.size)
        .my_move ( set.saturated_soil_rect.position)
        .fill (set.saturated_soil_rect.color)
        .maskWith (this.saturated_soil_mask);
    this.unsaturated_soil_mask = draw.image('/hydrologic_cycle/media/img/mask_1.jpg')
        .my_size_move ( set.saturated_soil_mask);
    this.unsaturated_soil = my_ellipse(set.saturated_soil_ellipse.size)
        .my_move ( set.saturated_soil_ellipse.position)
        .maskWith(this.unsaturated_soil_mask)
        .fill (set.saturated_soil_ellipse.color);
    this.rain_mask = draw.image('/hydrologic_cycle/media/img/rain_mask.jpg')
        .my_size_move ( set.rain_mask)
        .rotate(-20);
    this.rain_rect = my_rect(set.rain_rect.size)
        .my_move (set.rain_rect.position)
        .fill (set.rain_rect.color)
        .rotate(20)
        .maskWith (this.rain_mask);


    this.arrowSettings = {
        'outflow':                  {'x': 180, 'y': 330, 'rotate': 95},
        'infiltration' :            {'x': 0,   'y': 200, 'rotate': 180},
        'runoff':                   {'x': 120, 'y': 220, 'rotate': 130},
        'evapotranspiration_1' :    {'x': 0,   'y': 100, 'rotate': 45},
        'evapotranspiration_2' :    {'x': 500, 'y': 100, 'rotate': 320}
    }


    //arrow for groundwater outflow:
    this.arrows = {};

    this.arrows['outflow']      = this.makeArrow(this.arrowSettings.outflow);
    this.arrows['infiltration'] = this.makeArrow(this.arrowSettings.infiltration);


    this.arrows['runoff'] =       this.makeArrow(this.arrowSettings.runoff);


    this.arrows['evapotranspiration_1'] = this.makeArrow(this.arrowSettings.evapotranspiration_1);
    this.arrows['evapotranspiration_2'] = this.makeArrow(this.arrowSettings.evapotranspiration_2);


}

Scene.prototype.makeArrow = function(settings){
    "use strict";
    var arrow_background = draw.rect(100, 100).move (settings.x,settings.y).fill ('blue');
    var arrow_shape = draw.image('/hydrologic_cycle/media/img/arrows/arrow_0.jpg').size(100, 100).move (settings.x,settings.y).rotate(settings.rotate);
    arrow_background.maskWith (arrow_shape);
    return arrow_background;
}

Scene.prototype.changeArrow = function(arrow, num, settings){
    "use strict";
    arrow.unmask();
    var new_arrow_shape = draw.image(this.pickArrowShape(num)).size(100, 100).move (settings.x,settings.y).rotate(settings.rotate);
    arrow.maskWith (new_arrow_shape);
}


Scene.prototype.pickArrowShape = function(num) {
    "use strict";
    var arrow_shapes = [

            '/hydrologic_cycle/media/img/arrows/arrow_0.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_1.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_2.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_3.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_4.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_5.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_6.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_7.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_8.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_9.jpg'
    ];
    if (num < 0) return arrow_shapes[0];
    if (num > 9) return arrow_shapes[9];

    return arrow_shapes[num];
}

