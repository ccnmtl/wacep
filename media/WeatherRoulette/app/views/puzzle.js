import Em from 'ember';

export default Em.View.extend({
    didInsertElement: function() {
        this._super();
        Em.debug('view:puzzle focus');
        Em.run.schedule('afterRender', this, function() {
            Em.$('.roulette-betting-area input:first').focus();
        });
    }
});
