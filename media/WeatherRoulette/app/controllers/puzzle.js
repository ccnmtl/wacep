import Em from 'ember';

/**
 * controller:puzzle
 *
 * A lot of the front-end UI logic for gameplay is here.
 */
export default Em.ObjectController.extend({
    needs: ['application'],

    actions: {
        invest: function() {
            return this.invest();
        },

        goToYear: function(newYear) {
            return this.goToYear(newYear);
        }
    },

    gameState: Em.computed.alias('controllers.application.model'),
    currentRound: Em.computed.alias('gameState.currentRound'),
    currentYear: Em.computed.alias('currentRound.year'),

    alertTrigger: false,
    alertType: 'info',
    alertContent: null,

    aggregatedForecasts: [],

    // Dynamic text for when the player completes a round.
    currentObservationTextObject: function() {
        var o = {};
        var obs = this.get('currentRound.rainfallObservation');

        if (obs === 'Above') {
            o.cssClass = 'roulette-wet';
            o.text = 'rainy';
            o.soldItemType = 'umbrellas';
        } else if (obs === 'Normal') {
            o.cssClass = 'roulette-normal';
            o.text = 'average';
            o.soldItemType = 'shirts';
        } else if (obs === 'Below') {
            o.cssClass = 'roulette-dry';
            o.text = 'dry';
            o.soldItemType = 'sun hats';
        }

        return o;
    }.property('currentRound', 'currentRound.rainfallObservation'),

    nextYear: function() {
        return this.get('currentYear') + 1;
    }.property('currentYear'),

    isCurrentYearLastYear: function() {
        var puzzleRounds = this.get('puzzleRounds');
        var lastYear = puzzleRounds.objectAt(puzzleRounds.get('length') - 1)
            .get('year');
        return this.get('currentYear') === lastYear;
    }.property('currentYear', 'id'),

    isPuzzleCompleted: function() {
        var moves = this.get('moves');
        var puzzleRounds = this.get('puzzleRounds');
        return this.get('isCurrentYearLastYear') &&
            (moves.get('length') === puzzleRounds.get('length'));
    }.property('isCurrentYearLastYear', 'moves.@each'),

    isShowingSecretPlayer: function() {
        return this.get('hasSecretPlayer') && this.get('isPuzzleCompleted');
    }.property('hasSecretPlayer', 'isPuzzleCompleted'),

    currentInventory: Em.computed.alias('gameState.currentInventory'),
    moves: Em.computed.alias('gameState.moves'),

    currentInventoryObserver: function() {
        if (this.get('currentInventory') <= 0) {
            Em.debug('controller:puzzle currentInventoryObserver - bankrupt!');
            this.send('showBankruptAlert');
        }
    }.observes('currentInventory'),

    calculatePercentage: function(percentage, total) {
        var n = percentage * (total / 100);
        return Math.round(n);
    },

    hatsToBuyPercentage: 0,
    hatsToBuy: function() {
        return this.calculatePercentage(
            this.get('hatsToBuyPercentage'),
            this.get('currentInventory')
        );
    }.property('hatsToBuyPercentage', 'currentInventory'),

    shirtsToBuyPercentage: 0,
    shirtsToBuy: function() {
        return this.calculatePercentage(
            this.get('shirtsToBuyPercentage'),
            this.get('currentInventory')
        );
    }.property('shirtsToBuyPercentage', 'currentInventory'),

    umbrellasToBuyPercentage: 0,
    umbrellasToBuy: function() {
        return this.calculatePercentage(
            this.get('umbrellasToBuyPercentage'),
            this.get('currentInventory')
        );
    }.property('umbrellasToBuyPercentage', 'currentInventory'),

    inputArray: Em.computed.collect(
        'hatsToBuyPercentage',
        'shirtsToBuyPercentage',
        'umbrellasToBuyPercentage'
    ),
    inputArrayInt: Em.computed.map('inputArray', function(n) {
        return parseInt(n, 10);
    }),
    inputSum: Em.computed.sum('inputArrayInt'),

    // Array of items to buy
    allItemsToBuy: Em.computed.collect(
        'hatsToBuy', 'shirtsToBuy', 'umbrellasToBuy'),

    // allItemsToBuy converted to integers
    allItemsToBuyInt: Em.computed.map('allItemsToBuy', function(n) {
        return parseInt(n, 10);
    }),

    allocatedMoney: function() {
        var sum = 0;
        this.get('allItemsToBuyInt').forEach(function(n) {
            sum += n;
        });

        var currentInventory = this.get('currentInventory');
        if (sum > currentInventory) {
            sum = currentInventory;
        }

        return sum;
    }.property('allItemsToBuyInt', 'currentInventory'),

    allocatedPercentage: function() {
        var currentInventory = this.get('currentInventory');
        if (currentInventory === 0) {
            return 100;
        }
        var n =
            (this.get('allocatedMoney') / currentInventory) * 100;
        return Math.round(n);
    }.property('allocatedMoney', 'currentInventory'),

    isEverythingAllocated: Em.computed.equal('inputSum', 100),
    isEverythingNotAllocated: Em.computed.not('isEverythingAllocated'),

    isCurrentYearCompleted: function() {
        var moves = this.get('moves');
        if (!moves || !moves.get('firstObject.year')) {
            Em.debug('no moves, returning false');
            return false;
        }
        return !!moves.findBy('year', this.get('currentYear'));
    }.property('moves.@each.year', 'currentYear'),
    isCurrentYearNotCompleted: Em.computed.not('isCurrentYearCompleted'),


    hatsBought: Em.computed.mapBy('moves', 'hats'),
    shirtsBought: Em.computed.mapBy('moves', 'shirts'),
    umbrellasBought: Em.computed.mapBy('moves', 'umbrellas'),
    startingInventories: Em.computed.mapBy('moves', 'startingInventory'),
    startingInventoriesPadded: function() {
        return this.padArrayForAllRounds(
            this.get('startingInventories'),
            this.get('puzzleRounds.length'));
    }.property(
        'startingInventories.@each',
        'puzzleRounds.length'
    ),
    endingInventories: Em.computed.mapBy('moves', 'endingInventory'),
    endingInventoriesPadded: function() {
        return this.padArrayForAllRounds(
            this.get('endingInventories'),
            this.get('puzzleRounds.length'));
    }.property(
        'endingInventories.@each',
        'puzzleRounds.length'
    ),

    hatsBoughtPadded: function() {
        return this.padArrayForAllRounds(
            this.get('hatsBought'), this.get('puzzleRounds.length'));
    }.property('hatsBought.@each', 'puzzleRounds.length'),
    shirtsBoughtPadded: function() {
        return this.padArrayForAllRounds(
            this.get('shirtsBought'), this.get('puzzleRounds.length'));
    }.property('shirtsBought.@each', 'puzzleRounds.length'),
    umbrellasBoughtPadded: function() {
        return this.padArrayForAllRounds(
            this.get('umbrellasBought'), this.get('puzzleRounds.length'));
    }.property('umbrellasBought.@each', 'puzzleRounds.length'),

    // I wish I could use Em.computed.map() for these, but I need to observe
    // the attributes, e.g. moves.@each.hats, not just moves.@each.
    percentagesOfHatsBought: function() {
        var a = [];
        this.get('moves').forEach(function(move) {
            var hats = move.get('hats');
            var startingInv = move.get('startingInventory');
            a.push(Math.round((hats / startingInv) * 100));
        });
        return a;
    }.property('moves.@each.hats'),
    percentagesOfShirtsBought: function() {
        var a = [];
        this.get('moves').forEach(function(move) {
            var shirts = move.get('shirts');
            var startingInv = move.get('startingInventory');
            a.push(Math.round((shirts / startingInv) * 100));
        });
        return a;
    }.property('moves.@each.shirts'),
    percentagesOfUmbrellasBought: function() {
        var a = [];
        this.get('moves').forEach(function(move) {
            var umbrellas = move.get('umbrellas');
            var startingInv = move.get('startingInventory');
            a.push(Math.round((umbrellas / startingInv) * 100));
        });
        return a;
    }.property('moves.@each.umbrellas'),

    observationGraphValues: function() {
        var movesLength = this.get('moves.length');
        var totalLength = this.get('puzzleRounds.length');
        var values =
            this.get('allObservationGraphValues').slice(0, movesLength);

        // pad the rest of this array with nulls
        for (var i = 0; i < totalLength - movesLength; i++) {
            values.push(null);
        }

        return values;
    }.property('allObservationGraphValues',
        'moves.length', 'puzzleRounds.length'),

    belowForecasts: function() {
        var forecastsToShow = this.get('moves.length');
        if (!this.get('isCurrentYearCompleted')) {
            forecastsToShow += 1;
        }
        return this.hideFutureRounds(
            this.get('allBelowForecasts'), forecastsToShow);
    }.property(
        'allBelowForecasts.@each', 'moves.length',
        'isCurrentYearCompleted'
    ),
    normalForecasts: function() {
        var forecastsToShow = this.get('moves.length');
        if (!this.get('isCurrentYearCompleted')) {
            forecastsToShow += 1;
        }
        return this.hideFutureRounds(
            this.get('allNormalForecasts'), forecastsToShow);
    }.property(
        'allNormalForecasts.@each', 'moves.length',
        'isCurrentYearCompleted'
    ),
    aboveForecasts: function() {
        var forecastsToShow = this.get('moves.length');
        if (!this.get('isCurrentYearCompleted')) {
            forecastsToShow += 1;
        }
        return this.hideFutureRounds(
            this.get('allAboveForecasts'), forecastsToShow);
    }.property(
        'allAboveForecasts.@each', 'moves.length',
        'isCurrentYearCompleted'
    ),

    puzzleObservations: function() {
        return this.hideFutureRounds(
            this.get('allPuzzleObservations'), this.get('moves.length'));
    }.property('allPuzzleObservations.@each', 'moves.length'),

    /**
     * Pad the input array with nulls, for the remaining slots up to
     * totalLength
     *
     * array: An Ember array
     * totalLength: an integer
     */
    padArrayForAllRounds: function(a, totalLength) {
        var currentLength = a.get('length');
        var paddedArray = [];

        a.forEach(function(item) {
            paddedArray.push(item);
        });

        for (
            var i = 0; i < totalLength - currentLength; i++
        ) {
            paddedArray.push(null);
        }

        return paddedArray;
    },

    hideFutureRounds: function(dataForAllRounds, nRoundsToShow) {
        var a = dataForAllRounds.slice(0, nRoundsToShow);
        return this.padArrayForAllRounds(a, dataForAllRounds.get('length'));
    },

    /**
     * showAlertIfBankrupt
     *
     * Show an alert, and return true, if you're bankrupt.
     */
    showAlertIfBankrupt: function(currentInventory) {
        if (currentInventory <= 0) {
            this.setProperties({
                alertTrigger: true,
                alertContent: 'You\'re bankrupt!',
                alertType: 'danger'
            });
            return true;
        } else {
            return false;
        }
    },

    goToYear: function(newYear) {
        if (this.showAlertIfBankrupt(this.get('currentInventory'))) {
            return false;
        }

        var gameState = this.get('gameState');
        var newRound = this.get('puzzleRounds').findBy('year', newYear);

        this.set('alertContent', null);
        this.resetItems();
        gameState.set('currentRound', newRound);

        Em.$('.roulette-forecast-now').effect('shake');
        Em.run.schedule('afterRender', this, function() {
            Em.$('.roulette-betting-area input:first').focus();
        });

        return gameState.save()
            .catch(function(error) {
                console.error('gameState save failed', error);
            });
    },

    invest: function() {
        Em.debug('controller:puzzle invest');
        if (this.showAlertIfBankrupt(this.get('currentInventory'))) {
            return false;
        } else if (this.get('isEverythingNotAllocated')) {
            this.setProperties({
                alertTrigger: true,
                alertContent:
                    'Allocate the rest of your money before investing!',
                alertType: 'info'
            });
            return false;
        }

        var move = this.get('store').createRecord('move', {
            gameState: this.get('controllers.application.model'),
            puzzleRound: this.get('currentRound'),
            year: this.get('currentYear'),
            hats: this.get('hatsToBuy'),
            shirts: this.get('shirtsToBuy'),
            umbrellas: this.get('umbrellasToBuy'),
            startingInventory: this.get('currentInventory')
        });

        var me = this;
        return move.save()
            .then(function(move) {
                // success
                me.set('currentInventory', move.get('endingInventory'));
                return me.get('gameState').save();
            }, function(reason) {
                // failure
                console.error('rejected', reason);
                me.setProperties({
                    alertTrigger: true,
                    alertContent: 'Error making move: ' +
                    reason.status + ' ' +
                    reason.responseText,
                    alertType: 'danger'
                });
                return move.deleteRecord();
            })
        .then(function() {
            if (me.get('isCurrentYearLastYear')) {
                Em.debug('on last year');
            }
            if (me.showAlertIfBankrupt(me.get('currentInventory'))) {
                return false;
            } else if (me.get('isPuzzleCompleted')) {
                Em.debug('puzzle is done!');
                me.send('showPuzzleFinishedModal');
            }
        });
    },

    resetItems: function() {
        Em.debug('controller:puzzle resetItems');
        return this.setProperties({
            hatsToBuyPercentage: 0,
            shirtsToBuyPercentage: 0,
            umbrellasToBuyPercentage: 0
        });
    },

    /**
     * deleteMoves
     *
     * Delete all the moves in the gameState.
     */
    deleteMoves: function() {
        Em.debug('controller:puzzle deleteMoves');

        var puzzleRounds = this.get('puzzleRounds');
        if (puzzleRounds) {
            var gameState = this.get('gameState');
            gameState.set(
                'currentRound',
                puzzleRounds.sortBy('year').get('firstObject'));
        }


        return this.get('moves').forEach(function(move) {
            Em.run.once(this, function() {
                if (move.get('isLoading')) {
                    Em.debug(
                        'Woops! Couldn\'t delete move from loading state.');
                    return;
                }
                move.destroyRecord()
                    .catch(function(error) {
                        console.error('move destroy() failed', error);
                    });
            });
        });
    },

    resetGame: function() {
        Em.debug('controller:puzzle resetGame');
        this.resetItems();
        this.setProperties({
            alertTrigger: false,
            alertContent: '',
            alertType: 'info'
        });

        var gameState = this.get('gameState');
        if (this.get('puzzleRounds')) {
            gameState.set(
                'currentRound',
                this.get('puzzleRounds').sortBy('year').get('firstObject'));
        }

        return Em.RSVP.all([
            this.deleteMoves(),
            gameState.save()
        ]);
    }
});
