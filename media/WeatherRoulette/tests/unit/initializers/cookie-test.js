import Ember from 'ember';
import { initialize } from 'weather-roulette/initializers/cookie';

var container, application;

module('CookieInitializer', {
    setup: function() {
        Ember.run(function() {
            container = new Ember.Container();
            application = Ember.Application.create();
            application.deferReadiness();
        });
    }
});

// Replace this with your real tests.
test('it works', function() {
    initialize(container, application);

    // you would normally confirm the results of the initializer here
    ok(true);
});

