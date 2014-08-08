define(['zepto'], function($) {
    var UI = {
        updateAction: function(action) {
            $('.status').html(action);
        },
        closePopup: function() {
            window.close();
        },
        changeService: function(service) {
            $('img.service_image').attr('src', 'dist/img/services/' + service + '.png');
        },
        setError: function(message) {
            UI.updateAction('');
            $('.errors').html(message);
        }
    };

    return UI;
});
