module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'tampermonkey-recruitment-tool.es5.js': 'tampermonkey-recruitment-tool.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            xyzsBuild: {//任务一：压缩a.js，不混淆变量名，保留注释，添加banner和footer
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: false, //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files: {
                    'tampermonkey-recruitment-tool.min.js': ['tampermonkey-recruitment-tool.es5.js']
                }
            },
            // buildb:{//任务二：压缩b.js，输出压缩信息
            //     options: {
            //         report: "min"//输出压缩率，可选的值有 false(不输出信息)，gzip
            //     },
            //     files: {
            //         'output/js/b.min.js': ['js/main/b.js']
            //     }
            // },
            // buildall: {//任务三：按原文件结构压缩js文件夹内所有JS文件
            //     files: [{
            //         expand:true,
            //         cwd:'js',//js目录下
            //         src:'**/*.js',//所有js文件
            //         dest: 'output/js'//输出到此目录下
            //     }]
            // },
            // release: {//任务四：合并压缩a.js和b.js
            //     files: {
            //         'output/js/index.min.js': ['js/a.js', 'js/main/b.js']
            //     }
            // }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');

    // 默认任务
    // grunt.registerTask('default', ['uglify:release']);
    grunt.registerTask('mina', ['babel','uglify:xyzsBuild',]);
    // grunt.registerTask('minb', ['uglify:buildb']);
    // grunt.registerTask('minall', ['uglify:buildall']);
}
