import DS from 'ember-data';

var PuzzleRound = DS.Model.extend({
    puzzle: DS.belongsTo('puzzle', {async: true}),
    year: DS.attr('number'),
    rainfallObservation: DS.attr('string'),
    belowForecast: DS.attr('number'),
    normalForecast: DS.attr('number'),
    aboveForecast: DS.attr('number'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),

    // Either 0, 1, or 2. Used for graphing.
    observationGraphValue: function() {
        var rainfallObservation = this.get('rainfallObservation');
        if (!rainfallObservation) {
            return -1;
        }

        var val = rainfallObservation.toLowerCase();

        if (val === 'dry') {
            return 0;
        } else if (val === 'normal') {
            return 1;
        } else if (val === 'wet') {
            return 2;
        } else {
            return -1;
        }
    }.property('rainfallObservation')
});

PuzzleRound.reopenClass({
    FIXTURES: [
        {
            id: 1,
            year: 1997,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 2,
            year: 1998,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 3,
            year: 1999,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 4,
            year: 2000,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 5,
            year: 2001,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 6,
            year: 2002,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 7,
            year: 1898,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 8,
            year: 1899,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 9,
            year: 1900,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 10,
            year: 1901,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 11,
            year: 1902,
            rainfallObservation: 'Wet',
            belowForecast: 10,
            normalForecast: 10,
            aboveForecast: 80,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
    ]
});

export default PuzzleRound;
