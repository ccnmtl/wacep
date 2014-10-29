import {
    moduleFor,
    test
} from 'ember-qunit';

moduleFor('controller:puzzle', 'PuzzleController', {
    needs: ['controller:application']
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

    ok(controller.get('hatsToBuyPercentage') === 22);
    ok(controller.get('shirtsToBuyPercentage') === 33);
    ok(controller.get('umbrellasToBuyPercentage') === 44);

    controller.resetItems();
    ok(controller.get('hatsToBuyPercentage') === 0);
    ok(controller.get('shirtsToBuyPercentage') === 0);
    ok(controller.get('umbrellasToBuyPercentage') === 0);
});

test('showAlertIfBankrupt is accurate', function() {
    var controller = this.subject();

    ok(controller.showAlertIfBankrupt(0) === true);
    ok(controller.showAlertIfBankrupt(-50) === true);
    ok(controller.showAlertIfBankrupt(500) === false);
});
