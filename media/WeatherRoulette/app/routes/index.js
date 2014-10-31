import Em from 'ember';

export default Em.Route.extend({
    activate: function() {
        Em.debug('route:index activate');
        this._super();
        this.controllerFor('application').set('currentPuzzle', null);
    }
});
