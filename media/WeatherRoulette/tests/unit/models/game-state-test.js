import {
    moduleForModel,
    test
} from 'ember-qunit';

moduleForModel('game-state', 'GameState', {
    // Specify the other units that are required for this test.
    needs: [
        'model:move', 'model:puzzle', 'model:puzzle-round'
    ]
});

test('it exists', function() {
    var model = this.subject();
    var store = this.store();

    ok(!!model);
    ok(!!store);
});
