var Observer = (function() {
    "use strict";
    var subject;

    function Observer() {
    }

    Observer.prototype.hitch = function (_subject) {
        subject = _subject;
        subject.attach (this);
        this.prepareDOM();
        return this;
    };

    Observer.prototype.getSubject = function () {
        return subject;
    };

    Observer.prototype.prepareDOM = function () {
        // override this function
    };

    Observer.prototype.update = function () {
        // override this function
    };

    return Observer;
})();