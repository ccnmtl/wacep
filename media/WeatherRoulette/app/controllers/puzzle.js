import Em from 'ember';

/**
 * controller:puzzle
 *
 * A lot of the front-end UI logic for gameplay is here.
 */
export default Em.ObjectController.extend({
    needs: ['application'],

    gameState: Em.computed.alias('controllers.application.model'),
    currentRound: Em.computed.alias('gameState.currentRound'),
    currentYear: Em.computed.alias('currentRound.year'),

    alertTrigger: false,
    alertType: 'info',
    alertContent: 'Allocate your amounts towards inventory. ' +
        'When you are finished, click on "Invest" to see the observation.',

    currentObservationCssClass: function() {
        var s = '';
        var obs = this.get('currentRound.rainfallObservation');

        if (obs === 'Above') {
            s = 'roulette-wet';
        } else if (obs === 'Normal') {
            s = 'roulette-normal';
        } else if (obs === 'Below') {
            s = 'roulette-dry';
        }

        return s;
    }.property('currentRound.rainfallObservation'),

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
        return this.get('isPuzzleCompleted');
    }.property('isPuzzleCompleted'),

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

    allocatedMoney: Em.computed.sum('allItemsToBuyInt'),

    allocatedPercentage: function() {
        var currentInventory = this.get('currentInventory');
        if (currentInventory === 0) {
            return 100;
        }
        var n =
            (this.get('allocatedMoney') / currentInventory) * 100;
        return Math.round(n);
    }.property('allocatedMoney', 'currentInventory'),

    isEverythingAllocated: Em.computed.equal('allocatedPercentage', 100),
    isEverythingNotAllocated: Em.computed.not('isEverythingAllocated'),

    isCurrentYearCompleted: function() {
        return !!this.get('moves').findBy(
            'year', this.get('currentYear'));
    }.property('moves.@each.year', 'currentYear'),

    hatsBought: Em.computed.mapBy('moves', 'hats'),
    shirtsBought: Em.computed.mapBy('moves', 'shirts'),
    umbrellasBought: Em.computed.mapBy('moves', 'umbrellas'),
    endOfRoundInventories: Em.computed.mapBy('moves', 'endingInventory'),

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
        return this.get('allBelowForecasts')
            .slice(0, forecastsToShow);
    }.property(
        'allBelowForecasts.@each', 'moves.length',
        'isCurrentYearCompleted'
    ),
    normalForecasts: function() {
        var forecastsToShow = this.get('moves.length');
        if (!this.get('isCurrentYearCompleted')) {
            forecastsToShow += 1;
        }
        return this.get('allNormalForecasts')
            .slice(0, forecastsToShow);
    }.property(
        'allNormalForecasts.@each', 'moves.length',
        'isCurrentYearCompleted'
    ),
    aboveForecasts: function() {
        var forecastsToShow = this.get('moves.length');
        if (!this.get('isCurrentYearCompleted')) {
            forecastsToShow += 1;
        }
        return this.get('allAboveForecasts')
            .slice(0, forecastsToShow);
    }.property(
        'allAboveForecasts.@each', 'moves.length',
        'isCurrentYearCompleted'
    ),

    puzzleObservations: function() {
        return this.get('allPuzzleObservations')
            .slice(0, this.get('moves.length'));
    }.property('allPuzzleObservations.@each', 'moves.length'),

    actions: {
        invest: function() {
            return this.invest();
        },

        goToYear: function(newYear) {
            return this.goToYear(newYear);
        }
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
        gameState.set('currentRound', newRound);
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
                me.resetItems();
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
            if (me.get('isPuzzleCompleted')) {
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

        var gameState = this.get('gameState');
        gameState.set('currentRound',
            this.get('puzzleRounds').sortBy('year').get('firstObject'));

        return Em.RSVP.all([
            this.deleteMoves(),
            gameState.save()
        ]);
    }
});
