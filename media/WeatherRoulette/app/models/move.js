import DS from 'ember-data';

var Move = DS.Model.extend({
    gameState: DS.belongsTo('game-state'),
    puzzleRound: DS.belongsTo('puzzle-round'),
    year: DS.attr('number'),
    hats: DS.attr('number'),
    shirts: DS.attr('number'),
    umbrellas: DS.attr('number'),
    startingInventory: DS.attr('number'),
    endingInventory: DS.attr('number'),
    puzzle: DS.belongsTo('puzzle'),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date')
});

Move.reopenClass({
    FIXTURES: [
        {
            id: 1,
            year: 1997,
            hats: 80,
            shirts: 10,
            umbrellas: 10,
            startingInventory: 300,
            endingInventory: 100,
            puzzle: 1,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        },
        {
            id: 2,
            year: 1998,
            hats: 10,
            shirts: 80,
            umbrellas: 10,
            startingInventory: 300,
            endingInventory: 100,
            puzzle: 1,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString()
        }
    ]
});

export default Move;
