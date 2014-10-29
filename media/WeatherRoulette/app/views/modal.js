import Ember from 'ember';

export default Ember.View.extend({
    click: function(e) {
        // If the user clicked on the shaded modal backdrop, close the
        // window.
        if (Ember.$(e.target).hasClass('roulette-modal')) {
            return this.get('controller').send('closeModal');
        }
    }
});
