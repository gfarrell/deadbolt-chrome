define(['zepto'], function($) {
    var UI = {
        updateAction: function(action) {
            $('.action').html(action);
        },
        changeUserName: function(user) {
            $('.user').html(user);
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
