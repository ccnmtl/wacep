var AdminPuzzleGraph = function(moves, playerName, selector) {
    this.moves = moves;
    this.selector = selector;
    this.config = {
        colors: ['#000000'],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            line: {
                lineWidth: 2
            },
            series: {
                animation: false
            }
        },
        series: [{
            name: 'Inventory',
            data: this.moves
        }],
        title: playerName,
        xAxis: {
            categories: []
        }
    };
};

AdminPuzzleGraph.prototype.render = function() {
    if (typeof $().highcharts === 'undefined') {
        return;
    }

    $(this.selector).width('100%').height('120px').highcharts(this.config);
};

$(document).ready(function() {
    _.each(adminPuzzleGraphs, function(graph) {
        graph.render();
    });
});
