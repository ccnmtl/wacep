var ScrollingTable = (function() {
    'use strict';
    // settings:
    var numRows = 10;
    var columnTitles = [];
    var rows;
    var observers;

    // constructor
    function ScrollingTable(_columnTitles) {
        columnTitles = _columnTitles;
        rows = new Array(numRows);
        observers = [];
    }

    ScrollingTable.prototype.attach = function(observer) {
        observers.push(observer);
    };

    ScrollingTable.prototype.notify = function() {
        for (var i = 0; i < observers.length; i++) {
            observers[i].update();
        }
    };

    ScrollingTable.prototype.addRow = function(row) {
        if (row.length !== columnTitles.length) {
            return;
        }
        delete rows [0];
        for (var i = 1; i < numRows; i++) {
            rows[i - 1] = rows [i];
        }
        rows[numRows - 1] = row;
    };

    ScrollingTable.prototype.getLastRow = function() {
        var result = {};
        var the_row =  rows[numRows - 1];
        for (var i = 0; i < columnTitles.length; i++) {
            result[columnTitles[i]]  = the_row[i];
        }
        return result;
    };

    ScrollingTable.prototype.getLatestInfo = function() {
        var result = this.getLastRow();
        return result;
    };

    ScrollingTable.prototype.getColumns = function() {
        var i;
        var columns = {};

        for (i = 0; i < columnTitles.length; i++) {
            columns[columnTitles[i]] = Array();
        }

        for (i = 0; i < numRows; i++) {
            var the_row = rows[i];
            for (var j = 0; columnTitles < columnTitles.length; j++) {
                var columnTitle = columnTitles[j];
                columns[columnTitle][i] = rows[i][j];
            }
        }
    };

    ScrollingTable.prototype.getContents = function() {
        return rows;
    };

    ScrollingTable.prototype.getNumberOfRows = function() {
        return numRows;
    };

    ScrollingTable.prototype.getColumnTitles = function() {
        return columnTitles;
    };

    return ScrollingTable;
})();
