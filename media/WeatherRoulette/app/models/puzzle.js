import DS from 'ember-data';
import Em from 'ember';

var Puzzle = DS.Model.extend({
    displayName: DS.attr('string'),
    slug: DS.attr('string'),
    lessonsLearned: DS.attr('string'),
    description: DS.attr('string'),
    isLocked: DS.attr('boolean'),
    hasSecretPlayer: DS.attr('boolean'),
    startingInventory: DS.attr('number'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    puzzleRounds: DS.hasMany('puzzle-round', {async: true}),

    isPracticeGame: Em.computed.equal('displayName', 'WACEP Practice Game'),
    isCaseysGame: function() {
        var name = this.get('displayName');
        return !!name.match(/^Casey\'s Game/gi);
    }.property('displayName'),

    // Spreadsheet properties
    years: Em.computed.mapBy('puzzleRounds', 'year'),

    allDryForecasts: Em.computed.mapBy('puzzleRounds', 'belowForecast'),
    allNormalForecasts: Em.computed.mapBy('puzzleRounds', 'normalForecast'),
    allWetForecasts: Em.computed.mapBy('puzzleRounds', 'aboveForecast'),
    allPuzzleObservations: Em.computed.mapBy(
        'puzzleRounds', 'rainfallObservation')
});

export default Puzzle;
