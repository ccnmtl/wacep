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
            this.collection.fetch();
        },
        render: function() {
            var context = { 'hurricane_data': this.collection };
            var markup = this.template(context);            
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-one").addClass("active");            
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
        }
    });
    
     
    new ForecastApp.Router;
    Backbone.history.start();    
})();