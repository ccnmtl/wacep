var Observer = (function() {
    "use strict";
    var subject;

    function Observer(){
        "use strict";
    };

    Observer.prototype.setSubject = function (_subject) {
        "use strict";
        subject = _subject;
        subject.attach (this);
    }

    Observer.prototype.getSubject = function () {
        return subject;
    }

    Observer.prototype.update = function () {
    	// override this function
    }

    return Observer;
})();



//////////
function Graph ( ) {}
Graph.prototype = new Observer();
Graph.prototype.update = function ( ) {

    contents = this.getSubject().getContents();

    for(var i=0; i<contents.length; i++){
        if (contents[i] ) {
            for(var j=0; j<contents[i].length; j++){
                css_class = '.the_td.' + i + '.'+ j;
                jQuery(css_class ).html (  contents[i][j]  );
            }
        }
    }

        //jQuery('.the_td.7.2').html ('asd');

}
//////////////