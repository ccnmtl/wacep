(function() {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    window.ForecastApp = {
        Models: {},
        Views: {},
        Router: {},
        Math: {},
        
        instance: {
            'hurricanes': undefined, // HurricaneYearCollection from server
            'router': undefined,
            
            // data set selection
            'predictor': 'nino_sst_anomalies',
            'predictand': 'hurricanes',
            'years_reserved': 10,

            // collections created at each example step
            'observations': undefined,
            'crossvalidate': undefined,
            'forecast_model': undefined,
        },
        reset: function() {
            this.hurricanes= undefined; // HurricaneYearCollection
            this.router = undefined;
            
            // data set selection
            this.predictor = 'nino_sst_anomalies';
            this.predictand = 'hurricanes';
            this.years_reserved = 10;
            
            this.observations = undefined;
            this.crossvalidate = undefined;
        }
    };
    
    ForecastApp.Math.quantiles = [0.05, 0.25, 0.75, 0.95];
    
    ForecastApp.Math.predicted_y = function(slope, intercept, predictor) {
        return slope * predictor + intercept;
    };

    ForecastApp.Math.uncertainty = function(model, predicted_y) {
        var ctx = {};        
        for (var i=0; i < ForecastApp.Math.quantiles.length; i++) {
            var q = ForecastApp.Math.quantiles[i];
            ctx['' + q] = predicted_y +  jStat.normal.inv(q, 0, model.stdev_residuals);
        }
        return ctx;
    };
    
    ForecastApp.Models.HurricaneYear = Backbone.Model.extend({
        url: '/forecast/api/hurricane/'
    });
    
    ForecastApp.Models.HurricaneYearCollection = Backbone.Collection.extend({
        url: '/forecast/api/hurricane/',
        model: ForecastApp.Models.HurricaneYear,
        parse: function(response) {
            return response.results || response;
        },
        comparator: function(item) {
            return item.get('year');
        },
        extremes: function(attr) {
            var min = 0;
            var max = 0;
            this.forEach(function (hurricane_year) {
                var value = hurricane_year.get(attr);
                if (value < min) {
                    min = value;
                }
                if (value > max) {
                    max = value;
                }
            });
            return {'min': min, 'max': max};
        },
        get_context: function() {
            // Highcharts requires arrays of data for each graph
            // Construct time series arrays for each data point
            var years = [];
            var nino = [];
            var storms = [];
            var hurricanes = [];
            var nino_versus_storms = [];
            var nino_versus_hurricanes = [];
            this.forEach(function (hurricane_year) {
                years.push(hurricane_year.get('year'));
                nino.push(hurricane_year.get('nino_sst_anomalies'));
                storms.push(hurricane_year.get('named_storms'));
                hurricanes.push(hurricane_year.get('hurricanes'));
                nino_versus_storms.push([hurricane_year.get('nino_sst_anomalies'),
                                         hurricane_year.get('named_storms')]);                    
                nino_versus_hurricanes.push([hurricane_year.get('nino_sst_anomalies'),
                                             hurricane_year.get('hurricanes')]);                    
            });                
            
            // Provide some analysis on each data point
            return {
                'years': years,
                'storms': storms,
                'hurricanes': hurricanes,
                'nino': nino,
                'nino_versus_storms': nino_versus_storms,
                'nino_versus_hurricanes': nino_versus_hurricanes,
                'hurricane_data': this.toJSON(),
                'mean_storms': jStat.mean(storms).toFixed(2),
                'mean_hurricanes': jStat.mean(hurricanes).toFixed(2),
                'mean_nino': jStat.mean(nino).toFixed(2),
                'stdev_storms': jStat.stdev(storms).toFixed(2),
                'stdev_hurricanes': jStat.stdev(hurricanes).toFixed(2),
                'stdev_nino': jStat.stdev(nino).toFixed(2)        
            };
        }
    });
    
    
    ForecastApp.Models.Observation = Backbone.Model.extend({
        initialize: function(options) {
            this.set('year', options.year);
            this.set('predictor', options.predictor);
            this.set('predictand', options.predictand);
        }
    });
    ForecastApp.Models.ObservationCollection = Backbone.Collection.extend({
        model: ForecastApp.Models.Observation,
        build: function (data, startIdx, endIdx, predictand) {
            for (var i=startIdx; i < endIdx; i++) {
                var dt = data.at(i);
                this.add(new ForecastApp.Models.Observation({
                    year: dt.get('year'),
                    predictor: dt.get('nino_sst_anomalies'),
                    predictand: dt.get(predictand)}));
            }
        },
        apply_forecast: function() {
            var self = this;
            self.forEach(function(observation) {
                var ctx = ForecastApp.Math.uncertainty(self, observation.get('predicted_y'));
                observation.set('quantiles', ctx);
            });
            self.forecast_error_range = jStat.normal.inv(0.05, 0, self.stdev_residuals); 
        },
        apply_model: function() {
            var self = this;
            var all_predicted_y = [];
            var all_residuals = [];
            
            this.forEach(function(observation) {
                var predicted_y = ForecastApp.Math.predicted_y(self.slope, self.intercept, observation.get('predictor')); 
                var residuals = predicted_y - observation.get('predictand');
                observation.set('predicted_y', predicted_y);
                observation.set('residuals', residuals);
                
                all_predicted_y.push(predicted_y);
                all_residuals.push(residuals);
            });
            
            this.mean_predicted_y = jStat.mean(all_predicted_y).toFixed(2);
            this.mean_residuals = jStat.mean(all_residuals).toFixed(2);
            this.stdev_predicted_y = jStat.stdev(all_predicted_y).toFixed(2);
            this.stdev_residuals = jStat.stdev(all_residuals).toFixed(2);   
        },
        create_model: function(view) {
            var self = this;
            if (this.slope !== undefined) {
                view.trigger("render");
            } else {
                var predictor = [];
                var predictand =[];
                this.forEach(function(observation) {
                    predictor.push(observation.get('predictor'));
                    predictand.push(observation.get('predictand'));
                });
            
                jQuery.post("/forecast/regression/",
                            {predictor: predictor,
                             predictand: predictand},
                            function(data) {
                                 self.slope = data.slope;
                                 self.intercept = data.intercept;
                                 self.r_value = data.r_value;
                                 self.apply_model();
                                 self.apply_forecast();
                                 view.trigger("render");
                             });
            }
        },
        update_model: function(slope, intercept, r_value) {
            // use pre-existing slope & intercept to set the predicted_y
            this.slope = slope;
            this.intercept = intercept;
            this.r_value = r_value;
            this.apply_model();
        },
        year_comparator: function(item) {
            return item.get('year');
        },
        predictor_comparator: function(item) {
            return item.get('predictor');
        },
        get_context: function(sort_by) {
            if (sort_by === 'predictor') {
                this.comparator = this.predictor_comparator;
            } else { 
                this.comparator = this.year_comparator;
            }
            this.sort();

            var ctx = {
                'observations': this.toJSON(),
                'slope': this.slope,
                'intercept': this.intercept,
                'r_value': this.r_value,
                'r_squared': Math.pow(this.r_value, 2),
                'mean_predicted_y': this.mean_predicted_y,
                'mean_residuals': this.mean_residuals,
                'stdev_predicted_y': this.stdev_predicted_y,
                'stdev_residuals': this.stdev_residuals,
                'forecast_error_range': this.forecast_error_range,
                predictor: [],
                predictand: [],
                predicted_y: [],
                residuals: [],
                years: []};

            this.forEach(function(observation) {
                ctx.years.push(observation.get('year'));
                ctx.predictor.push(observation.get('predictor').toFixed(2));
                ctx.predictand.push(observation.get('predictand'));
                ctx.predicted_y.push(observation.get('predicted_y'));
                ctx.residuals.push(observation.get('residuals'));
            });
            return ctx;
        }
    });    
    
    ForecastApp.Views.AnalyzeView = Backbone.View.extend({
        events: {
            "click #create-model-dialog .btn-primary": 'createModel',
            "click ul.nav a": 'changeTab'
        },
        initialize: function(options) {
            _.bindAll(this, "render", "show", "createModel", "changeTab");

            this.template =
                _.template(jQuery("#analyze-template").html());
        },
        changeTab: function(evt) {
            evt.preventDefault();
            jQuery(evt.target).tab('show');
        },
        show: function() {
            if (ForecastApp.instance.hurricanes === undefined) {
                ForecastApp.instance.hurricanes = new ForecastApp.Models.HurricaneYearCollection();            
                ForecastApp.instance.hurricanes.on("reset", this.render);

                ForecastApp.instance.hurricanes.fetch({
                    data: {page_size: 200},
                    processData: true,
                    reset: true
                });
            } else {
                this.render();
            }
        },
        render: function() {
            var context = ForecastApp.instance.hurricanes.get_context();
            context.years_reserved = ForecastApp.instance.years_reserved;
            
            var markup = this.template(context);            
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-one").removeClass("disabled").addClass("active");
            
            jQuery("table.table").tablesorter({sortList: [[0,0]]});
            
            jQuery('#nino-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'NINO 3.4 (ASO)'},
                xAxis: {categories: context.years,
                        tickInterval: Math.round(context.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Anomalies'}},
                series: [{animation: false, name: "ASO NINO3.4 SST anomalies",
                          showInLegend: false, data: context.nino}]
            });
            
            jQuery('#predictand-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Observed Over Time'},
                xAxis: {categories: context.years,
                        tickInterval: Math.round(context.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}, min: 0},
                plotOptions: {series: {animation: false}},
                series: [{animation: false, name: "Named Storms", data: context.storms},
                         {animation: false, name: "Hurricanes", data: context.hurricanes}]
            });
            
            jQuery('#predictand-versus-nino-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Observed vs Nino 3.4 (ASO)'},
                xAxis: {title: {text: 'ASO NINO3.4 SST anomalies'},
                        plotLines: [{color: '#FF0000', width: 2, value: 0}]},
                yAxis: {title: {text: 'Count'}},
                plotOptions: {
                    scatter: {
                        tooltip: {
                            headerFormat: '<b>Observed vs Nino 3.4 (ASO)</b><br>',
                            pointFormat: '{point.y} observed<br />{point.x} nino 3.4 anomalies'
                        }
                    }
                },
                series: [{animation: false, name: "Named Storms", data: context.nino_versus_storms},
                          {animation: false, name: "Hurricanes", data: context.nino_versus_hurricanes}]
            });
            
            jQuery('ul.nav a:first').tab('show');
        },
        createModel: function() {
            var reserve = jQuery('input#inputYearsReserved').val();
            if (reserve === undefined || reserve < 1 || reserve > ForecastApp.instance.hurricanes.length / 2) {
                jQuery('input#inputYearsReserved').parents('div.control-group').addClass("error");
                jQuery('input#inputYearsReserved').next().show();
                return;
            }
            
            ForecastApp.instance.predictand = jQuery('select#inputPredictand').val();
            ForecastApp.instance.years_reserved = parseInt(reserve, 10);
            
            // set aside the analysis set
            var years = ForecastApp.instance.hurricanes.length - ForecastApp.instance.years_reserved;
            ForecastApp.instance.regression_model = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.regression_model.build(
                ForecastApp.instance.hurricanes,
                0, years,
                ForecastApp.instance.predictand);

            ForecastApp.instance.crossvalidate = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.crossvalidate.build(
                ForecastApp.instance.hurricanes,
                years, ForecastApp.instance.hurricanes.length,
                ForecastApp.instance.predictand);

            ForecastApp.instance.forecast_model = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.forecast_model.build(
                ForecastApp.instance.hurricanes,
                0, ForecastApp.instance.hurricanes.length,
                ForecastApp.instance.predictand);

            jQuery('#create-model-dialog').modal('hide');
            
            ForecastApp.instance.router.navigate('build', {trigger: true});
        }
    });
    

    ForecastApp.Views.BuildView = Backbone.View.extend({
        events: {
            "click #cross-validate-dialog .btn-primary": 'crossValidate'
        },
        initialize: function(options) {
            _.bindAll(this, "render", "show");
            this.template = _.template(jQuery("#build-template").html());
            this.on("render", this.render);
        },
        show: function() {
            ForecastApp.instance.regression_model.create_model(this);
        },
        render: function() {
            var ctx = ForecastApp.instance.regression_model.get_context();
            ctx.predictand_label = ForecastApp.instance.predictand;
            ctx.years_reserved = ForecastApp.instance.years_reserved;
            ctx.hurricane_data_length = ForecastApp.instance.hurricanes.length;

            var markup = this.template(ctx);
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-two").removeClass("disabled").addClass("active");
            
            jQuery("table.table").tablesorter({sortList: [[0,0]]});
            
            // Graphs
            var graphData = ForecastApp.instance.regression_model.get_context('year');
            jQuery('#actual-v-predicted-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Observed  vs. Estimated'},
                xAxis: {categories: graphData.years,
                        tickInterval: Math.round(graphData.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}},
                series: [{animation: false, name: 'Observed', data: graphData.predictand},
                         {animation: false, name: 'Estimated', data: graphData.predicted_y}]
            });
            
            jQuery('#residuals-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Residuals'},
                yAxis: {plotLines: [{color: '#FF0000', width: 2, value: 0}]},
                series: [{animation: false, name: 'Residuals', data: graphData.residuals}]               
             });
            
            // sort observations by the predictor
            // then, regenerate the graph_data
            graphData = ForecastApp.instance.regression_model.get_context('predictor');
            jQuery('#actualandpredicted-v-observed-graph').highcharts({
               chart: {type: 'scatter'},
               title: {text: 'Observed and Estimated vs Predictor'},
               xAxis: {categories: graphData.predictor,
                       title: {text: 'Predictor'},
                       tickInterval: Math.round(graphData.predictor.length / 8)},
               yAxis: {title: {text: 'Count'}},
               series: [{animation: false, name: 'Observed', data: graphData.predictand},
                        {animation: false, name: 'Estimated', data: graphData.predicted_y}]
            });
        },
        crossValidate: function() {
            alert('foo');
        }
    });
    
    ForecastApp.Views.ValidateView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render", "show");

            this.template =
                _.template(jQuery("#validate-template").html()); 
            this.on('render', this.render);
        },
        show: function() {
            ForecastApp.instance.crossvalidate.update_model(
                ForecastApp.instance.regression_model.slope,
                ForecastApp.instance.regression_model.intercept,
                ForecastApp.instance.regression_model.r_value);
            ForecastApp.instance.forecast_model.create_model(this);
        },  
        render: function() {
            var ctx = ForecastApp.instance.crossvalidate.get_context();
            ctx.predictand_label = ForecastApp.instance.predictand;
            ctx.years_reserved = ForecastApp.instance.years_reserved;
            ctx.hurricane_data_length = ForecastApp.instance.hurricanes.length;
            
            var markup = this.template(ctx);
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-three").removeClass("disabled").addClass("active");
            
            jQuery("table.table").tablesorter({sortList: [[0,0]]});
            
            // Graphs
            var startIdx = ForecastApp.instance.hurricanes.length - ForecastApp.instance.years_reserved;
            var years_reserved = ForecastApp.instance.years_reserved;
                        
            var years = [];
            var boxplot_data = [];
            for (i= startIdx; i < (startIdx + years_reserved); i++) {
                var observation = ForecastApp.instance.forecast_model.at(i);
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
                xAxis: {
                    categories: years,
                    title: {text: 'Years'}
                },
                yAxis: {
                   title: {text: 'Forecasted'}
                },
                series: [{
                    name: 'Uncertainty',
                    type: 'boxplot',
                    data: boxplot_data
                }, {
                    name: 'Observed',
                    type: 'scatter',
                    data: ctx.predictand
                }, {
                    name: 'Predicted',
                    type: 'line',
                    data: ctx.predicted_y
                }]
            });     
        }        
    });
    
    ForecastApp.Views.ForecastView = Backbone.View.extend({
        events: {
            "click #change-nino-value": 'updateSlideValue'
        },
        initialize: function(options) {
            _.bindAll(this, "render", "render_custom_forecast", "slideValue", "updateSlideValue", "slideTooltip");
            this.on('render', this.render);
            this.on('render-custom-forecast', this.render_custom_forecast);
            this.template =
                _.template(jQuery("#forecast-template").html());
            this.custom_forecast_template =
                _.template(jQuery("#custom-forecast-template").html());
        },
        updateSlideValue: function(evt, ui) {
            var model = ForecastApp.instance.forecast_model.get_context();
            var value = parseFloat(jQuery("#nino-value").val());
            
            if (isNaN(value) || value < this.slider.data('slider').min || value > this.slider.data('slider').max) {
                jQuery('#nino-value').siblings("div.help-inline").show();
            } else {
                jQuery('#nino-value').siblings("div.help-inline").hide();          
                this.slider.slider('setValue', value);                
            }
            this.trigger('render-custom-forecast');
        },
        slideValue: function(evt, ui) {
            var value = this.slider.data('slider').getValue();
            jQuery("#nino-value").val(value.toFixed(2));
            this.trigger('render-custom-forecast');
        },
        slideTooltip: function(value) {
            return value.toFixed(2);
        },
        show: function() {
            this.render();
        },
        render: function() {
            var ctx = ForecastApp.instance.forecast_model.get_context();
            ctx.predictand_label = ForecastApp.instance.predictand;
            ctx.startIdx = ForecastApp.instance.hurricanes.length - ForecastApp.instance.years_reserved;
            ctx.years_reserved = ForecastApp.instance.years_reserved;
            ctx.extremes = ForecastApp.instance.hurricanes.extremes('nino_sst_anomalies');
            
            var predictors = [ctx.stdev_residuals / 2, -(ctx.stdev_residuals / 2), 0];
            ctx.forecast = [];
            for (var i=0; i < predictors.length; i++) {
                var predicted_y = ForecastApp.Math.predicted_y(ctx.slope, ctx.intercept, predictors[i]);
                var model = ForecastApp.Math.uncertainty(ctx, predicted_y);
                model.predictor = predictors[i];
                model.predicted_y = predicted_y;
                ctx.forecast.push(model);
            }
            
            var markup = this.template(ctx);            
            jQuery(this.el).html(markup);

            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-four").removeClass("disabled").addClass("active");
            
            jQuery("table.table").tablesorter();
            
            this.slider = jQuery("#nino-value-slider").slider({
                value: 0,
                min: ctx.extremes.min,
                max: ctx.extremes.max,
                orientation: 'vertical',
                step: 0.01,
                formater: this.slideTooltip
            });
            jQuery("#nino-value-slider").slider().on("slide", this.slideValue);
            
            this.trigger('render-custom-forecast');
        },
        render_custom_forecast: function() {
            var model = ForecastApp.instance.forecast_model.get_context();
            var predictor = this.slider.data('slider').getValue();            
            var predicted_y = ForecastApp.Math.predicted_y(model.slope, model.intercept, predictor);

            var ctx = {forecast: ForecastApp.Math.uncertainty(model, predicted_y)};
            ctx.forecast.predictor = predictor;
            ctx.forecast.predicted_y = predicted_y;
            
            var markup = this.custom_forecast_template(ctx);            
            jQuery(this.el).find("div.custom-forecast").html(markup);
        }
    });
    
    var analyzeView = new ForecastApp.Views.AnalyzeView({
        el: jQuery("div.forecast-step")
    });
    
    var buildView = new ForecastApp.Views.BuildView({
        el: jQuery("div.forecast-step")
    });    
    
    var validateView = new ForecastApp.Views.ValidateView({
        el: jQuery("div.forecast-step")
    });
    
    var forecastView = new ForecastApp.Views.ForecastView({
        el: jQuery("div.forecast-step")
    });    

    ForecastApp.Router = Backbone.Router.extend({
        routes: {
            '': 'analyze',
            'analyze': 'analyze',
            'build': 'build',
            'validate': 'validate',
            'forecast': 'forecast',
            'reset': 'reset',
            'help': 'help'
        },
        analyze: function() {
            analyzeView.show();
        },
        build: function() {
            if (ForecastApp.instance.regression_model === undefined ||
                    ForecastApp.instance.regression_model.length < 1) {
                this.navigate('analyze', {trigger: true});
            } else {
                buildView.show();
            }
        },
        validate: function() {
            if (ForecastApp.instance.regression_model === undefined ||
                    ForecastApp.instance.regression_model.length < 1) {
                this.navigate('analyze', {trigger: true});
            } else if (ForecastApp.instance.crossvalidate === undefined ||
                           ForecastApp.instance.crossvalidate.length < 1) {
                this.navigate('build', {trigger: true});
            } else {
                validateView.show();
            }
        },
        forecast: function() {
            if (ForecastApp.instance.regression_model === undefined ||
                    ForecastApp.instance.regression_model.length < 1) {
                this.navigate('analyze', {trigger: true});
            } else if (ForecastApp.instance.crossvalidate === undefined ||
                           ForecastApp.instance.crossvalidate.length < 1) {
                this.navigate('build', {trigger: true});
            } else if (ForecastApp.instance.crossvalidate.slope === undefined){
                this.navigate('validate', {trigger: true});
            } else {
                forecastView.show();
            }
        },
        reset: function() {
            ForecastApp.reset();
            jQuery("div.pagination.primary ul li").removeClass("active").addClass("disabled");
            this.navigate('analyze', {trigger: true});
        }
    });
         
    ForecastApp.instance.router = new ForecastApp.Router();
    Backbone.history.start();    
})();