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

    // Spreadsheet properties
    years: Em.computed.mapBy('puzzleRounds', 'year'),

    allDryForecasts: Em.computed.mapBy('puzzleRounds', 'belowForecast'),
    allNormalForecasts: Em.computed.mapBy('puzzleRounds', 'normalForecast'),
    allWetForecasts: Em.computed.mapBy('puzzleRounds', 'aboveForecast'),
    allPuzzleObservations: Em.computed.mapBy(
        'puzzleRounds', 'rainfallObservation')
});

Puzzle.reopenClass({
    FIXTURES: [
        {
            id: 1,
            displayName: 'Practice Game',
            slug: 'practice-game',
            description: 'desc',
            isLocked: false,
            hasSecretPlayer: false,
            startingInventory: 100,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            puzzleRounds: [1,2,3,4,5,6],
            secretMoves: []
        },
        {
            id: 2,
            displayName: 'Simon\'s Game',
            slug: 'simons-game',
            description: 'desc',
            startingInventory: 100,
            isLocked: false,
            hasSecretPlayer: true,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            puzzleRounds: [7,8,9,10,11],
            secretMoves: []
        }
    ]
});

export default Puzzle;
