define(['app', 'config/services'], function(App, services) {
    var Service = function(config) {
        this.config = config;
    };

    var module = {};

    Service.newFromName = function(name) {
        if(_.has(services, name)) {
            var config = services[name];
            return new Service(config);
        } else {
            throw new Error('No such service is defined "' + name + '".');
        }
    };

    Service.getConfigForURL: function(url) {
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
    };

    Service.detect = function(callback) {
        App.getCurrentURL(function(url) {
            var config = Service.getConfigForURL(url);
            module.current = new Service(config);

            callback(Service.current);
        });
    };

    module.getCurrent = function(callback) {
        Service.detect(callback);
    };
    module.Service = Service;

    return module;
});
