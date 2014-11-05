import {
    moduleFor,
    test
} from 'ember-qunit';

moduleFor('controller:puzzle', 'PuzzleController', {
    needs: ['controller:application', 'model:game-state']
});

test('it exists', function() {
    var controller = this.subject();
    ok(controller);
});

test('resetItems clears the inputs', function() {
    var controller = this.subject();
    controller.setProperties({
        hatsToBuyPercentage: 22,
        shirtsToBuyPercentage: 33,
        umbrellasToBuyPercentage: 44
    });

    equal(controller.get('hatsToBuyPercentage'), 22);
    equal(controller.get('shirtsToBuyPercentage'), 33);
    equal(controller.get('umbrellasToBuyPercentage'), 44);

    controller.resetItems();
    equal(controller.get('hatsToBuyPercentage'), 0);
    equal(controller.get('shirtsToBuyPercentage'), 0);
    equal(controller.get('umbrellasToBuyPercentage'), 0);
});

test('showAlertIfBankrupt is accurate', function() {
    var controller = this.subject();

    equal(controller.showAlertIfBankrupt(0), true);
    equal(controller.showAlertIfBankrupt(-50), true);
    equal(controller.showAlertIfBankrupt(500), false);
});

/*test('hatsToBuy is accurate', function() {
    var controller = this.subject();
    controller.set('gameState', this.store.createRecord('game-state'));
    controller.set('currentInventory', 90);
    controller.set('hatsToBuyPercentage', 33);

    ok(controller.get('hatsToBuy') === 29);
});*/
