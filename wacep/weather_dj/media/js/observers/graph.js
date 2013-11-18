function Graph ( ) {}
Graph.prototype = new Observer();
Graph.prototype.update = function ( ) {
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
