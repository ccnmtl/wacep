import calculatePercentage from 'weather-roulette/utils/calculate-percentage';

module('calculatePercentage');

test('it is accurate', function() {
    equal(calculatePercentage(50, 100), 50);
    equal(calculatePercentage(33, 90), 30);
});
