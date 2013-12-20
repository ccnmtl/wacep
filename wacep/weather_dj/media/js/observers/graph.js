
function Graph ( ) {}
Graph.prototype = new Observer();

Graph.prototype.update = function ( ) {
    var latest_data = this.getSubject().getLastRow();
    var date = Date.parse(latest_data.date);
    jQuery('.graph').highcharts().series[0].addPoint([date, latest_data.precipitation], true, true);
    jQuery('.graph').highcharts().series[1].addPoint([date, latest_data.runoff], true, true);
    jQuery('.graph').highcharts().series[2].addPoint([date, latest_data.groundwater], true, true);
    jQuery('.graph').highcharts().series[3].addPoint([date, latest_data.streamflow], true, true);
};

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
                text: '',
                x: -20 //center
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    millisecond: '0',
                    second: '0',
                    minute: '0',
                    hour: '0',
                    day: '%b %e',
                    month: '0',
                    year: '0'
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
                data: initial_data,
                color: "#0d233a", // dark blue
                type: "column"
            }, {
                name: 'runoff',
                data: initial_data,
                color: "#910000", // purple
                type: "spline"
            }, {
                name: 'groundwater',
                data: initial_data,
                color: "#8bbc21", // green
                type: "spline"                    
            }, {
                name: 'streamflow',
                data: initial_data,
                color: "#2f7ed8", // light blue
                type: "spline"                    
            }]
        });
};