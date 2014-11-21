import {
    moduleForModel,
    test
} from 'ember-qunit';

moduleForModel('move', 'Move', {
    // Specify the other units that are required for this test.
    needs: [
        'model:game-state', 'model:puzzle', 'model:puzzle-round'
    ]
});

test('it exists', function() {
    var model = this.subject();
    var store = this.store();

    ok(!!model);
    ok(!!store);
});
