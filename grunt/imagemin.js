/* global module */
module.exports = {
    imagemin: {
        options: {
            progressive: true,
            optimizationLevel: 3,
            interlace: true
        },
        files: [{
            expand: true,
            src: ['dist/*.{png,jpg,gif}']
        }]
    }
};