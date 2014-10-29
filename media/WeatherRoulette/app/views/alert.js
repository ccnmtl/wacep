import Em from 'ember';

/**
 * views:alert
 *
 * View for a bootstrap alert.
 * http://getbootstrap.com/components/#alerts
 */
export default Em.View.extend({
    templateName: 'alert',
    classNames: ['alert'],
    classNameBindings: ['alertType'],

    // http://getbootstrap.com/components/#alerts
    alertType: function() {
        return 'alert-' + this.get('controller.alertType');
    }.property('controller.alertType'),

    attributeBindings: ['role'],
    role: 'alert',

    contentChanged: function() {
        this.set('controller.alertTrigger', false);
        Em.$(window).scrollTop(0);
        var $el = Em.$(this.get('element'));
        $el.css({opacity: 0});
        $el.fadeTo('fast', 1);
    }.observes('controller.alertContent', 'controller.alertTrigger')
});
