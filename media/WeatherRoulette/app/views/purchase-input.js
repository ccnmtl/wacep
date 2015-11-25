import Em from 'ember';

export default Em.TextField.extend({
    classNames: ['form-control'],
    type: 'number',
    min: 0,
    max: 100,
    step: 1,
    attributeBindings: ['value'],

    didInsertElement: function() {
        // Use jquery-numeric to prevent entering alpha characters, decimal
        // points, minus symbols, etc, on this input.
        this.$().numeric({
            decimal: false,
            negative: false
        });
    },

    change: function(e) {
        // Don't let the user allocate more than 100%
        var inputSum = this.get('content');
        if (inputSum > 100) {
            var newVal = 100 - (inputSum - e.target.value);
            this.set('value', newVal);
        }
    },

    keyDown: function(e) {
        var $target = Em.$(e.target);
        var isValid = $target && $target[0].validity.valid;

        // Leave the input alone if it passes the validity check
        if (isValid) {
            return;
        }

        // Check to see if the value is greater than 100.
        // This check is in keyDown so it is executed if you hold down a
        // number key in an input.
        var value = this.get('value');
        var newValue = parseInt(value, 10);
        if (newValue > 100) {
            $target.trigger('change');
        }
    },

    keyUp: function(e) {
        if (e.keyCode === 13) {
            // The return key was pressed, so submit this form.
            this.get('parentView.controller').send('invest');
            return;
        }

        var val = this.get('value');
        // val is a string here.
        if (val && val.length > 1 && val[0] === '0') {
            // If the first character of a multiple-digit number is a
            // zero, remove it.
            this.set('value', val.slice(1));
        }
    }
});
