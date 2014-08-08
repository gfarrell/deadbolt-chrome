define(['lodash', 'enum', 'ui'], function(_, Enum, UI) {
    var module = {
        state: new Enum('load', 'login', 'complete', 'error'),

        getCurrentTab: function(callback) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                callback(tabs[0]);
            });
        },

        getCurrentURL: function(callback) {
            module.getCurrentTab(function(tab) {
                callback(tab.url);
            });
        },

        reloadTab: function() {
            module.getCurrentTab(function(tab) {
                chrome.tabs.reload(tab.id);
            });
        },

        navigate: function(url) {
            module.getCurrentTab(function(tab) {
                chrome.tabs.update(tab.id, {
                    url: url
                });
            });
        },

        setState: function(state, extra) {
            switch(state) {
                case module.state.LOAD:
                    UI.updateAction('please wait...');
                    UI.changeService('loading');
                    break;
                case module.state.LOGIN:
                    UI.updateAction('logging in...');
                    UI.changeService(extra); // extra = service.name
                    break;
                case module.state.COMPLETE:
                    UI.updateAction('logged in!');
                    break;
                case module.state.ERROR:
                    UI.updateAction('An error has occurred!');
                    UI.setError(extra); // extra = error message
                    break;
                default:
                    UI.updateAction('');
                    UI.setError('Invalid state');
            }
        },

        close: function(timeout) {
            timeout = timeout || 0;
            if(timeout > 0) {
                window.setTimeout(function() {
                    UI.closePopup();
                }, timeout);
            } else {
                UI.closePopup();
            }
        }
    };

    return module;
});
