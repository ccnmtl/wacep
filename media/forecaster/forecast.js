(function() {
    window.ForecastApp = {
        Models: {},
        Views: {},
        Router: {},
        Math: {},
        instance: {},

        initialize: function() {
            // default data set
            this.instance.hurricanes = undefined;
            
            // default variable selections
            this.instance.predictor = 'nino_sst_anomalies';
            this.instance.predictand = 'hurricanes';
            this.instance.years_reserved = 10;
            
            // data subsets
            this.instance.regression_model = undefined;
            this.instance.crossvalidate = undefined;
            this.instance.forecast_model = undefined;
            
            if (!this.instance.hasOwnProperty('router')) {
                this.instance.router = new ForecastApp.Router(); 
            }
        }
    };
    
    ForecastApp.Math.quantiles = [0.05, 0.25, 0.75, 0.95];
    
    ForecastApp.Math.predicted_y = function(slope, intercept, predictor) {
        // y = mx + b
        return slope * predictor + intercept;
    };

    ForecastApp.Math.uncertainty = function(predicted_y, stdev_residuals) {
        var ctx = {};     
        for (var i=0; i < ForecastApp.Math.quantiles.length; i++) {
            var q = ForecastApp.Math.quantiles[i];
            ctx['' + q] = predicted_y +  jStat.normal.inv(q, 0, stdev_residuals);
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
        get_by_attr: function(attr, value) {
            for (var i=0; i < this.length; i++) {
                var item = this.at(i);
                if (value === item.get(attr)) {
                    return item;
                }
            }
        },
        extremes: function(attr) {
            var min, max;
            this.forEach(function (hurricane_year) {
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
        get_context: function() {
            // Highcharts requires arrays of data for each graph
            // Construct time series arrays for each data point
            var years = [];
            var nino = [];
            var storms = [];
            var hurricanes = [];
            var nino_versus_storms = [];
            var nino_versus_hurricanes = [];
            var custom = [];
            var nino_versus_custom = [];
            this.forEach(function (hurricane_year) {
                years.push(hurricane_year.get('year'));
                nino.push(hurricane_year.get('nino_sst_anomalies'));
                storms.push(hurricane_year.get('named_storms'));
                hurricanes.push(hurricane_year.get('hurricanes'));
                nino_versus_storms.push([hurricane_year.get('nino_sst_anomalies'),
                                         hurricane_year.get('named_storms')]);                    
                nino_versus_hurricanes.push([hurricane_year.get('nino_sst_anomalies'),
                                             hurricane_year.get('hurricanes')]);
                custom.push(hurricane_year.get('custom'));
                nino_versus_custom.push([hurricane_year.get('nino_sst_anomalies'),
                                         hurricane_year.get('custom')]);
            });                
            
            // Provide some analysis on each data point
            return {
                'years': years,
                'storms': storms,
                'hurricanes': hurricanes,
                'nino': nino,
                'custom': custom,
                'nino_versus_storms': nino_versus_storms,
                'nino_versus_hurricanes': nino_versus_hurricanes,
                'nino_versus_custom': nino_versus_custom,
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
        }
    });
    
    ForecastApp.Models.Observation = Backbone.Model.extend({});

    ForecastApp.Models.ObservationCollection = Backbone.Collection.extend({
        model: ForecastApp.Models.Observation,
        comparator: function(item) {
            return item.get('year');
        },
        get_predictand_label: function() {
            if (ForecastApp.instance.predictand === 'custom') {
                return ForecastApp.instance.hurricanes.custom_name;
            } else if (ForecastApp.instance.predictand === 'named_storms') {
                return 'Named Storms';
            } else {
                return 'Hurricanes';
            }
        },
        build: function (startIdx, endIdx) {
            for (var i=startIdx; i < endIdx; i++) {
                var dt = ForecastApp.instance.hurricanes.at(i);
                this.add(new ForecastApp.Models.Observation({
                    year: dt.get('year'),
                    predictor: dt.get('nino_sst_anomalies'),
                    predictand: dt.get(ForecastApp.instance.predictand)}));
            }
        },
        apply_model: function(slope, intercept, r_value) {
            var self = this;
            this.slope = slope;
            this.intercept = intercept;
            this.r_value = r_value;

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
            
            this.mean_predicted_y = jStat.mean(all_predicted_y);
            this.mean_residuals = jStat.mean(all_residuals);
            this.stdev_predicted_y = jStat.stdev(all_predicted_y);
            this.stdev_residuals = jStat.stdev(all_residuals);

            // forecast: requires stdev_residuals be set before attempting
            this.forEach(function(observation) {
                observation.set('quantiles', ForecastApp.Math.uncertainty(
                    observation.get('predicted_y'), self.stdev_residuals));
            });
            this.forecast_error_range = jStat.normal.inv(0.05, 0, this.stdev_residuals); 
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
                                 self.apply_model(data.slope, data.intercept, data.r_value);
                                 view.trigger("render");
                             });
            }
        },
        update_model: function(slope, intercept, r_value) {
            // use pre-existing slope & intercept to set the predicted_y
            this.apply_model(slope, intercept, r_value);
        },
        get_context: function() {
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
                'predictand_label': this.get_predictand_label(),
                predictor: [],
                predictand: [],
                predicted_y: [],
                residuals: [],
                years: [],
                predictor_vs_predictand: [],
                predictor_vs_predicted_y: []};

            this.forEach(function(observation) {
                ctx.years.push(observation.get('year'));
                ctx.predictor.push(observation.get('predictor'));
                ctx.predictand.push(observation.get('predictand'));
                ctx.predicted_y.push(observation.get('predicted_y'));
                ctx.residuals.push(observation.get('residuals'));
                ctx.predictor_vs_predictand.push([observation.get('predictor'),
                                                  observation.get('predictand')]);
                ctx.predictor_vs_predicted_y.push([observation.get('predictor'),
                                                   observation.get('predicted_y')]);
            });
            
            return ctx;
        }
    });    
    
    ForecastApp.Views.AnalyzeView = Backbone.View.extend({
        events: {
            'click #create-model-dialog .btn-primary': 'createModel',
            'click #add-predictand-dialog .btn-primary': 'addPredictand'
        },
        initialize: function(options) {
            _.bindAll(this, "render", "show", "createModel", 'addPredictand');

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
            context.years_reserved = ForecastApp.instance.years_reserved;
            context.extremes = ForecastApp.instance.hurricanes.extremes('year');
            
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
            
            var series1 = [{name: "Named Storms", data: context.storms},
                           {name: "Hurricanes", data: context.hurricanes}];
            var series2 = [{name: "Named Storms", data: context.nino_versus_storms},
                           {name: "Hurricanes", data: context.nino_versus_hurricanes}];
                
            if (ForecastApp.instance.hurricanes.custom_name) {
                series1.push({animation: false, name: ForecastApp.instance.hurricanes.custom_name, data: context.custom});
                series2.push({animation: false, name: ForecastApp.instance.hurricanes.custom_name, data: context.nino_versus_custom});
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
                series: series2
            });
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
            ForecastApp.instance.regression_model = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.regression_model.build(
                0, ForecastApp.instance.hurricanes.length - ForecastApp.instance.years_reserved);

            ForecastApp.instance.crossvalidate = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.crossvalidate.build(years, ForecastApp.instance.hurricanes.length);

            ForecastApp.instance.forecast_model = new ForecastApp.Models.ObservationCollection();
            ForecastApp.instance.forecast_model.build(0, ForecastApp.instance.hurricanes.length);

            jQuery('#create-model-dialog').modal('hide');
            
            ForecastApp.instance.router.navigate('build', {trigger: true});
        },
        addPredictand: function(evt) {
            var elt = jQuery("input[name='new-predictand-name']");
            var name = jQuery(elt).val().trim();
            if (name.length < 1) {
                jQuery(elt).next().show();
                return;
            } else {
                jQuery(elt).next().hide();
            }
            
            var data = jQuery('textarea#pasted-data').val().trim();
            if (data.length < 1) {
                jQuery("#data-error").html("Paste data for your predictand").show();
                return;
            }
            
            var rows = data.split('\n');
            if (rows.length < 20) {
                jQuery("#data-error").html("The predictand must cover at least 20 years. The pasted data only has " + rows.length + " years.").show();
                return;
            }
            
            var extremes = ForecastApp.instance.hurricanes.extremes('year');            
            var last_year;
            var collection = new ForecastApp.Models.HurricaneYearCollection();            
            for (var i=0; i < rows.length; i++) {
                var cols = rows[i].split('\t');
                var year = parseInt(cols[0].trim(), 10);
                
                if (isNaN(year)) {
                    jQuery("#data-error").html("The predictand year " + year + " is invalid.").show();
                    return;
                }
                if (year < extremes.min || year > extremes.max) {
                    jQuery("#data-error").html("The predictand year " + year + " is out of the range " + extremes.min + "-" + extremes.max + ".").show();
                    return;
                }
                if (last_year !== undefined && year !== (last_year + 1)) {
                    jQuery("#data-error").html("The predictand year " + year + " is not contiguous to the previous year " + last_year + ".<br />Please sort your data by year.").show();
                    return;
                }
                last_year = year;
                
                var value = parseFloat(cols[1].trim());
                if (isNaN(value)) {
                    jQuery("#data-error").html("The predictand value " + cols[1] + " is not a number.").show();
                    return;
                }

                var old_year = ForecastApp.instance.hurricanes.get_by_attr('year', year);
                collection.add(new ForecastApp.Models.HurricaneYear({
                    year: year,
                    nino_sst_anomalies: old_year.get('nino_sst_anomalies'), 
                    named_storms: old_year.get('named_storms'),
                    hurricanes: old_year.get('hurricanes'),
                    custom: value
                }));
            }
            
            ForecastApp.instance.hurricanes = collection;
            ForecastApp.instance.hurricanes.custom_name = name;
            jQuery('#add-predictand-dialog').modal('hide');
            this.render();
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
            ctx.years_reserved = ForecastApp.instance.years_reserved;
            ctx.hurricane_data_length = ForecastApp.instance.hurricanes.length;

            var markup = this.template(ctx);
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-two").removeClass("disabled").addClass("active");
            
            jQuery("table.table").tablesorter({sortList: [[0,0]]});
            
            // Graphs
            jQuery('#actual-v-predicted-graph').highcharts({
                chart: {type: 'line'},
                title: {text: 'Observed  vs. Estimated'},
                xAxis: {categories: ctx.years,
                        tickInterval: Math.round(ctx.years.length / 8),
                        title: {text: 'Year'}},
                yAxis: {title: {text: 'Count'}},
                series: [{animation: false, name: 'Observed', data: ctx.predictand},
                         {animation: false, name: 'Estimated', data: ctx.predicted_y}]
            });
            
            jQuery('#residuals-graph').highcharts({
                chart: {type: 'scatter'},
                title: {text: 'Residuals'},
                yAxis: {plotLines: [{color: '#FF0000', width: 2, value: 0}]},
                series: [{animation: false, name: 'Residuals', data: ctx.residuals}]               
             });
            
            jQuery('#actualandpredicted-v-observed-graph').highcharts({
               chart: {type: 'scatter'},
               title: {text: 'Observed and Estimated vs Predictor'},
               xAxis: {title: {text: 'Predictor'}},
               yAxis: {title: {text: 'Count'}},
               series: [{animation: false, name: 'Observed', data: ctx.predictor_vs_predictand},
                        {animation: false, name: 'Estimated', data: ctx.predictor_vs_predicted_y}]
            });
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
            ctx.years_reserved = ForecastApp.instance.years_reserved;
            ctx.hurricane_data_length = ForecastApp.instance.hurricanes.length;
            ctx.forecast = ForecastApp.instance.forecast_model.get_context();
            
            var markup = this.template(ctx);
            jQuery(this.el).html(markup);
            
            jQuery("div.pagination ul li").removeClass("active");
            jQuery("li.step-three").removeClass("disabled").addClass("active");
            
            jQuery("table.table").tablesorter({sortList: [[0,0]]});
            
            // Graphs
            var startIdx = ForecastApp.instance.hurricanes.length - ForecastApp.instance.years_reserved;
                        
            var years = [];
            var boxplot_data = [];
            for (i= startIdx; i < (startIdx + ForecastApp.instance.years_reserved); i++) {
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
                xAxis: {categories: years, title: {text: 'Years'}},
                yAxis: {title: {text: 'Forecasted'}},
                series: [{name: 'Uncertainty', type: 'boxplot', data: boxplot_data}, 
                         {name: 'Observed', type: 'scatter', data: ctx.predictand}, 
                         {name: 'Predicted', type: 'line', data: ctx.predicted_y}]
            });     
        }        
    });
    
    ForecastApp.Views.ForecastView = Backbone.View.extend({
        events: {
            "click #change-nino-value": 'updateSlideValue'
        },
        initialize: function(options) {
            _.bindAll(this, "render", "render_custom_forecast", "slideValue",
                      "updateSlideValue", "slideTooltip");
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
            
            if (isNaN(value) || value < this.slider.data('slider').min || 
                    value > this.slider.data('slider').max) {
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
            ctx.startIdx = ForecastApp.instance.hurricanes.length - ForecastApp.instance.years_reserved;
            ctx.years_reserved = ForecastApp.instance.years_reserved;
            ctx.extremes = ForecastApp.instance.hurricanes.extremes('nino_sst_anomalies');
            
            var predictors = [ctx.stdev_residuals / 2, -(ctx.stdev_residuals / 2), 0];
            ctx.forecast = [];
            for (var i=0; i < predictors.length; i++) {
                var predicted_y = ForecastApp.Math.predicted_y(ctx.slope, ctx.intercept, predictors[i]);
                var model = ForecastApp.Math.uncertainty(predicted_y, ctx.stdev_residuals);
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

            var ctx = {forecast: ForecastApp.Math.uncertainty(predicted_y, model.stdev_residuals)};
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
            ForecastApp.initialize();
            jQuery("div.pagination.primary ul li").removeClass("active").addClass("disabled");
            this.navigate('analyze', {trigger: true});
        }
    });
    
    ForecastApp.initialize();
    Backbone.history.start();
})();