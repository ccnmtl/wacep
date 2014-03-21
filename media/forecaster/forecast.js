(function() {
    window.ForecastApp = {
        Models: {},
        Views: {},
        Router: {},
        
        // variables
        'hurricanes': undefined, // HurricaneYearCollection
        'predictor': undefined,  // type HurricaneYear
        'predictand': undefined, // type HurricaneYear
        'yearsReserved': 0,
        'router': undefined
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
        get_context: function() {
            if (self.context == undefined) {
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
                self.context = {
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
            return self.context;
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

            ForecastApp.hurricanes = new ForecastApp.Models.HurricaneYearCollection();            
            ForecastApp.hurricanes.on("reset", this.render);        
        },
        show: function() {
            ForecastApp.hurricanes.fetch({
                data: {page_size: 200},
                processData: true,
                reset: true
            });
        },
        render: function() {
            var context = ForecastApp.hurricanes.get_context();
            var markup = this.template(context);            
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-one").addClass("active");
            
            jQuery("#hurricane-data").tablesorter({sortList: [[0,0]]});
            
            jQuery('#nino-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'NINO 3.4 (ASO)'},
                xAxis: {categories: context.years,
                        tickInterval: Math.round(context.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Anomalies'}},
                series: [{name: "ASO NINO3.4 SST anomalies",
                          showInLegend: false, data: context.nino}]
            });
            
            jQuery('#storms-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Named Storms'},
                xAxis: {categories: context.years,
                        tickInterval: Math.round(context.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Named Storms'}},
                series: [{name: "Named Storms", showInLegend: false,
                          data: context.storms}]
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
                series: [{showInLegend: false,
                          data: context.nino_versus_storms}]
            });
        },
        reset: function() {
            ForecastApp.hurricanes.reset();
        },
        createModel: function() {
            var value = jQuery('select#inputPredictor').val();            
            ForecastApp.predictor = ForecastApp.hurricanes.get(value);
            
            value = jQuery('select#inputPredictand').val();            
            ForecastApp.predictand = ForecastApp.hurricanes.get(value);
            
            value = jQuery('input#inputYearsReserved').val();
            if (value === undefined || value < 1 || value > ForecastApp.hurricanes.length) {
                jQuery('input#inputYearsReserved').parents('div.control-group').addClass("error");
                jQuery('input#inputYearsReserved').next().show();
                return;
            }
            ForecastApp.yearsReserved = value; 
            
            jQuery('#create-model-dialog').modal('hide');
            
            ForecastApp.router.navigate('build', {trigger: true});
        }
    });
    

    ForecastApp.Views.BuildView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render");

            this.template =
                _.template(jQuery("#build-template").html()); 
        },
        show: function() {
            this.render();
        },
        render: function() {
            var self = this;
            var context = {};
            var markup = this.template(context);            
            jQuery(self.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-two").addClass("active");         
        },
        reset: function() {}
    });
    
    ForecastApp.Views.ValidateView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render");

            this.template =
                _.template(jQuery("#validate-template").html()); 
        },
        show: function() {
            this.render();
        },        
        render: function() {
            var self = this;
            var context = {};
            var markup = this.template(context);            
            jQuery(self.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-three").addClass("active");            
        },
        reset: function() {
            
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
            var self = this;
            var context = {};
            var markup = this.template(context);            
            jQuery(self.el).html(markup);

            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-four").addClass("active");
        },
        reset: function() {
            
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
            if (ForecastApp.hurricanes.length < 1 ||
                ForecastApp.predictor === undefined ||
                    ForecastApp.predictand === undefined) {
                this.navigate('analyze', {trigger: true});
            } else {
                buildView.show();
            }
        },
        validate: function() {
            if (ForecastApp.hurricanes.length < 1 ||
                ForecastApp.predictor === undefined ||
                    ForecastApp.predictand === undefined) {
                this.navigate('analyze', {trigger: true});
            } else {
                validateView.render();
            }
        },
        forecast: function() {
            if (ForecastApp.hurricanes.length < 1 ||
                ForecastApp.predictor === undefined ||
                    ForecastApp.predictand === undefined) {
                this.navigate('analyze', {trigger: true});
            } else {
                forecastView.render();
            }
        },
        reset: function() {
            analyzeView.reset();
            buildView.reset();
            validateView.reset();
            forecastView.reset();

            this.navigate('analyze', {trigger: true});
        }
    });
         
    ForecastApp.router = new ForecastApp.Router;
    Backbone.history.start();    
})();