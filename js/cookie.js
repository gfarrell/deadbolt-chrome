define(['lodash'], function(_) {
    var propertyPruneList = ['expires'];
    var propertyTranslationMap = {
        expiry: 'expirationDate',
        httponly: 'httpOnly'
    }; // server -> chrome

    var Cookie = function(props) {
        this.props = props;

        if(this.props.domain) {
            this.props.url = this.props.domain;
            if(this.props.url.indexOf('.') === 0) {
                this.props.url = this.props.url.substr(1);
            }
            this.props.url = 'https://' + this.props.url;
        }

        console.group('Cookie ' + this.props.name);
        console.log(this.props);
        console.groupEnd();
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
            var cookies = [];

            data = JSON.parse(data);

            for(var name in data) {
                var datum = data[name];
                cookies.push(new Cookie(datum));
            }

            return cookies;
        },
        saveCollection: function(collection) {
            collection.forEach(function(cookie) {
                if(cookie instanceof Cookie) {
                    cookie.save();
                } else {
                    throw new Error('This is not a Cookie collection, cannot save it!');
                }
            });
        }
    };
});
