import DS from 'ember-data';
import Ember from 'ember';

export default DS.ActiveModelAdapter.extend({
    host: '/weatherroulette/api',

    // Django requires AJAX POST requests to include a CSRF token in the
    // header. The value of this token can be rendered in the Django
    // template, and it's always available as a cookie.
    // see: https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax
    headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
    }
});

// The FixtureAdapter can be used when running this app with "ember serve"
// without a Django back-end.
//export default DS.FixtureAdapter.extend({});
