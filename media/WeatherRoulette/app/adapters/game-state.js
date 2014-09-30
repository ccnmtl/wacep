import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    // Singular resource
    // http://stackoverflow.com/a/23974804/173630
    pathForType: function(type) {
        var decamelized = Ember.String.decamelize(type);
        return decamelized;
    }
});
