import Em from 'ember';

/**
 * route:puzzle
 *
 * Handles rendering for the puzzle template.
 */
export default Em.Route.extend({
    actions: {
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
        if (this.controllerFor('application').get('isAuthorized')) {
            return this._super(params, transition);
        }
    },

    setupController: function(controller, model) {
        Em.debug('route:puzzle setupController');
        this._super(controller, model);
        var promises = [];

        // When setting up the puzzle controller, we'll need the puzzle rounds
        // and the moves. The puzzle rounds are tied to the puzzle, and the
        // moves are tied to the GameState.
        var gameState = this.controllerFor('application').get('model');

        gameState.set('currentPuzzle', model);

        if (gameState.get('currentRound.puzzle.id') !== model.get('id')) {
            gameState.set('currentRound', null);
        } else {
            // Validate that the currentRound makes sense, given the current
            // puzzle and set of moves.
            var myPromises = {
                puzzleRounds: model.get('puzzleRounds'),
                moves: gameState.get('moves')
            };

            promises.push(Em.RSVP.hash(myPromises)
                .then(function(results) {
                    var currentYear = gameState.get('currentRound.year');
                    var firstYear = results.puzzleRounds.sortBy('year')
                        .get('firstObject.year');
                    var difference = currentYear - firstYear;
                    if (difference !== results.moves.get('length')) {
                        Em.debug('resetting');
                        controller.resetGame();
                    }
                })
            );
        }


        promises.push(model.get('puzzleRounds')
            .then(function(puzzleRounds) {
                // Initialize game state when opening a new puzzle
                if (!gameState.get('currentRound.year')) {
                    var firstRound = puzzleRounds.sortBy('year')
                        .get('firstObject');
                    gameState.set('currentRound', firstRound);
                }
            })
        );

        return Em.RSVP.all(promises)
            .then(function() {
                gameState.get('moves')
                    .then(function(moves) {
                        if (moves.get('length') === 0) {
                            Em.debug('no moves! setting inventory to ' +
                                model.get('startingInventory'));
                            gameState.set('currentInventory',
                                model.get('startingInventory'));
                        }
                    });
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
