(function() {
    window.ForecastApp = {
        Models: {},
        Views: {},
        Router: {},
        
        instance: {
            'hurricanes': undefined, // HurricaneYearCollection
            'router': undefined,
            
            // data set selection
            'predictor': 'nino_sst_anomalies',
            'predictand': 'hurricanes',
            'observations': undefined,
            'crossvalidate': undefined
        },
        reset: function() {
            this.hurricanes= undefined; // HurricaneYearCollection
            this.router = undefined;
            
            // data set selection
            this.predictor = 'nino_sst_anomalies';
            this.predictand = 'hurricanes';
            this.observations = undefined;
            this.crossvalidate = undefined;
        }
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
        get_context: function() {
            // Highcharts requires arrays of data for each graph
            // Construct time series arrays for each data point
            var years = [];
            var nino = [];
            var storms = [];
            var hurricanes = [];
            var nino_versus_storms = [];
            this.forEach(function (hurricane_year) {
                years.push(hurricane_year.get('year'));
                nino.push(hurricane_year.get('nino_sst_anomalies'));
                storms.push(hurricane_year.get('named_storms'));
                hurricanes.push(hurricane_year.get('hurricanes'));
                nino_versus_storms.push([hurricane_year.get('nino_sst_anomalies'),
                                         hurricane_year.get('named_storms')]);                    
            });                
            
            // Provide some analysis on each data point
            return {
                'years': years,
                'storms': storms,
                'hurricanes': hurricanes,
                'nino': nino,
                'nino_versus_storms': nino_versus_storms, 
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
            this.set('predicted_y', undefined);
            this.set('residuals', undefined);
        }
    });
    ForecastApp.Models.ObservationCollection = Backbone.Collection.extend({
        model: ForecastApp.Models.Observation,
        build: function(years_reserved) {
            this.years_reserved = parseInt(years_reserved, 10);

            var n = ForecastApp.instance.hurricanes.length - this.years_reserved;
            for (var i=0; i < n; i++) {
                var hurricane_year = ForecastApp.instance.hurricanes.at(i);
                
                var predictand;
                if (ForecastApp.instance.predictand === "hurricanes") {
                    predictand = hurricane_year.get('hurricanes');
                } else if (ForecastApp.instance.predictand === "named_storms") {
                    predictand = hurricane_year.get('named_storms');
                }
                
                var observation = new ForecastApp.Models.Observation({
                    year: hurricane_year.get('year'),
                    predictor: hurricane_year.get('nino_sst_anomalies'),
                    predictand: predictand
                });
                this.add(observation);
            }
            return this;
        },
        update: function(view) {
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
                                 self.std_err = data.std_err;
                                 self.r_value = data.r_value;
                                 self.r_squared = data.r_squared;
                                 
                                 var all_predicted_y = [];
                                 var all_residuals = [];
                                 
                                 self.forEach(function(observation) {
                                     var predicted_y = data.slope * observation.get('predictor') + data.intercept;
                                     var residuals = observation.get('predictand') - predicted_y;
                                     observation.set('predicted_y', predicted_y);
                                     observation.set('residuals', residuals);
                                     
                                     all_predicted_y.push(predicted_y);
                                     all_residuals.push(residuals);
                                 });
                                 
                                 self.mean_predicted_y = jStat.mean(all_predicted_y).toFixed(3);
                                 self.mean_residuals = jStat.mean(all_residuals).toFixed(3);
                                 self.stdev_predicted_y = jStat.stdev(all_predicted_y).toFixed(3);
                                 self.stdev_residuals = jStat.stdev(all_residuals).toFixed(3);
                                 view.trigger("render");
                             });
            }
        },
        year_comparator: function(item) {
            return item.get('year');
        },
        predictor_comparator: function(item) {
            return item.get('predictor');
        },
        get_context: function() {
            return {
                'slope': this.slope,
                'intercept': this.intercept,
                'r_value': this.r_value,
                'r_squared': this.r_squared,
                'std_err': this.std_err,
                'years_reserved': this.years_reserved,
                'observations': this.toJSON(),
                'mean_predicted_y': this.mean_predicted_y,
                'mean_residuals': this.mean_residuals,
                'stdev_predicted_y': this.stdev_predicted_y,
                'stdev_residuals': this.stdev_residuals
            };
        },
        get_graph_data: function(sort_by) {
            if (sort_by === 'predictor') {
                this.comparator = this.predictor_comparator;
            } else { 
                this.comparator = this.year_comparator;
            }
            this.sort();

            var ctx = {
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
            "click #create-model-dialog .btn-primary": 'createModel'
        },
        initialize: function(options) {
            _.bindAll(this, "render", "show", "createModel");

            this.template =
                _.template(jQuery("#analyze-template").html());
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
            
            jQuery('#storms-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Named Storms'},
                xAxis: {categories: context.years,
                        tickInterval: Math.round(context.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Named Storms'}},
                series: [{animation: false, name: "Named Storms",
                          showInLegend: false, data: context.storms}]
            });
            
            jQuery('#storms-versus-nino-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Named Storms vs Nino 3.4 (ASO)'},
                xAxis: {title: {text: 'ASO NINO3.4 SST anomalies'},
                        plotLines: [{color: '#FF0000', width: 2, value: 0}]},
                yAxis: {title: {text: 'Named Storms'}},
                plotOptions: {
                    scatter: {
                        tooltip: {
                            headerFormat: '<b>Named Storms vs Nino 3.4 (ASO)</b><br>',
                            pointFormat: '{point.y} named storms<br />{point.x} nino 3.4 anomalies'
                        }
                    }
                },
                series: [{animation: false, showInLegend: false,
                          data: context.nino_versus_storms}]
            });
        },
        createModel: function() {
            var value = jQuery('input#inputYearsReserved').val();
            if (value === undefined || value < 0 || value > ForecastApp.instance.hurricanes.length - 1) {
                jQuery('input#inputYearsReserved').parents('div.control-group').addClass("error");
                jQuery('input#inputYearsReserved').next().show();
                return;
            }
            
            ForecastApp.instance.predictand = jQuery('select#inputPredictand').val();  
            
            // set aside the analysis set
            ForecastApp.instance.observations = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.observations.build(value);
            
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
            ForecastApp.instance.observations.update(this);
        },
        render: function() {
            var ctx = ForecastApp.instance.observations.get_context();
            ctx.predictor = ForecastApp.instance.predictor;
            ctx.predictand = ForecastApp.instance.predictand;
            ctx.hurricane_data_length = ForecastApp.instance.hurricanes.length;

            var markup = this.template(ctx);
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-two").removeClass("disabled").addClass("active");
            
            // Graphs
            var graphData = ForecastApp.instance.observations.get_graph_data('year');
            jQuery('#actual-v-predicted-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Predictand  vs. Predicted Y'},
                xAxis: {categories: graphData.years,
                        tickInterval: Math.round(graphData.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}},
                series: [{animation: false, name: 'Predictand', data: graphData.predictand},
                         {animation: false, name: 'Predicted Y', data: graphData.predicted_y}]
            });
            
            jQuery('#residuals-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Residuals'},
                yAxis: {plotLines: [{color: '#FF0000', width: 2, value: 0}]},
                series: [{animation: false, name: 'Residuals', data: graphData.residuals}]               
             });
            
            // sort observations by the predictor
            // then, regenerate the graph_data
            graphData = ForecastApp.instance.observations.get_graph_data('predictor');
            jQuery('#actualandpredicted-v-observed-graph').highcharts({
               chart: {type: 'scatter'},
               title: {text: 'Scatter plot of Predictand and Predicted Y vs Predictor'},
               xAxis: {categories: graphData.predictor,
                       title: {text: 'Predictor'},
                       tickInterval: Math.round(graphData.predictor.length / 8)},
               yAxis: {title: {text: 'Count'}},
               series: [{animation: false, name: 'Predictand', data: graphData.predictand},
                        {animation: false, name: 'Predicted Y', data: graphData.predicted_y}]
            });
        },
        crossValidate: function() {
            var value = jQuery('input#cvYearsReserved').val();
            if (value === undefined || value < 0 || value > ForecastApp.instance.hurricanes.length - 1) {
                jQuery('input#cvYearsReserved').parents('div.control-group').addClass("error");
                jQuery('input#cvYearsReserved').next().show();
                return;
            }
            
            // set aside the analysis set
            ForecastApp.instance.crossvalidate = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.crossvalidate.build(value);
            
            jQuery('#cross-validate-dialog').modal('hide');
            
            ForecastApp.instance.router.navigate('validate', {trigger: true});
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
            ForecastApp.instance.crossvalidate.update(this);
        },        
        render: function() {
            var ctx = ForecastApp.instance.crossvalidate.get_context();
            ctx.predictor = ForecastApp.instance.predictor;
            ctx.predictand = ForecastApp.instance.predictand;
            
            var markup = this.template(ctx);
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-three").removeClass("disabled").addClass("active");
            
            // Graphs
            var graphData = ForecastApp.instance.crossvalidate.get_graph_data('year');
            jQuery('#actual-v-predicted-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Predictand  vs. Predicted Y'},
                xAxis: {categories: graphData.years,
                        tickInterval: Math.round(graphData.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}},
                series: [{animation: false, name: 'Predictand', data: graphData.predictand},
                         {animation: false, name: 'Predicted Y', data: graphData.predicted_y}]
            });
            
            jQuery('#residuals-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Residuals'},
                yAxis: {plotLines: [{color: '#FF0000', width: 2, value: 0}]},
                series: [{animation: false, name: 'Residuals', data: graphData.residuals}]               
             });
            
            // sort crossvalidate by the predictor
            // then, regenerate the graph_data
            graphData = ForecastApp.instance.crossvalidate.get_graph_data('predictor');
            jQuery('#actualandpredicted-v-observed-graph').highcharts({
               chart: {type: 'scatter'},
               title: {text: 'Scatter plot of Predictand and Predicted Y vs Predictor'},
               xAxis: {categories: graphData.predictor,
                       title: {text: 'Predictor'},
                       tickInterval: Math.round(graphData.predictor.length / 8)},
               yAxis: {title: {text: 'Count'}},
               series: [{animation: false, name: 'Predictand', data: graphData.predictand},
                        {animation: false, name: 'Predicted Y', data: graphData.predicted_y}]
            });            
        }        
    });
    
    ForecastApp.Views.ForecastView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render");

            this.template =
                _.template(jQuery("#forecast-template").html()); 
        },
        show: function() {
            this.render();
        },
        render: function() {
            var ctx = ForecastApp.instance.observations.get_context();
            var quantiles = [0.05, 0.25, 0.75, 0.95];
            
            var forecast = [
                {predictor: ctx.stdev_residuals / 2},
                {predictor: -(ctx.stdev_residuals / 2)},
                {predictor: 0},
            ];
            for (var i=0; i < forecast.length; i++) {
                forecast[i].mean = ctx.slope * forecast[i].predictor + ctx.intercept;
                for (var j=0; j < quantiles.length; j++) {
                    forecast[i]['' + quantiles[j]] = forecast[i].mean + 
                        jStat.normal.inv(quantiles[j], 0, ctx.stdev_residuals);  
                }
            }
            ctx.forecast = forecast;
            
            var markup = this.template(ctx);            
            jQuery(this.el).html(markup);

            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-four").removeClass("disabled").addClass("active");
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
            if (ForecastApp.instance.observations === undefined ||
                    ForecastApp.instance.observations.length < 1) {
                this.navigate('analyze', {trigger: true});
            } else {
                buildView.show();
            }
        },
        validate: function() {
            if (ForecastApp.instance.observations === undefined ||
                    ForecastApp.instance.observations.length < 1) {
                this.navigate('analyze', {trigger: true});
            } else if (ForecastApp.instance.crossvalidate === undefined ||
                           ForecastApp.instance.crossvalidate.length < 1) {
                this.navigate('build', {trigger: true});
            } else {
                validateView.show();
            }
        },
        forecast: function() {
            if (ForecastApp.instance.observations === undefined ||
                    ForecastApp.instance.observations.length < 1) {
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