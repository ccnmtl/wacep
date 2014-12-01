import Em from 'ember';
import calculatePercentage from 'weather-roulette/utils/calculate-percentage';

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
    moves: Em.computed.alias('gameState.moves'),
    currentRound: Em.computed.alias('gameState.currentRound'),
    currentYear: Em.computed.alias('currentRound.year'),

    alertTrigger: false,
    alertType: 'info',
    alertContent: null,

    // Dynamic text for when the player completes a round.
    currentObservationTextObject: function() {
        var o = {};
        var obs = this.get('currentRound.rainfallObservation');

        if (obs === 'Wet') {
            o.cssClass = 'roulette-wet';
            o.text = 'wet';
            o.soldItemType = 'umbrellas';
        } else if (obs === 'Normal') {
            o.cssClass = 'roulette-normal';
            o.text = 'normal';
            o.soldItemType = 'shirts';
        } else if (obs === 'Dry') {
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

    /**
     * getTableRowData :: object
     * General function for getting row data for the progress table.
     * 'type' is either 'Wet', 'Normal', or 'Dry'.
     */
    getTableRowData: function(
        item, idx, type, isCurrentYearCompleted
    ) {
        var itemsName = '';
        if (type === 'Wet') {
            itemsName = 'umbrellas';
        } else if (type === 'Normal') {
            itemsName = 'shirts';
        } else if (type === 'Dry') {
            itemsName = 'hats';
        }

        var o = {
            forecast: this.get('all'+type+'Forecasts').objectAt(idx),
            isActual: false,
            investment: null,
            invReturn: null,
            isCurrentYear: this.get('currentYear') === item.get('year')
        };

        if (!o.isCurrentYear || isCurrentYearCompleted) {
            o.isActual =
                this.get('allPuzzleObservations').objectAt(idx) === type;
        }

        var move = this.get('moves').objectAt(idx);
        if (move) {
            o.investment = move.get(itemsName);
            if (o.isActual) {
                o.invReturn = o.investment * 3;
            } else {
                o.invReturn = 0;
            }
        }

        return o;
    },

    tableYearData: function() {
        var movesLength = this.get('moves.length');
        var puzzleRounds = this.get('puzzleRounds');

        var length = movesLength;
        if (!this.get('isCurrentYearCompleted')) {
            length += 1;
        }

        return puzzleRounds.slice(0, length);
    }.property('puzzleRounds', 'isCurrentYearCompleted', 'moves.length'),
    tableWetData: Em.computed.map('tableYearData', function(item, idx) {
        return this.getTableRowData(
            item, idx, 'Wet', this.get('isCurrentYearCompleted'));
    }),
    tableNormalData: Em.computed.map('tableYearData', function(item, idx) {
        return this.getTableRowData(
            item, idx, 'Normal', this.get('isCurrentYearCompleted'));
    }),
    tableDryData: Em.computed.map('tableYearData', function(item, idx) {
        return this.getTableRowData(
            item, idx, 'Dry', this.get('isCurrentYearCompleted'));
    }),
    tableTotalData: Em.computed.map('tableYearData', function(item, idx) {
        var o = {
            invReturnTotal: null,
            investmentTotal: null,
            isCurrentYear: this.get('currentYear') === item.get('year')
        };

        var move = this.get('moves').objectAt(idx);
        if (move) {
            var hats = move.get('hats');
            var shirts = move.get('shirts');
            var umbrellas = move.get('umbrellas');
            o.investmentTotal = hats + shirts + umbrellas;

            var observation = this.get('allPuzzleObservations').objectAt(idx);
            if (observation) {
                if (observation === 'Wet') {
                    o.invReturnTotal = umbrellas * 3;
                } else if (observation === 'Normal') {
                    o.invReturnTotal = shirts * 3;
                } else if (observation === 'Dry') {
                    o.invReturnTotal = hats * 3;
                }
            }
        }

        return o;
    }),

    currentNumberSold: function() {
        return Math.round(
            this.get('tableTotalData.lastObject').invReturnTotal / 3);
    }.property('tableTotalData.@each'),
    currentInventoryDelta: function() {
        var length = this.get('tableTotalData.length');
        var n = 0;
        if (length === 0) {
            n = null;
        } else if (length === 1) {
            n = this.get('tableTotalData.lastObject').invReturnTotal;
        } else {
            var last = this.get('tableTotalData.lastObject').invReturnTotal;
            var nextLast = this.get('tableTotalData')
                .objectAt(length-2).invReturnTotal;
            n = last - nextLast;
        }
        return n;
    }.property('tableTotalData.@each'),
    currentInventoryDeltaVerb: function() {
        var verb = 'made';
        if (this.get('currentInventoryDelta') < 0) {
            verb = 'lost';
        }
        return verb;
    }.property('currentInventoryDelta'),
    currentInventoryDeltaAbs: function() {
        return Math.abs(this.get('currentInventoryDelta'));
    }.property('currentInventoryDelta'),

    currentInventoryObserver: function() {
        if (this.get('currentInventory') <= 0) {
            Em.debug('controller:puzzle currentInventoryObserver - bankrupt!');
            this.send('showBankruptAlert');
        }
    }.observes('currentInventory'),

    hatsToBuyPercentage: 0,
    hatsToBuy: function() {
        return calculatePercentage(
            this.get('hatsToBuyPercentage'),
            this.get('currentInventory')
        );
    }.property('hatsToBuyPercentage', 'currentInventory'),

    shirtsToBuyPercentage: 0,
    shirtsToBuy: function() {
        return calculatePercentage(
            this.get('shirtsToBuyPercentage'),
            this.get('currentInventory')
        );
    }.property('shirtsToBuyPercentage', 'currentInventory'),

    umbrellasToBuyPercentage: 0,
    umbrellasToBuy: function() {
        return calculatePercentage(
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
            Em.debug('no moves - isCurrentYearCompleted is false');
            return false;
        }
        return !!moves.findBy('year', this.get('currentYear'));
    }.property('moves.@each.year', 'currentYear'),
    isCurrentYearNotCompleted: Em.computed.not('isCurrentYearCompleted'),

    hatsBought: Em.computed.mapBy('moves', 'hats'),
    shirtsBought: Em.computed.mapBy('moves', 'shirts'),
    umbrellasBought: Em.computed.mapBy('moves', 'umbrellas'),

    startingInventories: Em.computed.mapBy('moves', 'startingInventory'),
    endingInventories: Em.computed.mapBy('moves', 'endingInventory'),

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


    observationGraphValues: Em.computed.alias('endingInventories'),

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

    /**
     * Go to a new year.
     *
     * Returns a promise.
     */
    goToYear: function(newYear) {
        if (this.showAlertIfBankrupt(this.get('currentInventory'))) {
            return false;
        }

        var gameState = this.get('gameState');
        var newRound = this.get('puzzleRounds').findBy('year', newYear);

        this.set('alertContent', null);
        this.resetItems();
        gameState.set('currentRound', newRound);

        Em.run.schedule('afterRender', this, function() {
            Em.$('.roulette-betting-area input:first').focus();
        });

        return gameState.save()
            .catch(function(error) {
                console.error('gameState save failed', error);
            });
    },

    /**
     * Make an investment.
     *
     * Returns a promise.
     */
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
            }
            Em.$('.wr-next-round').focus();
        });
    },

    /**
     * resetItems
     *
     * Reset the investment allocations in the betting area.
     */
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
     * Delete all the moves in the gameState. Returns a promise.
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

        // Don't delete moves that aren't related to the current puzzle
        var me = this;
        Em.debug('all moves ' + this.get('moves.length'));
        var moves = this.get('moves');
        var deletedMoves = moves.filter(function(move) {
            var movePuzzleId = move.get('puzzleRound.puzzle.id');
            var puzzleId = me.get('id');

            Em.debug('in deleteMoves: ' + movePuzzleId + ' ' + puzzleId);

            var deleteMe = typeof movePuzzleId === 'undefined' ||
                movePuzzleId === puzzleId;

            if (!deleteMe) {
                Em.debug('leaving move ' + move.get('id'));
            } else {
                Em.debug('deleting move ' + move.get('id'));
            }

            return deleteMe;
        });
        Em.debug('deleted moves ' + deletedMoves.get('length'));

        var promises = [];
        deletedMoves.forEach(function(move) {
            Em.run.once(this, function() {
                if (move.get('isLoading')) {
                    Em.debug(
                        'Woops! Couldn\'t delete move from loading state.');
                    return;
                }
                var promise = move.destroyRecord()
                    .catch(function(error) {
                        console.error('move destroy() failed', error);
                    });
                promises.push(promise);
            });
        });

        return Em.RSVP.all(promises);
    },

    /**
     * Reset the game state.
     *
     * Returns a promise.
     */
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

        return gameState.save();
    }
});
