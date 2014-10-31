import Em from 'ember';

export default Em.TextField.extend({
    classNames: ['form-control'],
    type: 'number',
    min: 0,
    max: 100,
    attributeBindings: ['value'],

    change: function(e) {
        // Don't let the user allocate more than 100%
        var inputSum = this.get('content');
        if (inputSum > 100) {
            this.set('value', 100 - (inputSum - e.target.value));
        }
    },

    keyDown: function(e) {
        var value = this.get('value');
        var newValue = parseInt(value, 10);

        if (newValue <= 100 && newValue >= 0) {
            // User's input was valid, so just leave it alone.
            return;
        }

        // User's input didn't parse to a valid value, so change it.
        if (newValue > 100) {
            newValue = 100;
        } else if (
            newValue < 0 || !isFinite(newValue)
        ) {
            newValue = 0;
        }

        this.set('value', newValue);
        Em.run.schedule('afterRender', this, function() {
            Em.$(e.target).select();
        });
    }
});
