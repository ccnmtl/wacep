/**
 * @class AdminPuzzleGraph
 *
 * @param {Object} moves - All the data to be rendered.
 * @param {String} selector - Element to attach to when rendering.
 */
var AdminPuzzleGraph = function(moves, selector, type) {
    if (typeof type === 'undefined') {
        type = 'totals';
    }

    this.type = type;
    this.moves = moves;
    this.config = {
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            line: {
                lineWidth: 2
            },
            series: {
                animation: false
            }
        },
        title: {
            text: null
        },
        tooltip: {
            valuePrefix: '$'
        },
        xAxis: {
            categories: _.pluck(this.moves, 'year')
        },
        yAxis: {
            min: 0
        }
    };

    if (this.type === 'totals') {
        this.selector = selector + ' .wr-admin-totals';

        this.config = _.extend(this.config, {
            colors: ['#000000'],
            series: [{
                name: 'Inventory',
                type: 'line',
                data: _.pluck(this.moves, 'ending_inventory')
            }],
            yAxis: {
                title: {
                    text: 'Inventory ($)'
                }
            }
        });
    } else if (this.type === 'allocations') {
        this.selector = selector + ' .wr-admin-allocations';
        this.config = _.extend(this.config, {
            legend: {
                enabled: true
            },
            series: [
                {
                    name: 'Umbrellas',
                    type: 'column',
                    data: _.pluck(this.moves, 'umbrellas')
                },
                {
                    name: 'Shirts',
                    type: 'column',
                    data: _.pluck(this.moves, 'shirts')
                },
                {
                    name: 'Hats',
                    type: 'column',
                    data: _.pluck(this.moves, 'hats')
                }
            ],
            tooltip: {
                pointFormat: '<span style="color:{series.color}">' +
                    '{series.name}</span>: ' +
                    '<strong>{point.y}</strong> ' +
                    '({point.percentage:.0f}%)<br/>',
                shared: true,
                valuePrefix: '$'
            },
            yAxis: {
                title: {
                    text: 'Allocations (%)'
                }
            }
        });
    }
};

AdminPuzzleGraph.prototype.render = function() {
    if (typeof $().highcharts === 'undefined') {
        return;
    }

    var height = '120px';
    if (this.type === 'allocations') {
        height = '150px';
    }

    $(this.selector).width('100%').height(height).highcharts(this.config);
};


$(document).ready(function() {
    _.each(adminPuzzleGraphs, function(graph) {
        graph.render();
    });
});
