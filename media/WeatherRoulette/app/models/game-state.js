import DS from 'ember-data';

var GameState = DS.Model.extend({
    currentRound: DS.belongsTo('puzzle-round', {async: true}),
    currentInventory: DS.attr('number'),
    moves: DS.hasMany('move', {async: true}),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date')
});

GameState.reopenClass({
    FIXTURES: [{
        id: 'mine',
        currentRound: null,
        currentInventory: 300,
        moves: [1, 2],
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
    }]
});

export default GameState;
