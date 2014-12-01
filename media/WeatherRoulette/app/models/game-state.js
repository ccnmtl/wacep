import DS from 'ember-data';

var GameState = DS.Model.extend({
    currentRound: DS.belongsTo('puzzle-round', {async: true}),
    currentInventory: DS.attr('number'),
    moves: DS.hasMany('move', {async: true}),
    createdAt: DS.attr('date'),
    updatedAt: DS.attr('date'),
    isAdmin: DS.attr('boolean')
});

export default GameState;
