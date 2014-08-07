require.config({
    baseUrl: '/js',
    paths: {
        zepto: '../lib/zepto/zepto',
        uuid: '../lib/uuid-js/lib/uuid'
    },
    shim: {
        zepto: {
            exports: 'Zepto'
        }
    }
});

require(['zepto', 'ui'], function($, UI) {
    var submitAddress = 'https://localhost:8081/requestLogin';
    var service = 'facebook';

    UI.updateAction('logging in');
    UI.changeService('facebook');

    var translateCookie = function(cookie) {
        var cookie_map = {
            url: 'url',
            domain: 'domain',
            expiry: 'expirationDate',
            httponly: 'httpOnly',
            name: 'name',
            path: 'path',
            secure: 'secure',
            value: 'value'
        };

        cookie.url = cookie.domain;

        if(cookie.url.indexOf('.') === 0) {
            cookie.url = cookie.url.substr(1);
        }

        cookie.url = 'https://' + cookie.url;

        var mapped = {};
        for(var key in cookie) {
            if(key in cookie_map) {
                mapped[cookie_map[key]] = cookie[key];
            }
        }

        return mapped;
    };


    $.ajax({
        url: submitAddress,
        data: {service: service},
        type: 'POST',
        success: function(data) {
            if(data.error) {
                UI.setError('unable to login...');
            } else {
                var cookies = JSON.parse(data.cookies);
                for(var name in cookies) {
                    chrome.cookies.set(translateCookie(cookies[name]));
                    UI.updateAction('logged in!');
                }
                chrome.tabs.query({active: true}, function(tab) {
                    chrome.tabs.reload(tab.id);
                });

                window.setTimeout(function() {
                    UI.closePopup();
                }, 1500);
            }
        },
        error: function() {
            UI.setError('unable to communicate with server...');
        }
    });
});
