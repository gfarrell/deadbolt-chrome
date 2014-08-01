/* global module */
module.exports = {
    // LESS task for processing our stylesheets
    // https://github.com/gruntjs/grunt-contrib-less
    // Two targets: dev, production
    options: {
        paths: ['less', 'lib']
    },
    dev: {
        options: {
            sourceMap: true,
            compress: false,
            cleancss: false
        },
        files: {
            'dist/styles.dev.css': 'less/styles.less'
        }
    },
    dist: {
        options: {
            sourceMap: false,
            compress: true,
            cleancss: true,
            modifyVars: {
                'fa-font-path': '.'
            }
        },
        files: {
            'dist/styles.css': 'less/styles.less'
        }
    }
};