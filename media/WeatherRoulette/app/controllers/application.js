import Ember from 'ember';

export default Ember.Controller.extend({
    // Assume the user is authorized until we get a 403 from the API
    isAuthorized: true
});
