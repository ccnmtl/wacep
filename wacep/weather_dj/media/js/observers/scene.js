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


    var wetness = info['groundwater'] * 50;
    this.unsat_soil_ellipse.animate().move(-600, - (500 + wetness))

    var water_level = info['streamflow'] * 50;
    this.river.animate().move (0,400 - water_level);

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

function update_div(label, number, jq_obj) {

    /*
    if (label == 'precipitation') {
        jq_obj.width (number * 50);
    }

    if (label == 'groundwater') {
        jq_obj.height (number * 50);
    }

    if (label == 'streamflow') {
        jq_obj.height (number * 50);
    }

    if (label == 'runoff') {
        jq_obj.height (number * 50);
    }

    if (label == 'infiltration') {
        jq_obj.height (number * 50);
    }

    if (label == 'outflow') {
        jq_obj.height (number * 50);
    }

    if (label == 'evapotranspiration_1') {
        jq_obj.height (number * 50);
    }

    if (label == 'evapotranspiration_2') {
        jq_obj.height (number * 50);
    }
    */
}

Scene.prototype.prepareDOM = function () {
    "use strict";

    window.draw = SVG (jQuery('.scene')[0]);

    this.sky = draw.rect(800, 600).move (0,-200).fill ('#2af');
    this.river = draw.rect(800, 600).move (0,400).fill ('#26a');


    //this.goat = draw.rect(800, 600).move (0,-200)

    this.saturated_soil_background = draw.image('/hydrologic_cycle/media/img/mask_1.jpg');
    this.saturated_soil_background.size(800, 800).y(-140);
    this.big_rect = draw.rect(800, 600).move (0,-200).fill ('#654').maskWith (this.saturated_soil_background);




    this.the_mask = draw.image('/hydrologic_cycle/media/img/mask_1.jpg');
    this.the_mask.size(800, 800).y(-140);


    this.unsat_soil_ellipse =    draw.ellipse(2000,900);

    var initial_groundwater = 0; // should actually be initial value of groundwater.
    var wetness = initial_groundwater  * 50;
    this.unsat_soil_ellipse.move(-600, - (500 + wetness));
    var saturated_soil = this.unsat_soil_ellipse.maskWith(this.the_mask);
    saturated_soil.fill ('#a98');

    
    
    //this.blarg = draw.image('/hydrologic_cycle/media/img/mask_1.jpg').size(800, 800).y(-140).fill ('#fff');
    
    /*
    this.mask = draw.rect(600, 100).move(0, 50).fill('#000');
    
    this.goat_1 = draw.rect(100, 600).move(50, 0).fill('#055');
    this.goat   = draw.rect(100, 600).move(50, 0).fill('#000');
    
    thing_1 = this.goat.clipWith (this.mask);
    thing_2 = this.goat_1.clipWith (thing_1)
    */

    
}