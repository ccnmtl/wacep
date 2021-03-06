(function() {
    window.ForecastApp = {
        Colors: {
            'nino_sst_anomalies': '#3399ff', /*light blue*/

            'named_storms':  '#ff0000', /*red*/
            'hurricanes': '#3300ff', /*dark blue*/
            'custom': '#009900', /*green*/

            'estimated': '#ff33ff', /*magenta*/
            'residuals': '#ff9900', /*gold*/

            'uncertainty': '#993399'  /*purple*/
        },
        Models: {},
        Views: {},
        Router: {},
        Math: {},
        inst: {},

        initialize: function() {
            // default data set
            this.inst.hurricanes = undefined;

            // default variable selections
            this.inst.predictor = 'nino_sst_anomalies';
            this.inst.predictand = 'hurricanes';
            this.inst.years_reserved = 10;

            // data subsets
            this.inst.regression_model = undefined;
            this.inst.crossvalidate = undefined;
            this.inst.forecast_model = undefined;

            if (!this.inst.hasOwnProperty('router')) {
                this.inst.router = new window.ForecastApp.Router();
            }
        }
    };

    window.ForecastApp.Math.quantiles = [0.05, 0.25, 0.75, 0.95];
    window.ForecastApp.Math.distribution_quantiles = [
        0.001, 0.01, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5,
        0.6, 0.7, 0.8, 0.9, 0.95, 0.99, 0.999];

    window.ForecastApp.Math
        .predicted_y = function(slope, intercept, predictor) {
        // y = mx + b
        return slope * predictor + intercept;
    };

    window.ForecastApp.Math
        .uncertainty = function(predicted_y, stdev_residuals) {
        var ctx = {};
        for (var i = 0; i < window.ForecastApp.Math.quantiles.length; i++) {
            var q = window.ForecastApp.Math.quantiles[i];
            ctx['' + q] = predicted_y +
                jStat.normal.inv(q, 0, stdev_residuals);
        }
        return ctx;
    };

    window.ForecastApp.Math.distribution = function(predictor, stdev_residuals,
                                             slope, intercept) {
        var ctx = {
            mean: window.ForecastApp.Math
                .predicted_y(slope, intercept, predictor),
            dist: {}
        };
        for (var i = 0;
             i < window.ForecastApp.Math.distribution_quantiles.length; i++) {
            var q = window.ForecastApp.Math.distribution_quantiles[i];
            var inv_norm = jStat.normal.inv(q, ctx.mean, stdev_residuals);
            ctx.dist['' + q] = {
                'inv_norm': inv_norm,
                'norm': jStat.normal.pdf(inv_norm, ctx.mean, stdev_residuals)
            };
        }
        return ctx;
    };

    window.ForecastApp.Models.HurricaneYear = Backbone.Model.extend({
        url: '/forecast/api/hurricane/'
    });

    window.ForecastApp.Models.HurricaneYears = Backbone.Collection.extend({
        url: '/forecast/api/hurricane/',
        model: window.ForecastApp.Models.HurricaneYear,
        parse: function(response) {
            return response.results || response;
        },
        comparator: function(item) {
            return item.get('year');
        },
        get_by_attr: function(attr, value) {
            for (var i = 0; i < this.length; i++) {
                var item = this.at(i);
                if (value === item.get(attr)) {
                    return item;
                }
            }
        },
        copy_attrs: function(attrs) {
            var keys = Object.keys(attrs);
            this.forEach(function(item) {
                for (var i = 0; i < keys.length; i++) {
                    var value = item.get(attrs[keys[i]]);
                    item.set(keys[i], value);
                }
            });
        },
        extremes: function(attr) {
            var min;
            var max;
            this.forEach(function(hurricane_year) {
                var value = hurricane_year.get(attr);
                if (min === undefined && max === undefined) {
                    min = value;
                    max = value;
                } else if (value < min) {
                    min = value;
                } else if (value > max) {
                    max = value;
                }
            });
            return {'min': min, 'max': max};
        },
        get_analyze_context: function() {
            // Highcharts requires arrays of data for each graph
            // Construct time series arrays for each data point
            var years = [];
            var nino = [];
            var storms = [];
            var hurricanes = [];
            var nino_vs_storms = [];
            var nino_vs_hurricanes = [];
            var custom = [];
            var nino_vs_custom = [];
            this.forEach(function(item) {
                years.push(item.get('year'));
                nino.push(item.get('nino_sst_anomalies'));
                storms.push(item.get('named_storms'));
                hurricanes.push(item.get('hurricanes'));
                nino_vs_storms.push([item.get('nino_sst_anomalies'),
                                         item.get('named_storms')]);
                nino_vs_hurricanes.push([item.get('nino_sst_anomalies'),
                                             item.get('hurricanes')]);
                custom.push(item.get('custom'));
                nino_vs_custom.push([item.get('nino_sst_anomalies'),
                                         item.get('custom')]);
            });

            // Provide some analysis on each data point
            return {
                'years': years,
                'storms': storms,
                'hurricanes': hurricanes,
                'nino': nino,
                'custom': custom,
                'nino_vs_storms': nino_vs_storms,
                'nino_vs_hurricanes': nino_vs_hurricanes,
                'nino_vs_custom': nino_vs_custom,
                'hurricane_data': this.toJSON(),
                'mean_storms': jStat.mean(storms),
                'mean_hurricanes': jStat.mean(hurricanes),
                'mean_nino': jStat.mean(nino),
                'mean_custom': jStat.mean(custom),
                'stdev_storms': jStat.stdev(storms),
                'stdev_hurricanes': jStat.stdev(hurricanes),
                'stdev_nino': jStat.stdev(nino),
                'stdev_custom': jStat.stdev(custom),
                'custom_name': this.custom_name
            };
        },
        get_predictand_label: function() {
            if (window.ForecastApp.inst.predictand === 'custom') {
                return window.ForecastApp.inst.hurricanes.custom_name;
            } else if (window.ForecastApp.inst.predictand === 'named_storms') {
                return 'Named Storms';
            } else {
                return 'Hurricanes';
            }
        },
        get_predictand_color: function() {
            return window.ForecastApp
                .Colors[window.ForecastApp.inst.predictand];
        },
        apply_model: function(slope, intercept, r_value) {
            var self = this;
            this.slope = slope;
            this.intercept = intercept;
            this.r_value = r_value;

            var all_predicted_y = [];
            var all_residuals = [];
            var all_predictands = [];

            this.forEach(function(item) {
                var predicted_y = window.ForecastApp.Math.predicted_y(
                    self.slope, self.intercept, item.get('predictor'));
                var residuals = predicted_y - item.get('predictand');
                item.set('predicted_y', predicted_y);
                item.set('residuals', residuals);

                all_predicted_y.push(predicted_y);
                all_residuals.push(residuals);
                all_predictands.push(item.get('predictand'));
            });

            this.mean_predictand = jStat.mean(all_predictands);
            this.mean_predicted_y = jStat.mean(all_predicted_y);
            this.mean_residuals = jStat.mean(all_residuals);
            this.stdev_predictand = jStat.stdev(all_predictands);
            this.stdev_predicted_y = jStat.stdev(all_predicted_y);
            this.stdev_residuals = jStat.stdev(all_residuals);

            // forecast: requires stdev_residuals be set before attempting
            this.forEach(function(item) {
                item.set('quantiles', window.ForecastApp.Math.uncertainty(
                    item.get('predicted_y'), self.stdev_residuals));
            });
            this.error_range = jStat.normal.inv(0.05, 0, this.stdev_residuals);
        },
        create_model: function(view) {
            var self = this;
            if (this.slope !== undefined) {
                view.trigger('render');
            } else {
                var predictor = [];
                var predictand = [];
                this.forEach(function(observation) {
                    predictor.push(observation.get('predictor'));
                    predictand.push(observation.get('predictand'));
                });

                jQuery.post(
                    '/forecast/regression/', {
                        predictor: predictor,
                        predictand: predictand
                    }, function(data) {
                        self.apply_model(
                            data.slope,
                            data.intercept, data.r_value);
                        view.trigger('render');
                    });
            }
        },
        get_model_context: function() {
            var ctx = {
                'observations': this.toJSON(),
                'slope': this.slope,
                'intercept': this.intercept,
                'r_value': this.r_value,
                'r_squared': Math.pow(this.r_value, 2),
                'mean_predictand': this.mean_predictand,
                'mean_predicted_y': this.mean_predicted_y,
                'mean_residuals': this.mean_residuals,
                'stdev_predictand': this.stdev_predictand,
                'stdev_predicted_y': this.stdev_predicted_y,
                'stdev_residuals': this.stdev_residuals,
                'error_range': this.error_range,
                'predictand_label': this.get_predictand_label(),
                'predictand_color': this.get_predictand_color(),
                predictor: [],
                predictand: [],
                predicted_y: [],
                residuals_vs_year: [],
                years: [],
                predictor_vs_predictand: [],
                predictor_vs_predicted_y: []};

            this.forEach(function(item) {
                ctx.years.push(item.get('year'));
                ctx.predictor.push(item.get('predictor'));
                ctx.predictand.push(item.get('predictand'));
                ctx.predicted_y.push(item.get('predicted_y'));
                ctx.residuals_vs_year.push([item.get('year'),
                                            item.get('residuals')]);
                ctx.predictor_vs_predictand.push([item.get('predictor'),
                                                  item.get('predictand')]);
                ctx.predictor_vs_predicted_y.push([item.get('predictor'),
                                                   item.get('predicted_y')]);
            });

            return ctx;
        }
    });

    window.ForecastApp.Views.OverviewView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'render');
            this.template = _.template(jQuery('#overview-template').html());
        },
        show: function() {
            this.render();
        },
        render: function() {
            jQuery(this.el).html(this.template({}));
            jQuery('div.pagination ul li').removeClass('active');
            jQuery('li.step-zero').removeClass('disabled').addClass('active');
        }
    });

    window.ForecastApp.Views.AnalyzeView = Backbone.View.extend({
        events: {
            'click #create-model-dialog .btn-primary': 'createModel',
            'click #add-predictand-dialog .btn-primary': 'addPredictand'
        },
        initialize: function(options) {
            _.bindAll(this, 'render', 'show', 'createModel', 'addPredictand');
            this.template = _.template(jQuery('#analyze-template').html());
        },
        show: function() {
            if (window.ForecastApp.inst.hurricanes === undefined) {
                window.ForecastApp.inst.hurricanes = new window.ForecastApp
                    .Models.HurricaneYears();
                window.ForecastApp.inst.hurricanes.on('reset', this.render);

                window.ForecastApp.inst.hurricanes.fetch({
                    data: {page_size: 200},
                    processData: true,
                    reset: true
                });
            } else {
                this.render();
            }
        },
        render: function() {
            var context = window.ForecastApp
                .inst.hurricanes.get_analyze_context();
            context.years_reserved = window.ForecastApp.inst.years_reserved;
            context.extremes = window.ForecastApp
                .inst.hurricanes.extremes('year');

            jQuery(this.el).html(this.template(context));

            jQuery('div.pagination ul li').removeClass('active');
            jQuery('li.step-one').removeClass('disabled').addClass('active');

            jQuery('table.table').tablesorter({sortList: [[0,0]]});

            jQuery('#nino-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'NINO 3.4 (ASO)'},
                xAxis: {
                    categories: context.years,
                    tickInterval: Math.round(context.years.length / 8),
                    title: {
                        text: 'Year'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Anomalies'
                    }
                },
                series: [
                    {
                        name: 'ASO NINO3.4 SST anomalies',
                        color: window.ForecastApp.Colors.nino_sst_anomalies,
                        showInLegend: false,
                        data: context.nino
                    }
                ]
            });

            var series1 = [{name: 'Named Storms', data: context.storms,
                            color: window.ForecastApp.Colors.named_storms},
                           {name: 'Hurricanes', data: context.hurricanes,
                            color: window.ForecastApp.Colors.hurricanes}];
            var series2 = [{name: 'Named Storms', data: context.nino_vs_storms,
                            color: window.ForecastApp.Colors.named_storms},
                           {name: 'Hurricanes',
                            data: context.nino_vs_hurricanes,
                            color: window.ForecastApp.Colors.hurricanes}];

            if (window.ForecastApp.inst.hurricanes.custom_name) {
                series1.push({
                    name: window.ForecastApp.inst.hurricanes.custom_name,
                    data: context.custom,
                    color: window.ForecastApp.Colors.custom
                });
                series2.push({
                    name: window.ForecastApp.inst.hurricanes.custom_name,
                    data: context.nino_vs_custom,
                    color: window.ForecastApp.Colors.custom
                });
            }

            jQuery('#predictand-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Observed Over Time'},
                xAxis: {categories: context.years,
                        tickInterval: Math.round(context.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}, min: 0},
                plotOptions: {series: {animation: false}},
                series: series1
            });

            jQuery('#predictand-vs-nino-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Observed vs Nino 3.4 (ASO)'},
                xAxis: {title: {text: 'ASO NINO3.4 SST anomalies'},
                        plotLines: [{color: '#000000', width: 1, value: 0}]},
                yAxis: {title: {text: 'Count'}},
                plotOptions: {
                    scatter: {
                        tooltip: {
                            headerFormat:
                            '<b>Observed vs Nino 3.4 (ASO)</b><br>',
                            pointFormat:
                            '{point.y} observed<br />{point.x} nino ' +
                                '3.4 anomalies'
                        }
                    }
                },
                series: series2
            });
        },
        createModel: function() {
            var reserve = jQuery('input#inputYearsReserved').val();
            if (reserve === undefined ||
                reserve < 1 ||
                reserve > window.ForecastApp.inst.hurricanes.length / 2) {
                jQuery('input#inputYearsReserved')
                    .parents('div.control-group').addClass('error');
                jQuery('input#inputYearsReserved').next().show();
                return;
            }

            window.ForecastApp.inst
                .predictand = jQuery('select#inputPredictand').val();
            window.ForecastApp.inst.years_reserved = parseInt(reserve, 10);

            window.ForecastApp.inst.hurricanes.copy_attrs({
                predictor: window.ForecastApp.inst.predictor,
                predictand: window.ForecastApp.inst.predictand});

            // parse up the analysis sets
            var years = window.ForecastApp
                .inst.hurricanes.length - window.ForecastApp
                .inst.years_reserved;
            window.ForecastApp.inst
                .regression_model = new window.ForecastApp
                .Models.HurricaneYears(
                    window.ForecastApp.inst.hurricanes.slice(0, years));
            window.ForecastApp.inst.crossvalidate = new window
                .ForecastApp.Models.HurricaneYears(
                    window.ForecastApp.inst.hurricanes
                        .slice(years,
                               window.ForecastApp.inst.hurricanes.length));
            window.ForecastApp.inst.forecast_model = new window.ForecastApp
                .Models.HurricaneYears(
                    window.ForecastApp.inst.hurricanes.slice(
                        0, window.ForecastApp.inst.hurricanes.length));

            jQuery('#create-model-dialog').modal('hide');

            window.ForecastApp.inst.router.navigate('build', {trigger: true});
        },
        addPredictand: function(evt) {
            var elt = jQuery('input[name="new-predictand-name"]');
            var name = jQuery(elt).val().trim();
            if (name.length < 1) {
                jQuery(elt).next().show();
                return;
            } else {
                jQuery(elt).next().hide();
            }

            var data = jQuery('textarea#pasted-data').val().trim();
            if (data.length < 1) {
                jQuery('#data-error')
                    .html('Paste data for your predictand')
                    .show();
                return;
            }

            var rows = data.split('\n');
            if (rows.length < 20) {
                jQuery('#data-error')
                    .html('The predictand must cover at least 20 years. ' +
                          'The pasted data only has ' + rows.length +
                          ' years.').show();
                return;
            }

            var extremes = window.ForecastApp.inst
                .hurricanes.extremes('year');
            var last_year;
            var collection = new window.ForecastApp
                .Models.HurricaneYears();
            for (var i = 0; i < rows.length; i++) {
                var cols = rows[i].split('\t');
                var year = parseInt(cols[0].trim(), 10);

                if (isNaN(year)) {
                    jQuery('#data-error')
                        .html('The predictand year ' + year +
                              ' is invalid.').show();
                    return;
                }
                if (year < extremes.min || year > extremes.max) {
                    jQuery('#data-error')
                        .html('The predictand year ' + year +
                              ' is out of the range ' + extremes.min +
                              '-' + extremes.max + '.').show();
                    return;
                }
                if (last_year !== undefined && year !== (last_year + 1)) {
                    jQuery('#data-error')
                        .html('The predictand year ' + year +
                              ' is not contiguous to the previous year ' +
                              last_year +
                              '.<br />Please sort your data by year.')
                        .show();
                    return;
                }
                last_year = year;

                var value = parseFloat(cols[1].trim());
                if (isNaN(value)) {
                    jQuery('#data-error')
                        .html('The predictand value ' + cols[1] +
                              ' is not a number.').show();
                    return;
                }

                var old_year = window.ForecastApp.inst
                    .hurricanes.get_by_attr('year', year);
                collection.add(new window.ForecastApp.Models.HurricaneYear({
                    year: year,
                    nino_sst_anomalies: old_year.get('nino_sst_anomalies'),
                    named_storms: old_year.get('named_storms'),
                    hurricanes: old_year.get('hurricanes'),
                    custom: value
                }));
            }

            window.ForecastApp.inst.hurricanes = collection;
            window.ForecastApp.inst.hurricanes.custom_name = name;
            jQuery('#add-predictand-dialog').modal('hide');
            this.render();
        }
    });

    window.ForecastApp.Views.BuildView = Backbone.View.extend({
        events: {
            'click #cross-validate-dialog .btn-primary': 'crossValidate'
        },
        initialize: function(options) {
            _.bindAll(this, 'render', 'show');
            this.template = _.template(jQuery('#build-template').html());
            this.on('render', this.render);
        },
        show: function() {
            window.ForecastApp.inst.regression_model.create_model(this);
        },
        render: function() {
            var ctx = window.ForecastApp.inst.regression_model
                .get_model_context();
            ctx.years_reserved = window.ForecastApp.inst.years_reserved;
            ctx.hurricane_data_length = window.ForecastApp
                .inst.hurricanes.length;

            var markup = this.template(ctx);
            jQuery(this.el).html(markup);

            jQuery('div.pagination ul li').removeClass('active');
            jQuery('li.step-two').removeClass('disabled').addClass('active');

            jQuery('table.table').tablesorter({sortList: [[0,0]]});

            // Graphs
            jQuery('#actual-v-predicted-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Observed  vs. Estimated'},
                xAxis: {categories: ctx.years,
                        tickInterval: Math.round(ctx.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}},
                series: [
                    {
                        name: 'Observed',
                        data: ctx.predictand,
                        color: ctx.predictand_color
                    },
                    {
                        name: 'Estimated',
                        data: ctx.predicted_y,
                        color: window.ForecastApp.Colors.estimated
                    }
                ]
            });

            jQuery('#residuals-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Residuals'},
                xAxis: {categories: ctx.years,
                    tickInterval: Math.round(ctx.years.length / 8),
                    title: {text: 'Year'}},
                yAxis: {
                    plotLines: [
                        {
                            color: '#000000',
                            width: 1,
                            value: 0
                        }
                    ],
                    title: {
                        text: 'Count'
                    }
                },
                series: [
                    {
                        name: 'Residuals',
                        showInLegend: false,
                        data: ctx.residuals_vs_year,
                        color: window.ForecastApp.Colors.residuals
                    }
                ]
            });

            jQuery('#actualandpredicted-v-observed-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Observed and Estimated vs Predictor'},
                xAxis: {title: {text: 'Predictor'}},
                yAxis: {title: {text: 'Count'}},
                series: [
                    {
                        name: 'Observed',
                        data: ctx.predictor_vs_predictand,
                        color: ctx.predictand_color
                    },
                    {
                        name: 'Estimated',
                        data: ctx.predictor_vs_predicted_y,
                        color: window.ForecastApp.Colors.estimated
                    }
                ]
            });
        }
    });

    window.ForecastApp.Views.ValidateView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, 'render', 'show');

            this.template =
                _.template(jQuery('#validate-template').html());
            this.on('render', this.render);
        },
        show: function() {
            window.ForecastApp.inst.crossvalidate.apply_model(
                window.ForecastApp.inst.regression_model.slope,
                window.ForecastApp.inst.regression_model.intercept,
                window.ForecastApp.inst.regression_model.r_value);
            window.ForecastApp.inst.forecast_model.create_model(this);
        },
        render: function() {
            var ctx = window.ForecastApp.inst.crossvalidate.get_model_context();
            ctx.years_reserved = window.ForecastApp.inst.years_reserved;
            ctx.hurricane_data_length = window.ForecastApp
                .inst.hurricanes.length;
            ctx.forecast = window.ForecastApp.inst
                .forecast_model.get_model_context();
            ctx.regression_model = window.ForecastApp
                .inst.regression_model.get_model_context();

            var markup = this.template(ctx);
            jQuery(this.el).html(markup);

            jQuery('div.pagination ul li').removeClass('active');
            jQuery('li.step-three').removeClass('disabled').addClass('active');

            jQuery('table.table').tablesorter({sortList: [[0,0]]});

            // Graphs
            var startIdx = window.ForecastApp.inst.hurricanes.length -
                window.ForecastApp.inst.years_reserved;

            var years = [];
            var boxplot_data = [];
            for (var i = startIdx;
                 i < (startIdx + window.ForecastApp.inst.years_reserved); i++) {
                var observation = window.ForecastApp.inst.forecast_model.at(i);
                years.push(observation.get('year'));

                var data = [];
                var uncertainty = observation.get('quantiles');
                data.push(uncertainty['0.05']);
                data.push(uncertainty['0.25']);
                data.push(observation.get('predicted_y'));
                data.push(uncertainty['0.75']);
                data.push(uncertainty['0.95']);
                boxplot_data.push(data);
            }
            jQuery('#predictand-with-uncertainty').highcharts({
                chart: {},
                title: {text: 'Observed vs. Estimated with Uncertainty'},
                xAxis: {categories: years, title: {text: 'Years'}},
                yAxis: {title: {text: 'Count'}},
                series: [
                    {
                        name: 'Uncertainty',
                        type: 'boxplot',
                        data: boxplot_data,
                        color: window.ForecastApp.Colors.uncertainty},
                    {
                        name: 'Observed',
                        type: 'scatter',
                        data: ctx.predictand,
                        color: ctx.predictand_color
                    },
                    {
                        name: 'Estimated',
                        type: 'line',
                        data: ctx.predicted_y,
                        color: window.ForecastApp.Colors.estimated
                    }
                ]
            });
        }
    });

    window.ForecastApp.Views.ForecastView = Backbone.View.extend({
        events: {
            'click #change-nino-value': 'updateSlideValue'
        },
        initialize: function(options) {
            _.bindAll(this, 'render', 'render_custom_forecast', 'slideValue',
                      'updateSlideValue', 'sliderTicks');
            this.on('render', this.render);
            this.on('render-custom-forecast', this.render_custom_forecast);
            this.template =
                _.template(jQuery('#forecast-template').html());
            this.custom_forecast_template =
                _.template(jQuery('#custom-forecast-template').html());
        },
        updateSlideValue: function(evt, ui) {
            var model = window.ForecastApp.inst
                .forecast_model.get_model_context();
            var value = parseFloat(jQuery('#nino-value').val());
            var min = jQuery('#nino-value-slider').slider('option', 'min');
            var max = jQuery('#nino-value-slider').slider('option', 'max');

            if (isNaN(value) || value < min || value > max) {
                jQuery(this.el).find('.help-inline.error').show();
            } else {
                jQuery(this.el).find('.help-inline.error').hide();
                jQuery('#nino-value-slider').slider('value', value);
            }
            this.trigger('render-custom-forecast');
        },
        slideValue: function(evt, ui) {
            jQuery('#nino-value').val(ui.value.toFixed(2));
            this.trigger('render-custom-forecast');
        },
        sliderTicks: function(el) {
            var max =  jQuery(el).slider('option', 'max');
            var min =  jQuery(el).slider('option', 'min');
            var spacing =  100 / (max - min);

            jQuery(el).find('.ui-slider-tick-mark').remove();
            for (var i = 0; i < max - min; i++) {
                jQuery('<span class="ui-slider-tick-mark"></span>')
                    .css('left', (spacing * i) +  '%').appendTo(jQuery(el));
            }

            jQuery('<span class="ui-slider-tick-mark"></span>')
                .css('left', '100.2%').appendTo(jQuery(el));
        },
        show: function() {
            this.graph = undefined;
            this.render();
        },
        render: function() {
            var self = this;

            var ctx = window.ForecastApp
                .inst.forecast_model.get_model_context();
            ctx.startIdx = window.ForecastApp
                .inst.hurricanes.length - window.ForecastApp
                .inst.years_reserved;
            ctx.years_reserved = window.ForecastApp.inst.years_reserved;
            ctx.extremes = window.ForecastApp
                .inst.hurricanes.extremes('nino_sst_anomalies');

            var predictors = [ctx.stdev_residuals / 2,
                              -(ctx.stdev_residuals / 2), 0];
            ctx.forecast = [];
            for (var i = 0; i < predictors.length; i++) {
                var predicted_y = window.ForecastApp.Math
                    .predicted_y(ctx.slope, ctx.intercept, predictors[i]);
                var model = window.ForecastApp.Math
                    .uncertainty(predicted_y, ctx.stdev_residuals);
                model.predictor = predictors[i];
                model.predicted_y = predicted_y;
                ctx.forecast.push(model);
            }

            var markup = this.template(ctx);
            jQuery(this.el).html(markup);

            jQuery('div.pagination ul li').removeClass('active');
            jQuery('li.step-four').removeClass('disabled').addClass('active');

            jQuery('table.table').tablesorter();

            jQuery('#nino-value-slider').slider({
                value: 0,
                min: ctx.extremes.min,
                max: ctx.extremes.max,
                step: 0.01,
                create: function(event, ui) {
                    self.sliderTicks(event.target);
                }
            });
            jQuery('#nino-value-slider').slider().on('slide', this.slideValue);

            this.trigger('render-custom-forecast');
        },
        render_custom_forecast: function() {
            var model = window.ForecastApp.inst
                .forecast_model.get_model_context();
            var predictor = jQuery('#nino-value-slider').slider('value');
            var ctx = window.ForecastApp.Math.distribution(predictor,
                model.stdev_residuals, model.slope, model.intercept);

            var extremes = window.ForecastApp
                .inst.forecast_model.extremes('nino_sst_anomalies');

            var markup = this.custom_forecast_template(ctx);
            jQuery(this.el).find('div.custom-forecast').html(markup);

            jQuery(this.el)
                .find('span#custom-forecast-predicted')
                .html(ctx.mean.toFixed(2));

            var data = [];

            var keys = Object.keys(ctx.dist);
            for (var i = 0; i < keys.length; i++) {
                data.push([ctx.dist[keys[i]].inv_norm, ctx.dist[keys[i]].norm]);
            }

            if (this.graph === undefined) {
                var min_dist = window.ForecastApp.Math
                    .distribution(extremes.min,
                    model.stdev_residuals, model.slope, model.intercept).dist;
                var max_dist = window.ForecastApp.Math
                    .distribution(extremes.max,
                    model.stdev_residuals, model.slope, model.intercept).dist;

                var graph_min = min_dist['0.001']
                    .inv_norm < max_dist['0.001'].inv_norm ?
                    min_dist['0.001'].inv_norm : max_dist['0.001'].inv_norm;
                var graph_max = min_dist['0.999']
                    .inv_norm > max_dist['0.999'].inv_norm ?
                    min_dist['0.999'].inv_norm : max_dist['0.999'].inv_norm;

                jQuery('#custom-forecast-graph').highcharts({
                    chart: {type: 'spline'},
                    title: {text: 'Prediction & Uncertainty Range'},
                    xAxis: {min: graph_min - 1, max: graph_max + 1,
                        title: {text: 'Count'},
                        tickInterval: 2,
                        plotLines: [{color: '#C0C0C0', width: 1, value: 0}]},
                    yAxis: {
                        min: 0,
                        max: 0.2,
                        title: {
                            text: 'Probability Density'
                        }
                    },
                    series: [
                        {
                            name: 'Prediction Range',
                            data: data,
                            color: window.ForecastApp.Colors.estimated
                        }
                    ]
                });
                this.graph = jQuery('#custom-forecast-graph').highcharts();
            } else {
                this.graph.series[0].update({data: data});
            }
        }
    });

    var overviewView = new window.ForecastApp.Views.OverviewView({
        el: jQuery('div.forecast-step')
    });

    var analyzeView = new window.ForecastApp.Views.AnalyzeView({
        el: jQuery('div.forecast-step')
    });

    var buildView = new window.ForecastApp.Views.BuildView({
        el: jQuery('div.forecast-step')
    });

    var validateView = new window.ForecastApp.Views.ValidateView({
        el: jQuery('div.forecast-step')
    });

    var forecastView = new window.ForecastApp.Views.ForecastView({
        el: jQuery('div.forecast-step')
    });

    window.ForecastApp.Router = Backbone.Router.extend({
        routes: {
            '': 'overview',
            'overview': 'overview',
            'analyze': 'analyze',
            'build': 'build',
            'validate': 'validate',
            'forecast': 'forecast',
            'help': 'help'
        },
        initialize: function() {
            jQuery('#reset').click(function(e) {
                window.ForecastApp.initialize();
                jQuery('div.pagination.primary ul li')
                    .addClass('disabled').removeClass('active');
                window.ForecastApp
                    .inst.router.navigate('overview', {trigger: true});
            });
        },
        overview: function() {
            overviewView.show();
        },
        analyze: function() {
            analyzeView.show();
        },
        build: function() {
            if (window.ForecastApp.inst.regression_model === undefined ||
                    window.ForecastApp.inst.regression_model.length < 1) {
                this.navigate('overview', {trigger: true});
            } else {
                buildView.show();
            }
        },
        validate: function() {
            if (window.ForecastApp.inst.regression_model === undefined ||
                    window.ForecastApp.inst.regression_model.length < 1) {
                this.navigate('overview', {trigger: true});
            } else if (window.ForecastApp.inst.crossvalidate === undefined ||
                       window.ForecastApp.inst.crossvalidate.length < 1) {
                this.navigate('build', {trigger: true});
            } else {
                validateView.show();
            }
        },
        forecast: function() {
            if (window.ForecastApp.inst.regression_model === undefined ||
                    window.ForecastApp.inst.regression_model.length < 1) {
                this.navigate('overview', {trigger: true});
            } else if (window.ForecastApp.inst.crossvalidate === undefined ||
                       window.ForecastApp.inst.crossvalidate.length < 1) {
                this.navigate('build', {trigger: true});
            } else if (window.ForecastApp
                       .inst.crossvalidate.slope === undefined) {
                this.navigate('validate', {trigger: true});
            } else {
                forecastView.show();
            }
        }
    });

    window.ForecastApp.initialize();
    Backbone.history.start();
})();
