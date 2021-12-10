module.exports = function (grunt) {
    let pkg = grunt.file.readJSON('package.json');
    pkg.lastmodified = grunt.template.date(new Date(), 'yyyy-mm-dd');
    let banner = grunt.template.process(grunt.file.read('banner.txt'), {data: pkg});
    grunt.initConfig({
        pkg: pkg,
        clean: {
            dist: 'dist',
            tmp: 'tmp'
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['@babel/preset-env']
            },
            go: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'tmp/es5'
                }]
            }
        },
        watch: {
            go: {
                files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.less'],
                tasks: 'xyzs'
            }
        },
        uglify: {
            go: {
                options: {
                    mangle: false,
                    compress: {
                        drop_console: true,
                        sequences: true,
                        conditionals: false,
                        comparisons: true,
                        booleans: true,
                        loops: true,
                        hoist_funs: true,
                        if_return: false,
                        inline: false,
                        join_vars: true,
                        reduce_vars: true,
                        negate_iife: false,
                        passes: 1,
                    },
                    preserveComments: false,
                    beautify: true,
                    banner: banner,
                },
                files: {
                    'dist/js/index.js': ['tmp/es5/module/FloatingTool/FloatingToolXYZS.js', 'tmp/es5/module/Window/WindowXYZS.js', 'tmp/es5/index.js']
                }
            },
        },
        cssmin: {
            go: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'tmp/css'
                }]
            },
            module: {
                files: [
                    {
                        'dist/css/FloatingTool.css': ['tmp/module/FloatingTool/FloatingTool.css']
                    },
                    {
                        'dist/css/Window.css': ['tmp/module/Window/Window.css']
                    }
                ]
            },
            index: {
                files: {
                    'dist/css/index.css': ['tmp/css/index.css']
                }
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'tmp',
                    src: ['**/*.css'],
                    filter: 'isFile',
                    rename: function () {
                        return 'dist/css/index.css';
                    }
                }
                ]
            }
        },
        less: {
            module: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.less'],
                    dest: 'tmp',
                    ext: '.css',
                    filter: 'isFile',
                }]
            },
        },
        copy: {
            go: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.min.js', '**/*.min.css'],
                        dest: 'tmp/',
                        filter: 'isFile'
                    },
                ]
            }
        },
    });

    grunt.task.registerTask('build', 'build', function () {
        console.log(pkg.name)
        let indexCss = grunt.file.read('dist/css/index.css');
        let floatingToolCss = grunt.file.read('dist/css/FloatingTool.css');
        let windowCss = grunt.file.read('dist/css/Window.css');
        let indexjs = grunt.file.read('dist/js/index.js');
        let indexInitjs = grunt.template.process(indexjs, {
            data: {
                IndexCss: indexCss,
                FloatingToolCss: floatingToolCss,
                WindowCss: windowCss
            }
        });
        grunt.file.write("dist/" + pkg.name + ".js", indexInitjs)
        grunt.log.ok("完成合并")
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['watch']);//cmd:grunt
    grunt.registerTask('test-clean', ['clean']);
    grunt.registerTask('xyzs', ['clean', 'copy', 'babel', 'uglify', 'less', 'cssmin:module', 'cssmin:index', 'build']);//cmd:grunt xiaoyu
}


