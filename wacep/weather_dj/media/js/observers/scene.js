function Scene ( ) {}
Scene.prototype = new Observer();

Scene.prototype.update = function ( ) {
    "use strict";

/*
    var precipitation;
    var runoff;
    var groundwater;
    var streamflow;
    var date;
    var errors; // should be null

    */

    var info = this.getSubject().getLatestInfo();

    var a = jQuery('.slider.a').slider('value') / 100;
    var b = jQuery('.slider.b').slider('value') / 100;
    var c = jQuery('.slider.c').slider('value') / 100;
    var r = jQuery('.slider.r').slider('value') / 100;


    this.unsat_soil_ellipse.animate().move(-600, - (500 + info['groundwater'] * 50))

    var river_level = 400 - info['streamflow'] * 50;
    this.river.animate().move (0,river_level);



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


/*
    update_div ('precipitation', info['precipitation'], jQuery('.scene_div.precipitation'));
    update_div ('groundwater',   info['groundwater'],   jQuery('.scene_div.groundwater'  ));
    update_div ('streamflow',    info['streamflow'],    jQuery('.scene_div.streamflow'   ));
    update_div ('runoff',        info['runoff'],        jQuery('.scene_div.runoff'       ));

    //arrows:
    update_div ('infiltration',      a * info['precipitation'],        jQuery('.scene_div.infiltration'       ));
    update_div ('outflow',           c * info['groundwater'],          jQuery('.scene_div.outflow'       ));


    update_div ('evapotranspiration_1',           b * info['precipitation'],          jQuery('.scene_div.evapotranspiration_1'       ));
    update_div ('evapotranspiration_2',           b * info['precipitation'],          jQuery('.scene_div.evapotranspiration_2'       ));
*/


}

Scene.prototype.prepareDOM = function () {
    "use strict";
    window.draw = SVG (jQuery('.scene')[0]);

    //backdrop:
    this.sky = draw.rect(800, 600).move (0,-200).fill ('#2af');
    this.sun = draw.circle(100).move (650,50).fill ('yellow');



    this.boat = draw.image('/hydrologic_cycle/media/img/boat.png').move (400, 300);
    this.river = draw.rect(800, 600).move (0,400).fill ('blue');

    //tree:
    this.tree = draw.image('/hydrologic_cycle/media/img/tree.png').size(200,200).move (530, 90);

    // cloud:
    this.cloud = draw.image('/hydrologic_cycle/media/img/cloud.png').size(200, 200).move (100, 0);

    // ubsaturated soil background:
    this.saturated_soil_background = draw.image('/hydrologic_cycle/media/img/mask_1.jpg');
    this.saturated_soil_background.size(800, 800).y(-140);
    this.big_rect = draw.rect(800, 600).move (0,-200).fill ('#654').maskWith (this.saturated_soil_background);

    // unsaturated soil ellipse
    this.the_mask = draw.image('/hydrologic_cycle/media/img/mask_1.jpg');
    this.the_mask.size(800, 800).y(-140);
    this.unsat_soil_ellipse =    draw.ellipse(2000,900);

    
    var initial_groundwater = 0; // should actually be initial value of groundwater.
    var wetness = initial_groundwater  * 50;
    this.unsat_soil_ellipse.move(-600, - (500 + wetness));
    var saturated_soil = this.unsat_soil_ellipse.maskWith(this.the_mask);
    saturated_soil.fill ('#a98');

    //rain
    this.rain_mask = draw.image('/hydrologic_cycle/media/img/rain_mask.jpg').size(800, 800).y(-140);
    this.rain_rect = draw.rect(100, 500).move (0,-200).fill ('lightblue')
    this.rain_rect.maskWith (this.rain_mask);



    this.arrowSettings = {
        'outflow':          {'x': 260, 'y': 340, 'rotate': 95},
        'infiltration' :    {'x': 100, 'y': 200, 'rotate': 180},

        'evapotranspiration_1' :    {'x': 300, 'y': 200, 'rotate': 340},
        'evapotranspiration_2' :    {'x': 500, 'y': 100, 'rotate': 320}
    }


    //arrow for groundwater outflow:
    this.arrows = {};

    this.arrows['outflow']      = this.makeArrow(this.arrowSettings.outflow);
    this.arrows['infiltration'] = this.makeArrow(this.arrowSettings.infiltration);


    this.arrows['evapotranspiration_1'] = this.makeArrow(this.arrowSettings.evapotranspiration_1);
    this.arrows['evapotranspiration_2'] = this.makeArrow(this.arrowSettings.evapotranspiration_2);


}

Scene.prototype.makeArrow = function(settings){
    "use strict";
    var arrow_background = draw.rect(100, 100).move (settings.x,settings.y).fill ('red');
    var arrow_shape = draw.image('/hydrologic_cycle/media/img/arrows/arrow_1.jpg').size(100, 100).move (settings.x,settings.y).rotate(settings.rotate);
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
            '/hydrologic_cycle/media/img/arrows/arrow_1.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_2.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_3.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_4.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_5.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_6.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_7.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_8.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_9.jpg'
        ,   '/hydrologic_cycle/media/img/arrows/arrow_10.jpg'
    ];
    if (num < 0) return arrow_shapes[0];
    if (num > 9) return arrow_shapes[9];

    return arrow_shapes[num];
}

