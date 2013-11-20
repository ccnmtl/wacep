
function Graph ( ) {}
Graph.prototype = new Observer();

Graph.prototype.update = function ( ) {
    var latest_data = this.getSubject().getLastRow();
    var date = Date.parse(latest_data['date']);
    jQuery('.graph').highcharts().series[0].addPoint([date, latest_data['precipitation']], true, true);
    jQuery('.graph').highcharts().series[1].addPoint([date, latest_data['runoff'       ]], true, true);
    jQuery('.graph').highcharts().series[2].addPoint([date, latest_data['groundwater'  ]], true, true);
    jQuery('.graph').highcharts().series[3].addPoint([date, latest_data['streamflow'   ]], true, true);
}

Graph.prototype.prepareDOM = function () {

    initial_data = [
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0],
        [(new Date()).getTime(), 0]
    ];

     $('.graph').highcharts({
            chart: {
                width: 780
            },
            title: {
                text: 'title',
                x: -20 //center
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    millisecond: '',
                    second: '',
                    minute: '',
                    hour: '',
                    day: '%b %e',
                    month: '',
                    year: ''
                },
                tickPixelInterval: 30,
                tickInterval: 24 * 3600 * 1000,
            },
            yAxis: {
                title: {
                    text: 'y axis'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'precipitation',
                data: initial_data
            }, {
                name: 'runoff',
                data: initial_data
            }, {
                name: 'groundwater',
                data: initial_data
            }, {
                name: 'streamflow',
                data: initial_data
            }]
        });

    /*
    var content = "<table><tbody>"
    var titles = this.getSubject().getColumnTitles();
    console.log (titles);


    content += '<tr>';
    for(i=0; i<titles.length; i++){
        content += '<td>' + titles[i] + '</td>';
    }
    content += '</tr>';

    for(i=0; i<this.getSubject().getNumberOfRows(); i++){
        content += '<tr>';



        for(j=0; j<columnLabels.length; j++){
            // content += '<td class = "the_td row_' + i + ' column_' + j + '">' + 'row_' +  i + ', column_' +  j + '</td>';
            content += '<td class = "the_td row_' + i + ' column_' + j + '"></td>'
        }
        content += '</tr>';
    }
    content += "</tbody></table>"
    $('.table_span').append(content);
    */
}