define(['lodash'], function(_) {
    return {
        getCurrentURL: function(callback) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tab) {
                callback(tab.url);
            });
        }
    };
});
