// ==UserScript==
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
// ==/UserScript==
"use strict";

(function($) {
    $.extend({
        FloatingToolXYZS: function(menuItems) {
            if (!Array.isArray(menuItems)) return;
            var positionLeft = !0, isExpand = !0, body = $("body");
            body.before("<style>\n            .xyzs-tool-region{\n                position: fixed;\n                z-index: 20480;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n            }\n            .xyzs-tool{\n                background-color: #ff5c4c;\n                width: 50px;\n                height: 50px;\n                border-radius:25px;\n                -moz-border-radius:25px; \n                position: absolute;\n                left: 10px;\n                bottom: 10px;\n                cursor: move;\n                pointer-events:auto;\n                -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;\n                -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                -webkit-touch-callout: none; \n                -webkit-user-select: none;\n                -khtml-user-select: none;\n                -moz-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n            }\n            .xyzs-tool .menu{\n                width: 200px;\n                height: 50px;\n                position: absolute;\n                left: 50px;\n                display: none;\n                /*transition: display 3s;*/\n                padding: 0 10px;\n                /*-webkit-animation-duration: 1s;*/\n                /*animation-duration: 1s;*/\n                /*-webkit-animation-fill-mode: both;*/\n                /*animation-fill-mode: both;*/\n                /*-webkit-animation-name: rubberBand;*/\n                /*animation-name: rubberBand;*/\n            }\n            .xyzs-tool .fa-tool{\n                font-size: 27px;\n                color: #FFF!important;\n            }\n            .xyzs-menu-item{\n                height: 30px;\n                width: 30px;\n                border-radius:15px;\n                float: left;\n                margin: 10px;\n                background-color: #ff5c4c;\n                -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;\n                -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                text-align: center;\n            }\n            .xyzs-menu-item:hover{\n                -moz-box-shadow:1px 1px 15px rgb(35,35,35);\n                -webkit-box-shadow:1px 1px 15px rgb(35,35,35);\n                box-shadow:1px 1px 15px rgb(35,35,35);\n                /*-webkit-animation-duration: .8s;*/\n                /*animation-duration: .8s;*/\n                /*-webkit-animation-fill-mode: both;*/\n                /*animation-fill-mode: both;*/\n                /*-webkit-animation-name: rubberBand;*/\n                /*animation-name: rubberBand;*/\n            }\n            .xyzs-menu-item .fa-item{\n                font-size: 20px;\n                margin: auto 0;\n                width: 30px;\n                height: 30px;\n                line-height: 30px;\n                cursor: pointer;\n                color: #fff;\n            }\n            /*.xyzs-menu-item .fa-item:hover{*/\n\n            /*}*/\n            /*@-webkit-keyframes rubberBand {*/\n                /*from {*/\n                    /*-webkit-transform: scale3d(1, 1, 1);*/\n                    /*transform: scale3d(1, 1, 1);*/\n                /*}*/\n                /*30% {*/\n                    /*-webkit-transform: scale3d(1.25, 0.75, 1);*/\n                    /*transform: scale3d(1.25, 0.75, 1);*/\n                /*}*/\n                /*40% {*/\n                    /*-webkit-transform: scale3d(0.75, 1.25, 1);*/\n                    /*transform: scale3d(0.75, 1.25, 1);*/\n                /*}*/\n                /*50% {*/\n                    /*-webkit-transform: scale3d(1.15, 0.85, 1);*/\n                    /*transform: scale3d(1.15, 0.85, 1);*/\n                /*}*/\n                /*65% {*/\n                    /*-webkit-transform: scale3d(0.95, 1.05, 1);*/\n                    /*transform: scale3d(0.95, 1.05, 1);*/\n                /*}*/\n                /*75% {*/\n                    /*-webkit-transform: scale3d(1.05, 0.95, 1);*/\n                    /*transform: scale3d(1.05, 0.95, 1);*/\n                /*}*/\n                /*to {*/\n                    /*-webkit-transform: scale3d(1, 1, 1);*/\n                    /*transform: scale3d(1, 1, 1);*/\n                /*}*/\n            /*}*/\n            /*@keyframes rubberBand {*/\n                /*from {*/\n                    /*-webkit-transform: scale3d(1, 1, 1);*/\n                    /*transform: scale3d(1, 1, 1);*/\n                /*}*/\n                /*30% {*/\n                    /*-webkit-transform: scale3d(1.25, 0.75, 1);*/\n                    /*transform: scale3d(1.25, 0.75, 1);*/\n                /*}*/\n                /*40% {*/\n                    /*-webkit-transform: scale3d(0.75, 1.25, 1);*/\n                    /*transform: scale3d(0.75, 1.25, 1);*/\n                /*}*/\n                /*50% {*/\n                    /*-webkit-transform: scale3d(1.15, 0.85, 1);*/\n                    /*transform: scale3d(1.15, 0.85, 1);*/\n                /*}*/\n                /*65% {*/\n                    /*-webkit-transform: scale3d(0.95, 1.05, 1);*/\n                    /*transform: scale3d(0.95, 1.05, 1);*/\n                /*}*/\n                /*75% {*/\n                    /*-webkit-transform: scale3d(1.05, 0.95, 1);*/\n                    /*transform: scale3d(1.05, 0.95, 1);*/\n                /*}*/\n                /*to {*/\n                    /*-webkit-transform: scale3d(1, 1, 1);*/\n                    /*transform: scale3d(1, 1, 1);*/\n                /*}*/\n            /*}*/\n\n\n\n            \n        </style>");
            var isMobile = !1, mousedownPosition = {
                x: 0,
                y: 0
            }, toolPosition = {
                x: 0,
                y: 0
            }, toolRegion = $('<div class="xyzs-tool-region"></div>').mousedown(function() {
                toolRegion.css("pointer-events", "auto");
            }).mouseup(function() {
                isMobile = !1, toolRegion.css("pointer-events", "none");
            }).mousemove(function(e) {
                if (isMobile) {
                    var mouseX = e.originalEvent.x || e.originalEvent.layerX || 0, mouseY = e.originalEvent.y || e.originalEvent.layerY || 0, Y = tool.position().top, X = tool.position().left, winH = $(window).height(), winW = $(window).width();
                    toolPosition.x = X, toolPosition.y = Y;
                    var left = X + mouseX - mousedownPosition.x, bottom = winH - 50 - Y - mouseY + mousedownPosition.y;
                    if (tool.css({
                        left: (left < 0 ? 0 : winW < 50 + left ? winW - 50 : left) + "px",
                        bottom: (bottom < 0 ? 0 : winH < bottom + 50 ? winH - 50 : bottom) + "px"
                    }), positionLeft === winW / 2 < X + 25) menu.css({
                        width: 50 * menuItems.length + 20 + "px",
                        left: (winW / 2 < X + 25 ? -1 * (50 * menuItems.length + 20) : 50) + "px"
                    }), menuItems.reverse(), createMenu(), positionLeft = !positionLeft;
                    mousedownPosition.x = mouseX, mousedownPosition.y = mouseY;
                }
            }).css("pointer-events", "none"), tool = $('\n        <div class=\'xyzs-tool\'>\n        <div style="position: absolute;text-align: center;width: 50px;top: 10px;color: #fff;">\n        <i class="fa fa-wrench fa-tool" title="工具箱"></i>\n        </div>\n        </div>').mouseleave(function() {
                menu.hide(70);
            }).mouseenter(function(e) {
                menu.show(70);
            }).mousedown(function(e) {
                isExpand = isMobile = !0, toolRegion.css("pointer-events", "auto"), mousedownPosition.x = e.originalEvent.x || e.originalEvent.layerX || 0, 
                mousedownPosition.y = e.originalEvent.y || e.originalEvent.layerY || 0;
            }).mousemove(function() {
                isExpand = !1;
            }).click(function() {
                if (isExpand) menu.toggle();
            }).css({
                left: "10px",
                bottom: "10px"
            }), menu = $("\n    <div id='xyzs-menu' class='menu animated rubberBand'>\n    </div>\n    ").css({
                width: 50 * menuItems.length + 20 + "px"
            }), createMenu = function() {
                menu.empty();
                for (var _loop = function(i) {
                    menu.append($('<div class="xyzs-menu-item animated rubberBand"><i class="fa ' + menuItems[i].ico + ' fa-item " title="' + menuItems[i].title + '"></i></div>').click(function() {
                        menuItems[i].callback();
                    }));
                }, i = 0; i < menuItems.length; i++) _loop(i);
            };
            createMenu(), tool.append(menu), toolRegion.append(tool), body.append(toolRegion);
        }
    });
})(jQuery), function($) {
    $.extend({
        WindowXYZS: function() {
            var body = $("body");
            body.before("<style>\n.xyzs-win-region{\n        position: fixed;\n        z-index: 20480;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n}\n/*===== win =====*/\n.xyzs-win{\n        width: 500px;\n        margin: 0 auto;\n        position: relative;\n        outline: 0;\n        top: 100px;\n        pointer-events:auto;\n    }\n.xyzs-modal-content{\n        border-radius: 5px;\n        background-clip: padding-box;\n        background-color: #fff;\n        -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;\n        -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n        box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n        pointer-events:auto;\n        border: solid 1px #ff5c4c;\n    }\n.xyzs-modal-close{\n        z-index: 1;\n        position: absolute;\n        right: 12px;\n        top: 8px;\n        overflow: hidden;\n        cursor: pointer;\n        min-width: 25px;\n    }\n.xyzs-icon-ios-close{\n        font-size: 25px;\n        color: #999;\n    }\n.xyzs-modal-header{\n        border-bottom: 1px solid #e8eaec;\n        padding: 10px 16px;\n        text-align: left;\n        font-size: 15px;\n        font-weight: bold;\n        font-family: cursive;\n    }\n.xyzs-modal-body{\n        padding: 16px;\n        font-size: 12px;\n    }\n\n.xyzs-enterprise-list{\n        width: 100%;\n        height: 300px;\n        overflow-y: auto;\n        overflow-x: hidden;\n    }\n.xyzs-enterprise-item{\n        /*height: 20px;*/\n        line-height: 20px;\n        margin: 5px;\n        font-size: 12px;\n        padding: 5px 12px;\n        border: solid 1px #dedede;\n    }\n.xyzs-enterprise-item-ico{\n        color: #ff5c4c;\n        float: right;\n        font-size: 18px;\n        \n    }\n\n.xyzs-scrollbar::-webkit-scrollbar-track {\n        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n        background-color: #F5F5F5;\n        border-radius:5px\n    }\n\n.xyzs-scrollbar::-webkit-scrollbar {\n        width: 10px;\n        background-color: #F5F5F5;\n    }\n\n.xyzs-scrollbar::-webkit-scrollbar-thumb {\n        background-color: rgba(255,92,76,0.7);\n        border-radius:5px\n    }\n.xyzs-scrollbar::-webkit-scrollbar-thumb:hover {\n        background-color: #ff5c4c;\n    }\n    \n        </style>");
            var winRegion = $('<div class="xyzs-win-region"></div>').click(function() {
                return win.hide(), winRegion.css({
                    "background-color": "",
                    "pointer-events": "none"
                }), !1;
            }).css("pointer-events", "none"), win = $('\n        <div class="xyzs-win">\n            <div class="xyzs-modal-content">\n                <div class="xyzs-modal-close">\n                    <i title="关闭" class="fa fa-remove xyzs-icon-ios-close"></i>\n                </div>\n                <div class="xyzs-modal-header">\n                    <div class="xyzs-modal-header-inner">标题</div>\n                </div>\n                <div class="xyzs-modal-body">\n                    内容\n                </div>\n            </div>\n        </div>\n    ').click(function() {
                return !1;
            }).css("pointer-events", "auto").hide();
            return win.find(".xyzs-modal-close").click(function() {
                win.hide(), winRegion.css({
                    "background-color": "",
                    "pointer-events": "none"
                });
            }), winRegion.append(win), body.append(winRegion), {
                show: function(winTitle, winDiv) {
                    winRegion.css({
                        "pointer-events": "auto",
                        "background-color": "rgba(55,55,55,.6)"
                    }), win.show(500), win.find(".xyzs-modal-header-inner").html(winTitle), win.find(".xyzs-modal-body").empty().append(winDiv);
                }
            };
        }
    });
}(jQuery), function() {
    function blacklistRefresh() {
        blacklistFilter(), function() {
            blacklistFunction.HtmlToList().each(function(index, element) {
                if (0 === $(element).find(".xyzs-del-div").length) blacklistFunction.ItemToNameJq(element).after($('<div style="' + blacklistFunction.DleButtonStyle + '" class="xyzs-features-div"></div>').append($('<div title="加入黑名单" class="xyzs-del-div"><i class="fa fa-trash xyzs-del-ico"></i></div>').click(function() {
                    return function(name) {
                        if (name += "", -1 === blacklistList.indexOf(name)) blacklistList.push(name), GM_setValue(blacklistKey, JSON.stringify(blacklistList));
                        blacklistFilter();
                    }(blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(blacklistFunction.DleButtonToItem(this)))), 
                    !1;
                })).append(function() {
                    var hoverTimer;
                    return $('<div title="企业查询" class="xyzs-search-div"><i class="fa fa-search xyzs-search-ico"></i></div>').append(function() {
                        var lists = $('<div class="xyzs-search-div-lists"></div>');
                        return $.each(searchList, function(i, o) {
                            lists.append($('<div title="' + o.Title + '" class="xyzs-search-div-list"><img class="xyzs-search-div-list-img" src="' + o.Host + '/favicon.ico"></div>').click(function() {
                                return window.open(o.Host + o.SearchUrl + encodeURI(blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(blacklistFunction.DleButtonToItem(this))))), 
                                !1;
                            }));
                        }), lists;
                    }()).hover(function() {
                        var _this = this;
                        hoverTimer = setTimeout(function() {
                            $(_this).find(".xyzs-search-div-lists").css("display", "flex");
                        }, 500);
                    }, function() {
                        clearTimeout(hoverTimer), $(this).find(".xyzs-search-div-lists").hide();
                    }).click(function() {
                        return window.open(searchList[0].Host + searchList[0].SearchUrl + encodeURI(blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(blacklistFunction.DleButtonToItem(this))))), 
                        !1;
                    });
                }()));
            });
        }();
    }
    function blacklistFilter() {
        blacklistFunction.HtmlToList().each(function(index, element) {
            var isShow = !0, name = blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(element));
            if (-1 < blacklistList.indexOf(name)) isShow = !1; else for (var i = 0; i < blacklistList.length; i++) if (new RegExp(blacklistList[i], "i").test(name)) {
                isShow = !1;
                break;
            }
            if (isShow) $(element).show(); else $(element).hide();
        });
    }
    var body = $("body");
    body.before('<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />'), 
    body.before("<style>\n            \n            /*=== 功能 ===*/\n            /*.xyzs-features-div{*/\n                /*background: #fff;*/\n            /*}*/\n            .xyzs-del-div{\n                color: #ff5c4c;\n                font-size: 20px;\n                cursor: pointer;\n                float: left;\n                margin: 0 3px;\n            }\n            .xyzs-search-div{\n                color: #ff5c4c;\n                font-size: 20px;\n                cursor: pointer;\n                float: left;\n                margin: 0 3px;\n            }\n            \n            .xyzs-search-ico{\n                color: #ff5c4c!important;\n            }\n            .xyzs-del-ico{\n                color: #ff5c4c!important;\n            }\n            .xyzs-enterprise-item{\n                border-radius: 10px;\n                color: #666;\n            }\n            .xyzs-enterprise-item:hover{\n                background-color: rgba(255,96,80,0.15);\n            }\n            .xyzs-enterprise-item-ico{\n                cursor:pointer;\n            }\n            \n            .xyzs-stand-item{\n                cursor: pointer;\n                margin: 0 10px;\n                padding: 5px 15px;\n            }\n            .xyzs-stand-item:hover{\n                background-color: rgba(255,96,80,0.15);\n            }\n            .xyzs-stand-item img{\n                color: #333;\n            }\n            .xyzs-stand-item span{\n                color: #666;\n                margin-left: 10px;\n                font-size: 14px;\n            }\n            .xyzs-search-div-lists{\n                float: right;\n                padding: 0 5px;\n                background-color: #fff;\n                border: 1px solid;\n                display: none;\n                position: absolute;\n                border-radius: 6px;\n                margin-left: 23px;\n                margin-top: -34px;\n                z-index: 9999;\n                box-shadow: 0 0 10px rgba(82, 82, 82, .3);\n            }\n             .xyzs-search-div-lists::before{  \n                content: '';\n                display: block;\n                position: absolute;\n                top: 8px;\n                left: -8px;\n                border-top: 6px solid transparent;\n                border-right: 8px solid #ff0909;\n                border-bottom: 6px solid transparent;\n            }\n             .xyzs-search-div-lists::after{  \n                content: '';\n                display: block;\n                position: absolute;\n                top: 8px;\n                left: -7px;\n                border-top: 6px solid transparent;\n                border-right: 8px solid #fff;\n                border-bottom: 6px solid transparent;\n            }\n            .xyzs-search-div-list{\n                margin: 5px;\n                line-height: 16px;\n                height: auto;\n                width: 16px;\n            }\n            .xyzs-search-div-list-img{\n                height: 100%;\n                width: 100%;\n                box-shadow: 0 0 5px rgba(82, 82, 82, .3);\n            }\n        </style>");
    var menuItems = [ {
        ico: "fa-eye-slash",
        title: "黑名单管理",
        callback: function() {
            var div = $('\n                    <div class="xyzs-enterprise-list xyzs-scrollbar" ></div>\n                ');
            $.each(blacklistList, function(index, item) {
                div.prepend($('<div class="xyzs-enterprise-item">' + item + "</div>").append($('<i class="fa fa-times xyzs-enterprise-item-ico" title="移除/恢复" item-name="' + item + '"></i>').click(function() {
                    (function(name) {
                        if (-1 < blacklistList.indexOf(name)) blacklistList.splice(blacklistList.indexOf(name), 1), 
                        GM_setValue(blacklistKey, JSON.stringify(blacklistList));
                        blacklistFilter();
                    })($(this).attr("item-name")), $(this).closest(".xyzs-enterprise-item").remove();
                })));
            }), $.WindowXYZS().show("黑名单管理  <span onclick='window.open(\"https://github.com/qq943260285/tampermonkey-recruitment-tool/issues\",\"_blank\");' title='点击反馈' style='cursor:pointer;font-size: 9px;color: #ff5c4c;'>[欢迎提建议和反馈问题（点击）]</span>", div);
        }
    }, {
        ico: "fa-magic",
        title: "支持网站",
        callback: function() {
            var div = $('\n                    <div class="xyzs-stand-list xyzs-scrollbar" ></div>\n                ');
            $.each(WebJqList, function(index, item) {
                div.append($('<div class="xyzs-stand-item" title="点击访问：' + item.WebName + '"><img style="width: 16px;height: 16px;" src="//' + item.WebUrl + '/favicon.ico"><span>' + item.WebName + "</span></div>").click(function() {
                    window.open("//" + item.WebUrl, "_blank");
                }).append($('<i class="fa fa-arrow-right xyzs-enterprise-item-ico"></i>')));
            }), $.WindowXYZS().show("支持网站  <span onclick='window.open(\"https://github.com/qq943260285/tampermonkey-recruitment-tool/issues\",\"_blank\");' title='点击反馈' style='cursor:pointer;font-size: 9px;color: #ff5c4c;'>[欢迎提建议和反馈问题（点击）]</span>", div);
        }
    }, {
        ico: "fa-podcast",
        title: "作者博客",
        callback: function() {
            window.open("https://qq943260285.github.io");
        }
    }, {
        ico: "fa-github",
        title: "github开源",
        callback: function() {
            window.open("https://github.com/qq943260285/tampermonkey-recruitment-tool.git");
        }
    } ];
    $.FloatingToolXYZS(menuItems);
    var blacklistKey = "blacklist", blacklistList = GM_getValue(blacklistKey) ? JSON.parse(GM_getValue(blacklistKey)) : [], blacklistFunction = {
        WebName: null,
        WebUrl: null,
        IsRefresh: null,
        DleButtonStyle: null,
        HtmlToList: function() {},
        ItemToNameJq: function() {},
        NameJqToNameText: function() {},
        DleButtonToItem: function() {}
    }, WebJqList = [ {
        WebName: "前程无忧",
        WebUrl: "search.51job.com",
        IsRefresh: !0,
        DleButtonStyle: "position: absolute;left: -45px;top: 0px; float: left;",
        HtmlToList: function() {
            return $(".j_joblist>.e");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".er a[title]");
        },
        NameJqToNameText: function(item) {
            return $(item).attr("title");
        },
        DleButtonToItem: function(item) {
            return $(item).closest(".e");
        }
    }, {
        WebName: "智联招聘",
        WebUrl: "sou.zhaopin.com",
        IsRefresh: !0,
        DleButtonStyle: "margin: 0 10px;display: inline-table;",
        HtmlToList: function() {
            return $("#listContent .clearfix .commpanyName a[title]").closest(".clearfix");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".commpanyName a[title]");
        },
        NameJqToNameText: function(item) {
            return $(item).attr("title");
        },
        DleButtonToItem: function(item) {
            return $(item).closest(".clearfix");
        }
    }, {
        WebName: "BOSS直聘",
        WebUrl: "www.zhipin.com",
        IsRefresh: !1,
        DleButtonStyle: "float: left;",
        HtmlToList: function() {
            return $(".company-text h3 a[ka]").closest("li");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".company-text h3 a[ka]");
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest("li");
        }
    }, {
        WebName: "拉勾网",
        WebUrl: "www.lagou.com",
        IsRefresh: !0,
        DleButtonStyle: "float: left;",
        HtmlToList: function() {
            return $("li .company_name a[data-lg-tj-cid]").closest("li");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".company_name a[data-lg-tj-cid]");
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest("li");
        }
    }, {
        WebName: "猎聘网",
        WebUrl: "www.liepin.com",
        IsRefresh: !1,
        DleButtonStyle: "display: inline-flex;position: absolute;right: 280px;",
        HtmlToList: function() {
            return $("li .company-name a[title]").closest("li");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".company-name a[title]");
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest("li");
        }
    }, {
        WebName: "58同城",
        WebUrl: "58.com",
        IsRefresh: !1,
        DleButtonStyle: "background: transparent;top: 12px;position: absolute;left: -50px;",
        HtmlToList: function() {
            return $("#list_con li .comp_name a[title]").closest("li");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".comp_name a[title]");
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest("li");
        }
    }, {
        WebName: "百度招聘",
        WebUrl: "zhaopin.baidu.com",
        IsRefresh: !0,
        DleButtonStyle: "background: transparent;top: 0;position: absolute;left: -10px;",
        HtmlToList: function() {
            return $(".listitem .single .companyname").closest(".single");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".companyname");
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest(".single");
        }
    } ], searchList = [ {
        Title: "天眼查",
        Host: "https://tianyancha.com",
        SearchUrl: "/search?key="
    }, {
        Title: "看准",
        Host: "https://kanzhun.com",
        SearchUrl: "/search/?type=company&q="
    }, {
        Title: "企查查",
        Host: "https://qcc.com",
        SearchUrl: "/search?key="
    }, {
        Title: "百度信誉",
        Host: "https://xin.baidu.com",
        SearchUrl: "/s?q="
    }, {
        Title: "百度搜索",
        Host: "https://baidu.com",
        SearchUrl: "/s?wd="
    } ];
    (function() {
        for (var i = 0; i < WebJqList.length; i++) if (-1 != window.location.host.indexOf(WebJqList[i].WebUrl)) {
            blacklistFunction = WebJqList[i];
            break;
        }
        if (blacklistRefresh(), blacklistFunction.IsRefresh) setInterval(blacklistRefresh, 3e3);
    })();
}();