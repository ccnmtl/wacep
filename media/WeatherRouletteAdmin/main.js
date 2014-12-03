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
                },
                {
                    name: 'Extra',
                    data: this.moves
                }
            ],
            tooltip: {
                formatter: function() {
                    var str = '<strong style="text-decoration:underline;">' +
                        this.x + '</strong><br />';

                    _.each(this.points, function(p) {
                        if (p.series.name === 'Extra') {
                            str += 'Observation: ';
                            str += '<strong>' + p.point.rainfall_observation +
                                '</strong><br />';

                            str += 'Wet forecast: ';
                            str += '<strong>' + p.point.above_forecast +
                                '%</strong><br />';

                            str += 'Normal forecast: ';
                            str += '<strong>' + p.point.normal_forecast +
                                '%</strong><br />';

                            str += 'Dry forecast: ';
                            str += '<strong>' + p.point.below_forecast +
                                '%</strong><br />';
                        } else {
                            // It's just normal graph data - the player's
                            // betting allocation
                            str += '<span style="font-weight: bold; color: ' +
                            p.series.color + '">';
                            str += p.series.name;
                            str += '</span>: ';
                            str += '<strong>' + Math.round(p.percentage) +
                                '%</strong>';
                        }

                        str += '<br />';
                    });

                    return str;
                },
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
