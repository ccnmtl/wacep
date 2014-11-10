import Ember from "ember";
import { test } from 'ember-qunit';
import startApp from '../helpers/start-app';
var App;

module('Front page test', {
    setup: function() {
        App = startApp();
    },
    teardown: function() {
        Ember.run(App, App.destroy);
    }
});

test("Page contents", function() {
    expect(1);
    visit('/').then(function() {
        equal(find('.lead').length, 1, "Page contains intro paragraph");
    });
});
