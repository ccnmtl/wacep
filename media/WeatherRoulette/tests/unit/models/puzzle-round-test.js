import {
    moduleForModel,
    test
} from 'ember-qunit';
import Ember from 'ember';

moduleForModel('puzzle-round', 'PuzzleRound', {
    // Specify the other units that are required for this test.
    needs: ['model:puzzle']
});

test('it exists', function() {
    var model = this.subject();

    // var store = this.store();
    ok(!!model);
});

test('it calculates observationGraphValue correctly', function() {
    var model = this.subject();

    Ember.run(function() {
        model.set('rainfallObservation', 'Below');
    });
    ok(model.get('observationGraphValue') === 0);

    Ember.run(function() {
        model.set('rainfallObservation', 'Normal');
    });
    ok(model.get('observationGraphValue') === 1);

    Ember.run(function() {
        model.set('rainfallObservation', 'Above');
    });
    ok(model.get('observationGraphValue') === 2);
});
