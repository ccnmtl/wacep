
function Table ( ) {}
Table.prototype = new Observer();

Table.prototype.update = function ( ) {
    contents = this.getSubject().getContents();
    for(var i=0; i<contents.length; i++){
        if (contents[i] != null) {
            for(var j=0; j<contents[i].length; j++){
                css_class = '.the_td.row_' + i + '.column_'+ j;
                jQuery(css_class ).html (  contents[i][j]  );
            }
        }
    }
}

Table.prototype.prepareDOM = function () {
    var content = "<table><tbody>"
    var titles = this.getSubject().getColumnTitles();
    content += '<tr>';
	    for(i=0; i<titles.length; i++){
	        content += '<td>' + titles[i] + '</td>';
	    }
    content += '</tr>';
    for(i=0; i<this.getSubject().getNumberOfRows(); i++){
        content += '<tr>';
        for(j=0; j<columnLabels.length; j++){
            content += '<td class = "the_td row_' + i + ' column_' + j + '"></td>'
        }
        content += '</tr>';
    }
    content += "</tbody></table>"
    $('.table_span').append(content);
}