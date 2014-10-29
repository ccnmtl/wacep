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
            return this.set('selectedPuzzle', puzzle);
        }
    },

    selectedPuzzle: Em.computed.alias('model.firstObject'),

    model: function() {
        return this.get('store').find('puzzle');
    }.property()
});
