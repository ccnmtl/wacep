WeatherDJ.scene_settings = {
    // this is basically how much the river
    // and unsaturated soil go up and down.
    'vertical_range_pixels' : 50,

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
            'y':400 // this is the y coordinate of the bottom of the river.
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
            'x': -600,
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
    },

    'arrow_shapes' : [
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
    ],

    'arrows' : {
        'outflow':                  {'x': 180, 'y': 330, 'rotate': 95},
        'infiltration' :            {'x': 0,   'y': 200, 'rotate': 180},
        'runoff':                   {'x': 120, 'y': 220, 'rotate': 130},
        'evapotranspiration_1' :    {'x': 0,   'y': 100, 'rotate': 45},
        'evapotranspiration_2' :    {'x': 500, 'y': 100, 'rotate': 320}
    }
}