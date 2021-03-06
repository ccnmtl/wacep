
function Table ( ) {}
Table.prototype = new Observer();

Table.prototype.update = function ( ) {
    "use strict";
	function round_to_two_decimals (num) {
		if (typeof num == "number") {
			return Math.round(num * 100) / 100;
		}
		return num;
	}

    var contents = this.getSubject().getContents();
    for(var i=0; i<contents.length; i++){
        if (contents[i] != null) {
            for(var j=0; j<contents[i].length; j++){
                var css_class = '.weather_dj_table_td.row_' + i + '.column_'+ j;
                jQuery(css_class ).html (  round_to_two_decimals(contents[i][j] ) );
            }
        }
    }
};

Table.prototype.prepareDOM = function () {
    "use strict";
    var i;
    var content = '<table class="weather_dj_table table table-bordered">';
    var titles = this.getSubject().getColumnTitles();
    content += '<thead>';
    for(i=0; i<titles.length; i++){
        content += '<th>' + titles[i] + '</th>';
    }
    content += '</thead><tbody>';
    for(i=0; i<this.getSubject().getNumberOfRows(); i++){
        content += '<tr>';
        for(var j=0; j<titles.length; j++){
            content += '<td class = "weather_dj_table_td row_' + i + ' column_' + j + '"></td>';
        }
        content += '</tr>';
    }
    content += "</tbody></table>";
    $('.table_span').append(content);
};