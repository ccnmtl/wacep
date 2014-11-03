import Em from 'ember';

/**
 * controller:games-modal
 *
 * Displays a list of pre-loaded puzzles created by faculty for users to
 * play.
 */
export default Em.ArrayController.extend({
    needs: ['puzzle'],
    actions: {
        playPuzzle: function() {
            Em.debug('controller:games-modal playPuzzle');
            this.send('closeModal');
            return true;
        },
        selectPuzzle: function(puzzle) {
            Em.debug('controller:games-modal selectPuzzle');
            return this.set('selectedPuzzle', puzzle);
        }
    },

    selectedPuzzle: null,

    model: function() {
        Em.debug('controller:games-modal model');
        return this.get('store').find('puzzle');
    }.property()
});
