import Em from 'ember';

/**
 * route:puzzle
 *
 * Handles rendering for the puzzle template.
 */
export default Em.Route.extend({
    actions: {
        loading: function() {
            Em.debug('route:puzzle loading');
        },
        showBankruptAlert: function() {
            return this.render('puzzle-bankrupt-modal', {
                into: 'application',
                outlet: 'modal',
                model: this.get('controller.model')
            });
        },
        showPuzzleFinishedModal: function() {
            return this.render('puzzle-finished-modal', {
                into: 'application',
                outlet: 'modal',
                model: this.get('controller.model')
            });
        }
    },

    model: function(params, transition) {
        Em.debug('route:puzzle model');
        var applicationController = this.controllerFor('application');
        if (!applicationController.get('isAuthorized')) {
            return Em.RSVP.reject();
        }

        return this._super(params, transition)
            .then(function(model) {
                // Don't return the puzzle if it's locked
                if (model.get('isLocked')) {
                    return Em.RSVP.reject();
                }
                return model;
            });
    },

    setupController: function(controller, model) {
        Em.debug('route:puzzle setupController');
        this._super(controller, model);

        var allPromises = [];

        var applicationController = this.controllerFor('application');
        applicationController.set('currentPuzzle', model);

        // When setting up the puzzle controller, we'll need the puzzle rounds
        // and the moves. The puzzle rounds are tied to the puzzle, and the
        // moves are tied to the GameState.
        var gameState = this.controllerFor('application').get('model');

        if (gameState.get('currentRound.puzzle.id') !== model.get('id')) {
            gameState.set('currentRound', null);
        } else {
            // Validate that the currentRound makes sense, given the current
            // puzzle and set of moves.
            var myPromises = {
                puzzleRounds: model.get('puzzleRounds'),
                moves: gameState.get('moves')
            };
            var promise = Em.RSVP.hash(myPromises)
                .then(function(results) {
                    var currentYear = gameState.get('currentRound.year');
                    var firstYear = results.puzzleRounds.sortBy('year')
                        .get('firstObject.year');

                    Em.debug('currentYear is ' + currentYear);
                    Em.debug('firstYear is ' + firstYear);

                    var difference = currentYear - firstYear;
                    Em.debug('difference is ' + difference);
                    if (
                        difference - results.moves.get('length') !== 0
                    ) {
                        Em.debug('resetting');
                        controller.resetGame();
                    }
                });
            allPromises.push(promise);
        }

        return Em.RSVP.all(allPromises)
            .then(function() {
                gameState.get('moves');
            })
            .then(function() {
                return model.get('puzzleRounds');
            })
            .then(function(puzzleRounds) {
                controller.resetGame();
                Em.debug('Setting up a new game.');
                var startingInventory = model.get('startingInventory');

                // Set currentRound to first round in puzzle
                var firstRound = puzzleRounds
                    .sortBy('year').get('firstObject');

                gameState.setProperties({
                    currentRound: firstRound,
                    currentInventory: startingInventory
                });

                return gameState.save();
            })
            .then(function() {
                return gameState.reload();
            });
    },

    renderTemplate: function(controller, model) {
        Em.debug('route:puzzle renderTemplate');
        this._super(controller, model);

        if (!this.controllerFor('application').get('isAuthorized')) {
            this.render('alert-modal', {
                into: 'application',
                outlet: 'modal'
            });
        } else {
            this.render('spreadsheet', {
                into: 'puzzle',
                outlet: 'spreadsheet'
            });
            this.render('secret-player-spreadsheet', {
                into: 'puzzle',
                outlet: 'secret-player-spreadsheet'
            });
        }
    }
});
