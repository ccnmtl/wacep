import Em from 'ember';

export default Em.Component.extend({
    tagName: 'div',
    classNames: ['radio'],
    classNameBindings: ['active'],
    active: function() {
        return this.get('puzzle.id') === this.get('selected.id');
    }.property('puzzle.id', 'selected.id')
});
