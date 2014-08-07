define(['zepto'], function($) {
    var UI = {
        updateAction: function(action) {
            $('.action').html(action);
        },
        closePopup: function() {
            window.close();
        },
        changeService: function(service) {
            $('img.service_image').attr('src', 'dist/img/services/' + service + '.png');
        }
    };

    return UI;
});
