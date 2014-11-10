import Em from 'ember';

/**
 * view:puzzle-graph
 *
 * A wrapper for Highcharts.
 */
export default Em.View.extend({
    classNames: ['roulette-graph'],

    init: function() {
        Em.debug('view:puzzle-graph init');
        this._super();
    },

    willInsertElement: function() {
        Em.debug('view:puzzle-graph willInsertElement');
        this._super();
    },

    didInsertElement: function() {
        this._super();
        this.refreshGraph();
        this.addObserver('graphConfig', this, this.refreshGraph);
    },

    // Highcharts configuration
    // http://api.highcharts.com/highcharts
    graphConfig: function () {
        return {
            chart: {
                animation: false
            },
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
            },
            series: [{
                name: 'Observation',
                data: this.get('controller.observationGraphValues')
            }],
            title: {
                text: null
            },
            tooltip: {
                formatter: function() {
                    return 'Inventory in ' + this.x +
                        ': <strong>$' + this.y + '</strong>';
                }
            },
            xAxis: {
                categories: this.get('controller.years')
            },
            yAxis: {
                floor: 0,
                min: 0,
                labels: {
                    step: 1
                },
                title: {
                    text: null
                }
            }
        };
    }.property(
        'controller.observationGraphValues.@each',
        'controller.years.@each'
    ),

    refreshGraph: function() {
        Em.debug('view:puzzle-graph refreshGraph');
        var me = this;
        this.get('controller.model.puzzleRounds')
            .then(function() {
                me.$().width('100%').height('120px').highcharts(
                    me.get('graphConfig'));
            });
    }
});
