export var initialize = function(/*container, application*/) {
    //application.inject('route', 'cookie', 'cookie:main');
};

export default {
    name: 'cookie',
    after: ['cookie'],

    initialize: initialize
};
