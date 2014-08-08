require.config({
    baseUrl: '/js',
    paths: {
        zepto: '../lib/zepto/zepto',
        config: '../config',
        lodash: '../lib/lodash/dist/lodash',
        enum: '../lib/enum.js/enum'
    },
    shim: {
        zepto: {
            exports: 'Zepto'
        }
    }
});

require(['zepto', 'app', 'service', 'cookie'], function($, App, Service, Cookie) {
    var server = 'https://localhost:8081/requestLogin';

    App.setState(App.state.LOAD);

    Service.getCurrent(function(s) {
        // inform the user that we're logging in
        App.setState(App.state.LOGIN, s.get('name'));

        // initiate the login process
        $.ajax({
            url:      server,
            type:    'POST',
            data:    {
                service: s.get('name')
            },
            success: function(data) {
                if(data.error) {
                    App.setState(App.state.ERROR, 'unable to login.');
                } else {
                    console.log(data);
                    var cookies = Cookie.collectionFromJSON(data.cookies);
                    Cookie.saveCollection(cookies);
                    App.navigate(s.get('redirect'));

                    App.close(1500);
                }
            },
            error: function() {
                App.setState(App.state.ERROR, 'unable to communicate with server.');
            }
        });
    });
});
