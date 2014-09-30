import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: '/site_media/WeatherRoulette/dist/'
});

Router.map(function() {
    this.resource('puzzle', { path: '/puzzle/:puzzle_id' });
});

export default Router;
