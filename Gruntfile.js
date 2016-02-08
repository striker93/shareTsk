
var libs = [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-bootstrap/ui-bootstrap.min.js',
    'node_modules/angular-touch/angular-touch.min.js',
    'node_modules/textangular/dist/textAngular-rangy.min.js',
    'node_modules/textangular/dist/textAngular-sanitize.min.js',
    'node_modules/textangular/dist/textAngular.min.js',
    'node_modules/angular-clipboard/angular-clipboard.js'
];

var appScripts = [
    'client/js/template.js',
    'client/app/_bootstrap.js',
    'client/app/**/*.js',
    '!client/app/app.js',
    'client/app/app.js'
];


module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                src: 'client/css/style.scss',
                dest: 'client/css/style.css'
            }
        },

        html2js: {
            options: {
                base: 'client',
                module: 'myApp.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            dev: {
                src: ['client/app/**/*.tpl.html'],
                dest: 'client/js/template.js'
            }
        },
        clean: ["dist/js", "client/js"],
        copy: {
            dist: {
                files: [{
                    src: 'client/css/style.css',
                    dest: 'dist/css/style.css'
                }, {
                        cwd: 'client/img',
                        src: '**',
                        dest: 'dist/img/',
                        expand: true
                    }, {
                        cwd: 'client/fonts',
                        src: '**',
                        dest: 'dist/fonts/',
                        expand: true
                    }
                ]
            }
        },

        uglify: {
            dist: {
                src: 'client/js/app.js',
                dest: 'client/js/app.min.js'
            }
        },

        concat: {
            options : {
                seperator: ';'
            },
            dev: {
                files: [{
                    src: '<%= appScr %>',
                    dest: 'client/js/app.js'
                }, {
                        src: '<%= libSrc %>',
                        dest: 'client/js/libs.min.js'
                    }]
            },

            dist: {
                files: [{
                    src: ['client/js/libs.min.js', 'client/js/app.min.js'],
                    dest: 'dist/js/app.min.js'
                }]
            }
        },

        watch: {
            dev: {
                files: ['client/css/**', 'client/app/**'],
                tasks: ['clean','default','dist']
            }
        },
        // configure nodemon
        nodemon: {
            dev: {
                script: 'server/server.js'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        },


        libSrc: libs,
        appScr: appScripts
    });
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['sass:dev', 'html2js:dev', 'concat:dev']);
    grunt.registerTask('dist', ['uglify:dist', 'concat:dist', 'copy:dist']);
    grunt.registerTask('serve', ['clean','sass:dev','html2js:dev','concat:dev','dist', 'concurrent']);
};