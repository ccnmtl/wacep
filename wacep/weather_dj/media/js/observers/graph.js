
function Graph ( ) {}
Graph.prototype = new Observer();

Graph.prototype.update = function ( ) {
    var chart = jQuery('.graph').highcharts();
    var latest_data = this.getSubject().getLastRow();
    var milliseconds = Date.parse(latest_data.date);
    var shift = chart.series[0].data.length > 60;
    
    // resize the yAxis if needed
    if (chart.yAxis[0].getExtremes().max < latest_data.precipitation) {
        chart.yAxis[0].setExtremes(0, latest_data.precipitation)
    } else if (chart.yAxis[0].getExtremes().max < latest_data.runoff) {
        chart.yAxis[0].setExtremes(0, latest_data.runoff)
    } else if (chart.yAxis[0].getExtremes().max < latest_data.groundwater) {
        chart.yAxis[0].setExtremes(0, latest_data.groundwater)
    } else if (chart.yAxis[0].getExtremes().max < latest_data.streamflow) {
        chart.yAxis[0].setExtremes(0, latest_data.streamflow)
    } 
    
    // addPoint -- data, redraw, shift, animate
    chart.series[0].addPoint([milliseconds, latest_data.precipitation], true, shift);
    chart.series[1].addPoint([milliseconds, latest_data.runoff], true, shift);
    chart.series[2].addPoint([milliseconds, latest_data.groundwater], true, shift);
    chart.series[3].addPoint([milliseconds, latest_data.streamflow], true, shift);
};

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Graph.prototype.prepareDOM = function () {
    var today = new Date();
    var tomorrow = today.addDays(1);
    initial_data = [[today.getTime(), 0]];
    
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
                    week: '%b %e',
                    month: '0',
                    year: '0'
                },
                tickPixelInterval: 24 * 3600 * 1000,
                tickInterval: 24 * 7 * 3600 * 1000,
                showFirstLabel: true,
                startOnTick: true
            },
            yAxis: {
                title: {
                    text: 'levels'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                max: 6
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
                color: "#B6BDC4", // dark blue
                type: "column",
                pointStart: tomorrow
            }, {
                name: 'runoff',
                data: initial_data,
                color: "#910000", // purple
                type: "spline",
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                pointStart: tomorrow
            }, {
                name: 'groundwater',
                data: initial_data,
                color: "#8bbc21", // green
                type: "spline",
                lineWidth: 2,
                marker: {
                    enabled: false
                },
                pointStart: tomorrow
            }, {
                name: 'streamflow',
                data: initial_data,
                color: "#2f7ed8", // light blue
                type: "spline",
                lineWidth: 5,
                marker: {
                    enabled: false
                },
                pointStart: tomorrow
            }]
        });
};