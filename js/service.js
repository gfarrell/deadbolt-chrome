define(['app', 'config/services'], function(App, services) {
    var Service = function(config) {
        this.config = config;
    };

    var module = {
        Service: Service,

        newFromName: function(name) {
            if(_.has(services, name)) {
                var config = services[name];
                return new Service(config);
            } else {
                throw new Error('No such service is defined "' + name + '".');
            }
        },

        getConfigForURL: function(url) {
            for(var name in services) {
                var match = false;

                var config = services[name];
                    config.name = name;

                var urls = config.urls;

                if(!_.isArray(urls)) {
                    urls = [urls];
                }

                urls.forEach(function(pattern) {
                    if(pattern.test(url)) {
                        match = true;
                        return;
                    }
                });

                if(match) {
                    return config;
                }
            }
        },

        detect: function(callback) {
            App.getCurrentURL(function(url) {
                var config = Service.getConfigForURL(url);
                callback(new Service(config));
            });
        },
        
        getCurrent: function(callback) {
            if(_.has(module, currentService)) {
                callback(module.currentService);
            } else {
                Service.detect(function(s) {
                    module.currentService = s;
                    callback(s);
                });
            }
        }
    };

    return module;
});
