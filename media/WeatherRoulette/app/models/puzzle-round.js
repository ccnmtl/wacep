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

export default PuzzleRound;
