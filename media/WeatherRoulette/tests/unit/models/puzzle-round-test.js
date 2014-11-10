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
