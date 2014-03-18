(function() {
    window.ForecastApp = {
        Models: {},
        Views: {},
        Router: {}        
    };
    
    ForecastApp.Models.HurricaneYear = Backbone.Model.extend({
        url: '/forecast/api/hurricane/'
    });
    
    ForecastApp.Models.HurricaneYearCollection = Backbone.Collection.extend({
        url: '/forecast/api/hurricane/',
        model: ForecastApp.Models.HurricaneYear,
        parse: function(response) {
            return response.results || response;
        }
    });
    
    ForecastApp.Views.AnalyzeView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render", "show");

            this.template =
                _.template(jQuery("#analyze-template").html());
            this.collection = new ForecastApp.Models.HurricaneYearCollection();
            
            this.collection.on("reset", this.render);            
        },
        show: function() {
            this.collection.fetch({
                data: {page_size: 200},
                processData: true,
                reset: true});
        },
        renderCharts: function() {
            var years = [];
            var nino = [];
            var storms = [];
            this.collection.forEach(function (hurricane_year) {
                years.push(hurricane_year.get('year'));
                nino.push(hurricane_year.get('nino_sst_anomalies'));
                storms.push(hurricane_year.get('named_storms'));
            });
            
            jQuery('#nino-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'NINO 3.4 (ASO)'},
                xAxis: {categories: years,
                        tickInterval: Math.round(years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Anomalies'}},
                series: [{showInLegend: false, data: nino}]
            });
            
            jQuery('#storms-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Named Storms'},
                xAxis: {categories: years,
                        tickInterval: Math.round(years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Named Storms'}},
                series: [{showInLegend: false, data: storms}]
            });
        },
        render: function() {
            var context = { 'hurricane_data': this.collection.toJSON() };
            var markup = this.template(context);            
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-one").addClass("active");
            
            jQuery("#hurricane-data").tablesorter({sortList: [[0,0]]})
            this.renderCharts();
        },
        reset: function() {
            this.collection.reset();
            this.collection.fetch();
        }
    });
    

    ForecastApp.Views.BuildView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render");

            this.template =
                _.template(jQuery("#build-template").html()); 
        },
        render: function() {
            var self = this;
            var context = {};
            var markup = this.template(context);            
            jQuery(self.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-two").addClass("active");            
        },
        reset: function() {
            
        }
    });
    
    ForecastApp.Views.ValidateView = Backbone.View.extend({
        initialize: function(options) {
            _.bindAll(this, "render");

            this.template =
                _.template(jQuery("#validate-template").html()); 
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
            buildView.render();
        },
        validate: function() {
            validateView.render();
        },
        forecast: function() {
            forecastView.render();
        },
        reset: function() {
            analyzeView.reset();
            buildView.reset();
            validateView.reset();
            forecastView.reset();

            this.navigate('analyze', {trigger: true});
        }
    });
         
    new ForecastApp.Router;
    Backbone.history.start();    
})();