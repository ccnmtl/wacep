import DS from 'ember-data';

var Move = DS.Model.extend({
    gameState: DS.belongsTo('game-state', {async: true}),
    puzzleRound: DS.belongsTo('puzzle-round', {async: true}),
    year: DS.attr('number'),
    hats: DS.attr('number'),
    shirts: DS.attr('number'),
    umbrellas: DS.attr('number'),
    startingInventory: DS.attr('number'),
    endingInventory: DS.attr('number'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date')
});

export default Move;
