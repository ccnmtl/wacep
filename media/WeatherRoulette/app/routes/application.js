import Em from 'ember';

/**
 * route:application
 *
 * This is the default route in Ember. I'm using it to load the user's
 * GameState object.
 */
export default Em.Route.extend({
    actions: {
        openModal: function(modalName) {
            Em.debug('route:application openModal');
            try {
                // Attempt to render this view with a custom controller.
                return this.render(modalName, {
                    into: 'application',
                    outlet: 'modal',
                    controller: modalName
                });
            } catch (e) {
                // If the custom modal controller doesn't exist, the previous
                // render statement throws an exception, and we use the base
                // modal controller.
                return this.render(modalName, {
                    into: 'application',
                    outlet: 'modal'
                });
            }
        },

        closeModal: function() {
            Em.debug('route:application closeModal');
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        /**
         * playPuzzle
         *
         * Returns a promise.
         */
        playPuzzle: function(puzzle) {
            Em.debug('route:application playPuzzle');
            Em.debug('playing puzzle ' + puzzle.get('slug'));

            var puzzleController = this.controllerFor('puzzle');
            var me = this;
            return puzzleController.resetGame()
                .then(function() {
                    return puzzleController.deleteMoves();
                })
                .then(function() {
                    return puzzleController.get('gameState');
                })
                .then(function(gameState) {
                    gameState.set(
                        'currentInventory', puzzle.get('startingInventory'));
                    me.send('closeModal');
                    return me.transitionTo('puzzle', puzzle);
                });
        }
    },

    model: function() {
        Em.debug('route:application model');
        var me = this;

        // Look up GameState singleton
        return this.store.find('gameState', 'mine')
            .catch(function(error) {
                console.error('error', error);
                if (error.status === 403) {
                    me.controllerFor('application').set('isAuthorized', false);
                }
            });
    },

    renderTemplate: function(controller, model) {
        Em.debug('route:application renderTemplate');
        this._super(controller, model);
        if (!controller.get('isAuthorized')) {
            this.render('alert-modal', {
                into: 'application',
                outlet: 'modal'
            });
        }
    }
});
