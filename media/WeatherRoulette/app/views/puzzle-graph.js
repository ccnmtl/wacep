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
                    var vals = ['Dry', 'Normal', 'Wet'];
                    var s = '';
                    if (this.y >= 0 && this.y <= 2) {
                        s = vals[this.y];
                    }
                    s = this.x + ': ' + s;
                    return s;
                }
            },
            xAxis: {
                categories: this.get('controller.years')
            },
            yAxis: {
                floor: 0,
                min: 0,
                ceiling: 2,
                max: 2,
                labels: {
                    formatter: function() {
                        var s = '';

                        if (this.value === 0) {
                            s = 'Dry';
                        } else if (this.value === 1) {
                            s = 'Norm.';
                        } else if (this.value === 2) {
                            s = 'Wet';
                        }

                        return s;
                    },
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
