define(['lodash'], function(_) {
    var propertyPruneList = ['expires'];
    var propertyTranslationMap = {
        expiry: 'expirationDate',
        httponly: 'httpOnly'
    }; // server -> chrome

    var Cookie = function(props) {
        this.props = props;
    };

    _.extend(Cookie.prototype, {
        exportToChrome: function() {
            var out = {};

            for(var key in this.props) {
                if(_.contains(propertyPruneList, key)) {
                    continue;
                }
                var nKey = (_.has(propertyTranslationMap, key)) ?
                              propertyTranslationMap[key]
                            : key;
                out[nKey] = this.props[key];
            }

            out.url = out.domain;

            if(out.url.indexOf('.') === 0) {
                out.url = out.url.substr(1);
            }

            out.url = 'https://' + out.url;

            return out;
        },
        save: function() {
            chrome.cookies.set(this.exportToChrome());
        }
    });

    return {
        create: function(props) {
            return new Cookie(props);
        },
        collectionFromJSON: function(data) {
            var data = JSON.parse(data);
            var cookies = [];

            if(!_.isArray(data)) {
                data = [data];
            }

            data.forEach(function(datum) {
                cookies.push(new Cookie(datum));
            });

            return cookies;
        },
        saveCollection: function(collection) {
            collection.forEach(function(cookie) {
                if(cookie instanceOf Cookie) {
                    cookie.save();
                } else {
                    throw new Error('This is not a Cookie collection, cannot save it!');
                }
            });
        }
    };
});
