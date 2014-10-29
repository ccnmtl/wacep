import Ember from 'ember';

export default Ember.TextField.extend({
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
    }
});
