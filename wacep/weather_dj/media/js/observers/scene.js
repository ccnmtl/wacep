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

    update_div ('precipitation', info['precipitation'], jQuery('.scene_div.precipitation'));
    update_div ('groundwater',   info['groundwater'],   jQuery('.scene_div.groundwater'  ));
    update_div ('streamflow',    info['streamflow'],    jQuery('.scene_div.streamflow'   ));
    update_div ('runoff',        info['runoff'],        jQuery('.scene_div.runoff'       ));

    //arrows:
    update_div ('infiltration',      a * info['precipitation'],        jQuery('.scene_div.infiltration'       ));
    update_div ('outflow',           c * info['groundwater'],          jQuery('.scene_div.outflow'       ));


    update_div ('evapotranspiration_1',           b * info['precipitation'],          jQuery('.scene_div.evapotranspiration_1'       ));
    update_div ('evapotranspiration_2',           b * info['precipitation'],          jQuery('.scene_div.evapotranspiration_2'       ));



}

function update_div(label, number, jq_obj) {
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

}