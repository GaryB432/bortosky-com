
module.exports = function (grunt) {
    // Project configuration.
    'use strict';
    grunt.initConfig({

        // Config stuff
        project: {
            javascript: {
                ts: [
                ],
                gary: {
                    ts: [
                        'source/gary/js/app.ts',
                        'source/gary/js/models/**/*.ts',
                        'source/gary/js/services/**/*.ts',
                        'source/gary/js/controllers/**/*.ts',
                        'source/gary/js/filters/**/*.ts',
                        'source/gary/js/directives/**/*.ts'
                    ]
                }
            },
            pkg: grunt.file.readJSON('./package.json')
        },
        less: {
            build: {
                files: {
                    'app/css/style.css': 'source/less/main.less'
                }
            },
            buildGary: {
                files: {
                    'app/gary/css/style.css': 'source/gary/less/main.less'
                }
            }
        },
        watch: {
            styles: {
                files: [
                    'source/less/**/*.less',
                    'source/gary/less/**/*.less'
                ],
                tasks: ['less'],
                options: {
                    nospawn: true,
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade-app'],
                options: {
                    nospawn: true,
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['default']
            },
            typescript: {
                files: ['**/*.ts'],
                tasks: ['typescript'], // qunit too
                options: {
                    nospawn: true,
                }
            }
        },
        typescript: {
            base: {
                src: ['<%= project.javascript.ts %>'],
                dest: 'app/js/main.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    noImplicitAny: true,
                    comments: false
                }
            },
            baseGary: {
                src: ['<%= project.javascript.gary.ts %>'],
                dest: 'app/gary/js/main.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    noImplicitAny: true,
                    comments: false
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('jadeall', 'Run jade recursively.', function (arg1, arg2) {
        if (arguments.length !== 2) {
            grunt.fail.fatal('not enough args');
        } 
        var jadeFiles = [];
        grunt.file.expand(arg1.concat('**/*.jade')).forEach(function (file) {
            var value = {};
            value[file.replace(arg1, arg2).replace('.jade', '.html')] = file;
            jadeFiles.push(value);
        });
        grunt.config.set('jade.compile', { files: jadeFiles, options: { pretty: true } });
        grunt.task.run('jade');
    });

    grunt.registerTask('copyproducers', 'Copy producers json', function () {
        grunt.file.copy('source/gary/producers.json', 'app/gary/producers.json');
    });

    grunt.registerTask('jade-app', ['jadeall:source/jade/:app/','jadeall:source/gary/jade/:app/gary/']);
    grunt.registerTask('default', ['jade-app', 'less', 'typescript', 'copyproducers']);
};