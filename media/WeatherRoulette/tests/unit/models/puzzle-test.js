import {
    moduleForModel,
    test
} from 'ember-qunit';
import PuzzleRound from 'weather-roulette/models/puzzle-round';

moduleForModel('puzzle', 'Puzzle', {
    // Specify the other units that are required for this test.
    needs: ['model:puzzle-round']
});

test('it exists', function() {
    var model = this.subject();
    // var store = this.store();
    ok(!!model);
});
