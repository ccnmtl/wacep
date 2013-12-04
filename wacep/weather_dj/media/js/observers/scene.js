function Scene ( ) {}

Scene.prototype = new Observer();


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

Scene.prototype.prepareDOM = function () {
    "use strict";

    function my_rect (size) {
        return window.draw.rect (size.x, size.y);
    }

    function my_ellipse (size) {
        return window.draw.ellipse (size.x, size.y);
    }

    this.scene_settings = WeatherDJ.scene_settings;


    window.draw = SVG (jQuery('.scene')[0]);
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
        .maskWith(this.grass_mask);

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

    this.arrows = {}
    this.arrows['outflow']              = this.makeArrow(set.arrows.outflow);
    this.arrows['infiltration']         = this.makeArrow(set.arrows.infiltration);
    this.arrows['runoff']               = this.makeArrow(set.arrows.runoff);
    this.arrows['evapotranspiration_1'] = this.makeArrow(set.arrows.evapotranspiration_1);
    this.arrows['evapotranspiration_2'] = this.makeArrow(set.arrows.evapotranspiration_2);


    this.label_settings = {
        'runoff' : {
            'x': 100,
            'y': 100
        }
    }
    this.labels = {}
    this.labels ['outflow'] = this.makeLabel (this.label_settings.runoff);


}

Scene.prototype.makeLabel = function (settings) {

    console.log ('goat');
}


Scene.prototype.update = function ( ) {
    "use strict";
    var info = this.getSubject().getLatestInfo();

    var a = jQuery('.slider.a').slider('value') / 100;
    var b = jQuery('.slider.b').slider('value') / 100;
    var c = jQuery('.slider.c').slider('value') / 100;
    var r = jQuery('.slider.r').slider('value') / 100;
    
    this.changeArrow ( 'infiltration',         [info['precipitation'], a,  3]);
    this.changeArrow ( 'evapotranspiration_1', [info['precipitation'], b , 3]);
    this.changeArrow ( 'evapotranspiration_2', [info['precipitation'], b,  3]);
    this.changeArrow ( 'outflow',              [info['groundwater'  ], c,  3]);
    this.changeArrow ( 'runoff',               [info['runoff'       ],     3]);

    var river_angle           = Math.ceil( 2 * (Math.random() - 0.5));
    var boat_angle            = Math.ceil(10 * (Math.random() - 0.5));
    var bottom_of_river_y     = this.scene_settings.river.position.y;
    var vertical_range_pixels = this.scene_settings.vertical_range_pixels;
    var unsaturated_soil_x    = this.scene_settings.saturated_soil_ellipse.position.x
    var unsaturated_soil_y    = this.scene_settings.saturated_soil_ellipse.position.y;
    var river_level           = bottom_of_river_y  - info['streamflow']  * vertical_range_pixels;
    var groundwater_level     = unsaturated_soil_y - info['groundwater'] * vertical_range_pixels;

    this.unsaturated_soil
        .animate()
        .move( unsaturated_soil_x , groundwater_level)

    this.river
        .animate()
        .move (0,river_level)
        .rotate(river_angle);

    this.boat
        .animate()
        .move (bottom_of_river_y + (Math.random() * 10), river_level - 90)
        .rotate( boat_angle );
    
    this.rain_rect
        .animate()
        .attr({ width: (  info['precipitation'] * vertical_range_pixels)})

}

Scene.prototype.makeArrow = function(settings){
    "use strict";
    var arrow_shape = draw
        .image(this.pickArrowShape(0))
        .size(100, 100)
        .move (settings.x,settings.y)
        .rotate(settings.rotate);

    var arrow = draw
        .rect(100, 100)
        .move (settings.x,settings.y)
        .fill (settings.color)
        .maskWith (arrow_shape);

    arrow.settings = settings;
    return arrow;
}

Scene.prototype.changeArrow = function(arrow_label, factors){
    "use strict";
    var arrow = this.arrows[arrow_label];
    var settings = arrow.settings;
    var product = Math.floor(_.reduce (factors, function(a, b) {return a * b}));

    var new_arrow_shape = draw
        .image(this.pickArrowShape(product))
        .size(100, 100)
        .move (settings.x,settings.y)
        .rotate(settings.rotate);

    arrow
        .unmask()
        .maskWith(new_arrow_shape);
}

Scene.prototype.pickArrowShape = function(num) {
    "use strict";
    var arrow_shapes = this.scene_settings.arrow_shapes;
    var last = arrow_shapes.length - 1;
    var i = num;
    if (num < 0)     { i = 0   }
    if (num > last)  { i = last}
    return arrow_shapes[i];
}


Scene.prototype.turnOnLabels = function () {

    console.log ('turning on labels')

}


Scene.prototype.turnOffLabels = function () {

    console.log ('turning off labels')

    
}