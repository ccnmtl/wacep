var Observer = (function() {
    "use strict";
    var subject;

    function Observer(){
        "use strict";
    };

    Observer.prototype.hitch = function (_subject) {
        "use strict";
        subject = _subject;
        subject.attach (this);
        this.prepareDOM();
    }

    Observer.prototype.getSubject = function () {
        return subject;
    }

    Observer.prototype.prepareDOM = function () {
        // override this function
    }

    Observer.prototype.update = function () {
    	// override this function
    }

    return Observer;
})();