/* global module  */
module.exports = {
    // Copy task for copying some files
    // https://github.com/gruntjs/grunt-contrib-copy
    main: {
        files: [
            {expand: true, flatten: true, src: ['img/**'], dest: 'dist/', filter: 'isFile'},
        ]
    },
    dist: {
        files: [
            {flatten: true, src: ['index.html'], dest: 'dist/'}
        ],
        options: {
            process: function(content) {
                var c = content;

                // replace styles.dev.css -> styles.css
                c = c.replace('styles.dev.css', 'styles.css');

                // replace the script tag
                c = c.replace(/<script(.*) src="lib\/requirejs\/require\.js"(.*) data-main="js\/main\.js"><\/script>/g, '<script$1 src="main.js"></script>');

                // replace dist/ with nothing
                c = c.replace(/dist\//g, '');

                return c;
            }
        }
    }
};