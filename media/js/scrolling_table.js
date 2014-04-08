var ScrollingTable = (function() {
        "use strict";
        // settings:
        var numRows = 10;
        var columnTitles = [];
        var rows;
        var observers;

        // constructor
        function ScrollingTable(_columnTitles) {
            "use strict";
            columnTitles = _columnTitles;
            rows = new Array (numRows);
            observers = [];
        }

    ScrollingTable.prototype.attach = function (observer) {
        "use strict";
        observers.push (observer);
    };

    ScrollingTable.prototype.notify = function () {
        "use strict";
        for (var i=0;i<observers.length; i++) { 
            observers[i].update();
        }
    };

    ScrollingTable.prototype.addRow = function(row) {
        "use strict";
        if (row.length != columnTitles.length) {
            return;
        }
        delete rows [0];
        for (var i=1;i<numRows;i++) { 
            rows[i-1] = rows [i];
        }
        rows[numRows-1] = row;
    };

    ScrollingTable.prototype.getLastRow = function() {
        "use strict";
        var result = {};
        var the_row =  rows[numRows-1];
        for (var i=0;i<columnTitles.length;i++) { 
            result [ columnTitles[i]]  = the_row [i];
        }
        return result;
    };


    ScrollingTable.prototype.getLatestInfo= function() {
        "use strict";
        var result = this.getLastRow();
        return result;
    };


    ScrollingTable.prototype.getColumns= function() {
        "use strict";
        var i;
        var columns = {};
        
        for (i=0; i < columnTitles.length; i++) { 
            columns[columnTitles[i]] = Array();
        }

        for (i=0; i < numRows; i++) { 
            the_row = rows[i];
            for (var j=0; columnTitles<columnTitles.length ;j++) { 
                columnTitle = columnTitles[j];
                columns[columnTitle][i] = rows[i][j];
            }
        }
        return result;
    };



    ScrollingTable.prototype.getContents= function() {
        "use strict";
        return rows;
    };

    ScrollingTable.prototype.getNumberOfRows= function() {
        "use strict";
        return numRows;
    };

    ScrollingTable.prototype.getColumnTitles= function() {
        "use strict";
        return columnTitles;
    };

    return ScrollingTable;
})();