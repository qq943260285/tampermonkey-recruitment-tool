module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: false,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'tmp/tampermonkey-recruitment-tool.es5.js': 'src/tampermonkey-recruitment-tool.js'
                }
            },
            dist2: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.js', 'js/*.js'],
                    dest: 'tmp/es5'
                }]
            }
        },
        watch: {
            firct: {
                files: 'src/*.js',
                tasks: 'xiaoyu'
            }
        },
        uglify: {
            xyzsBuild: {
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
                    banner: `// ==UserScript==
// @name         高级求职助手/招聘网站助手，支持前程无忧、智联招聘、BOSS直聘、拉钩、猎聘
// @namespace    https://github.com/qq943260285
// @version      1.3
// @description  1.快捷添加企业黑名单；2.支持正则表达式黑名单；3.支持前程无忧、智联招聘、BOSS直聘、拉钩、猎聘;4.各大网站黑名单数据连通。
// @author       小宇专属(943260285@qq.com)
// @license      GPL-3.0-only
// @icon         https://qq943260285.github.io/favicon.png
// @create       2019-3-25
// @lastmodified 2019-3-25
// @home-url     https://greasyfork.org/zh-TW/scripts/380848
// @supportURL   https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @feedback-url https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @note         2019.3.25-V0.1 初始化项目添加黑名单功能，后续视情况添加功能
// @match        *://search.51job.com/*
// @match        *://sou.zhaopin.com/*
// @match        *://www.zhipin.com/*
// @match        *://www.lagou.com/*
// @match        *://www.liepin.com/*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant		 GM_addStyle
// ==/UserScript==`,
                    footer: '\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'dist/tampermonkey-recruitment-tool.min.js': ['tmp/tampermonkey-recruitment-tool.es5.js']
                }
            },
            xyzsBuild2: {
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
                },
                files: [{
                    expand: true,
                    cwd: 'tmp/es5',//js目录下
                    src: '**/*.js',//所有js文件
                    dest: 'dist/js'//输出到此目录下
                }]
            },
            xyzsBuild3: {
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
                    banner: `// ==UserScript==
// @name         高级求职助手/招聘网站助手，支持前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、百度百聘、58同城
// @namespace    https://github.com/qq943260285
// @version      3.20.0805
// @description  1.快捷添加企业黑名单；2.快捷公司/企业信息查询，支持天眼查、看准、企查查、百度信誉、百度搜索3.支持全网热门招聘网站，前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、百度百聘、58同城;4.各大网站黑名单数据连通。
// @author       小宇专属(943260285@qq.com)
// @license      GPL-3.0-only
// @icon         https://qq943260285.github.io/favicon.png
// @create       2019-03-25
// @lastmodified 2020-08-05
// @home-url     https://greasyfork.org/zh-TW/scripts/380848
// @supportURL   https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @feedback-url https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @note         2020-08-05 前程无忧改版调整（感谢githud用户：xxhhlk，Greasy用户：terryd，反馈）
// @match        *://search.51job.com/*
// @match        *://sou.zhaopin.com/*
// @match        *://www.zhipin.com/*
// @match        *://www.lagou.com/*
// @match        *://www.liepin.com/*
// @match        *://*.58.com/*
// @match        *://zhaopin.baidu.com/quanzhi*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant		 GM_addStyle
// ==/UserScript==`,
                },
                files: {
                    'dist/js/tampermonkey-recruitment-tool.xx.js': ['tmp/es5/js/FloatingToolXYZS.js','tmp/es5/js/WindowXYZS.js','tmp/es5/tampermonkey-recruitment-tool.js']
                }
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);//cmd:grunt
    grunt.registerTask('xiaoyu', ['babel:dist2', 'uglify:xyzsBuild3',]);//cmd:grunt xiaoyu
}


