![logo](assets/logo.png)

[![Author](https://img.shields.io/badge/Author-xiaoyu-brightgreen)](https://greasyfork.org/zh-TW/scripts/380848)
[![LICENSE](https://img.shields.io/github/license/qq943260285/tampermonkey-recruitment-tool)](LICENSE)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/dhdgffkkebhmkfjojejmpbldmpobfkfo.svg)](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
[![Install](https://img.shields.io/badge/Install-V4.23.2.25-brightgreen)](https://greasyfork.org/zh-TW/scripts/380848)
![Stars](https://img.shields.io/github/stars/qq943260285/tampermonkey-recruitment-tool?style=social)

# 高级求职助手/招聘网站助手

- 快捷添加公司/企业黑名单，眼不见心不烦
- 支持全网热门招聘网站，前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、58同城
- 快捷公司/企业信息查询，支持天眼查、看准、企查查、爱企查、百度信誉、百度搜索
- 全网招聘网站黑名单数据连通，一站添加，全网使用
- 让长期挂网招聘、黑色（灰色）招聘、培训机构通通消失
- 您的求职你做主，加油
- 代码开源，放心使用（[点个star支持项目](https://github.com/qq943260285/tampermonkey-recruitment-tool)）



## 安装使用
#### Greasy Fork安装

[安装地址](https://greasyfork.org/zh-TW/scripts/380848)

手动复制
```js
// ==UserScript==
// @name         高级求职助手/招聘网站助手，支持前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、58同城
// @namespace    https://github.com/qq943260285
// @version      4.23.2.25
// @description  1.快捷添加企业黑名单；2.快捷公司/企业信息查询，支持天眼查、看准、企查查、爱企查、百度信誉、百度搜索；3.支持全网热门招聘网站，前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、58同城；4.各大网站黑名单数据连通。
// @author       小宇专属
// @license      GPL-3.0-only
// @icon         https://raw.githubusercontent.com/qq943260285/tampermonkey-recruitment-tool/master/assets/logo_ico.png
// @create       2019-03-25
// @lastmodified 2023-02-25
// @home-url     https://greasyfork.org/zh-TW/scripts/380848
// @supportURL   https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @feedback-url https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @note         2023-2-25 1.修复猎聘失效问题 2.修复前程无忧失效问题 3.去除百度招聘
// @match        *://*.51job.com/*
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
            body.before("<style>.xyzs-tool-region{position:fixed;z-index:20480;left:0;top:0;width:100%;height:100%}.xyzs-tool{background-color:#ff5c4c;width:50px;height:50px;border-radius:25px;-moz-border-radius:25px;position:absolute;left:10px;bottom:10px;cursor:move;pointer-events:auto;-moz-box-shadow:1px 1px 10px rgba(82,82,82,.74);-webkit-box-shadow:1px 1px 10px rgba(82,82,82,.74);box-shadow:1px 1px 10px rgba(82,82,82,.74);-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.xyzs-tool .menu{width:200px;height:50px;position:absolute;left:50px;display:none;padding:0 10px}.xyzs-tool .fa-tool{font-size:27px;color:#fff!important}.xyzs-menu-item{height:30px;width:30px;border-radius:15px;float:left;margin:10px;background-color:#ff5c4c;-moz-box-shadow:1px 1px 10px rgba(82,82,82,.74);-webkit-box-shadow:1px 1px 10px rgba(82,82,82,.74);box-shadow:1px 1px 10px rgba(82,82,82,.74);text-align:center}.xyzs-menu-item:hover{-moz-box-shadow:1px 1px 15px #232323;-webkit-box-shadow:1px 1px 15px #232323;box-shadow:1px 1px 15px #232323}.xyzs-menu-item .fa-item{font-size:20px;margin:auto 0;width:30px;height:30px;line-height:30px;cursor:pointer;color:#fff}</style>");
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
            }).mousemove(function(left) {
                if (isMobile) {
                    var mouseX = left.originalEvent.x || left.originalEvent.layerX || 0, mouseY = left.originalEvent.y || left.originalEvent.layerY || 0, bottom = tool.position().top, X = tool.position().left, winH = $(window).height(), winW = $(window).width();
                    toolPosition.x = X, toolPosition.y = bottom;
                    left = X + mouseX - mousedownPosition.x, bottom = winH - 50 - bottom - mouseY + mousedownPosition.y;
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
                for (var i = 0; i < menuItems.length; i++) (function(i) {
                    menu.append($('<div class="xyzs-menu-item animated rubberBand"><i class="fa ' + menuItems[i].ico + ' fa-item " title="' + menuItems[i].title + '"></i></div>').click(function() {
                        menuItems[i].callback();
                    }));
                })(i);
            };
            createMenu(), tool.append(menu), toolRegion.append(tool), body.append(toolRegion);
        }
    });
})(jQuery), function($) {
    $.extend({
        WindowXYZS: function() {
            var body = $("body");
            body.before("<style>.xyzs-win-region{position:fixed;z-index:20480;left:0;top:0;width:100%;height:100%}.xyzs-win{width:500px;margin:0 auto;position:relative;outline:0;top:100px;pointer-events:auto}.xyzs-modal-content{border-radius:5px;background-clip:padding-box;background-color:#fff;-moz-box-shadow:1px 1px 10px rgba(82,82,82,.74);-webkit-box-shadow:1px 1px 10px rgba(82,82,82,.74);box-shadow:1px 1px 10px rgba(82,82,82,.74);pointer-events:auto;border:solid 1px #ff5c4c}.xyzs-modal-close{z-index:1;position:absolute;right:12px;top:8px;overflow:hidden;cursor:pointer;min-width:25px}.xyzs-icon-ios-close{font-size:25px;color:#999}.xyzs-modal-header{border-bottom:1px solid #e8eaec;padding:10px 16px;text-align:left;font-size:15px;font-weight:700;font-family:cursive}.xyzs-modal-body{padding:16px;font-size:12px}.xyzs-enterprise-list{width:100%;height:300px;overflow-y:auto;overflow-x:hidden}.xyzs-enterprise-item{line-height:20px;margin:5px;font-size:12px;padding:5px 12px;border:solid 1px #dedede}.xyzs-enterprise-item-ico{color:#ff5c4c;float:right;font-size:18px}.xyzs-scrollbar::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#f5f5f5;border-radius:5px}.xyzs-scrollbar::-webkit-scrollbar{width:10px;background-color:#f5f5f5}.xyzs-scrollbar::-webkit-scrollbar-thumb{background-color:rgba(255,92,76,.7);border-radius:5px}.xyzs-scrollbar::-webkit-scrollbar-thumb:hover{background-color:#ff5c4c}</style>");
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
    function saveSearchList() {
        for (var arr = [], i = 0; i < searchList.length; i++) {
            var item = searchList[i];
            arr.push({
                Id: item.Id,
                Title: item.Title,
                Host: item.Host,
                SearchUrl: item.SearchUrl,
                Ico: item.Ico,
                Show: item.Show
            });
        }
        if ("function" == typeof GM_setValue) GM_setValue(searchListKey, JSON.stringify(arr));
    }
    function blacklistRefresh() {
        blacklistFilter(), function(status) {
            status = status || "1", blacklistFunction.HtmlToList().filter("[xyzs!='" + status + "']").each(function(index, element) {
                if ($(element).attr("xyzs", "1"), 0 === $(element).find(".xyzs-del-div").length) blacklistFunction.ItemToNameJq(element).after($('<div style="' + blacklistFunction.DleButtonStyle + '" class="xyzs-features-div"></div>').append($('<div title="加入黑名单" class="xyzs-del-div"><i class="fa fa-trash xyzs-del-ico"></i></div>').click(function() {
                    return $(blacklistFunction.DleButtonToItem(this)).attr("xyzs", "0"), function(name) {
                        if (name += "", -1 === blacklistList.indexOf(name)) blacklistList.push(name), GM_setValue(blacklistKey, JSON.stringify(blacklistList));
                        blacklistFilter();
                    }(blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(blacklistFunction.DleButtonToItem(this)))),
                        !1;
                })).append(function() {
                    var hoverTimer;
                    return $('<div title="企业查询" class="xyzs-search-div"><i class="fa fa-search xyzs-search-ico"></i></div>').append(function() {
                        var lists = $('<div class="xyzs-search-div-lists"></div>');
                        return $.each(searchList, function(i, o) {
                            if (o.Show) {
                                var icoUrl = o.Ico || o.Host + "/favicon.ico";
                                lists.append($('<div title="' + o.Title + '" class="xyzs-search-div-list"><img class="xyzs-search-div-list-img" src="' + icoUrl + '"></div>').click(function() {
                                    return window.open(o.Host + o.SearchUrl + encodeURI(blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(blacklistFunction.DleButtonToItem(this))))),
                                        !1;
                                }));
                            }
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
    function blacklistFilter(status) {
        status = status || "1", blacklistFunction.HtmlToList().filter("[xyzs!='" + status + "']").each(function(index, element) {
            var isShow = !0, name = blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(element));
            if (-1 < blacklistList.indexOf(name)) isShow = !1; else for (var i = 0; i < blacklistList.length; i++) {
                for (var re = blacklistList[i], j = 0; j < regExpCharacter.length; j++) re = re.replace(new RegExp("\\" + regExpCharacter[j], "g"), "\\" + regExpCharacter[j]);
                if (new RegExp(re, "i").test(name)) {
                    isShow = !1;
                    break;
                }
            }
            if (isShow) $(element).show(); else $(element).hide();
        });
    }
    var body = $("body");
    body.before('<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />'),
        body.before("<style>.xyzs-del-div{color:#ff5c4c;font-size:20px;cursor:pointer;float:left;margin:0 3px}.xyzs-search-div{color:#ff5c4c;font-size:20px;cursor:pointer;float:left;margin:0 3px}.xyzs-search-ico{color:#ff5c4c!important}.xyzs-del-ico{color:#ff5c4c!important}.xyzs-enterprise-item{border-radius:10px;color:#666}.xyzs-enterprise-item:hover{background-color:rgba(255,96,80,.15)}.xyzs-enterprise-item-ico{cursor:pointer}.xyzs-stand-item{cursor:pointer;margin:0 10px;padding:5px 15px}.xyzs-stand-item:hover{background-color:rgba(255,96,80,.15)}.xyzs-stand-item img{color:#333}.xyzs-stand-item span{color:#666;margin-left:10px;font-size:14px}.xyzs-stand-item i{padding:0 2px}.xyzs-search-div-lists{float:right;padding:0 5px;background-color:#fff;border:1px solid;display:none;position:absolute;border-radius:6px;margin-left:23px;margin-top:-34px;z-index:9999;box-shadow:0 0 10px rgba(82,82,82,.3)}.xyzs-search-div-lists::before{content:'';display:block;position:absolute;top:8px;left:-8px;border-top:6px solid transparent;border-right:8px solid #ff0909;border-bottom:6px solid transparent}.xyzs-search-div-lists::after{content:'';display:block;position:absolute;top:8px;left:-7px;border-top:6px solid transparent;border-right:8px solid #fff;border-bottom:6px solid transparent}.xyzs-search-div-list{margin:5px;line-height:16px;height:auto;width:16px}.xyzs-search-div-list-img{height:100%;width:100%;box-shadow:0 0 5px rgba(82,82,82,.3)}.xyzs-modal-body .modal-content{text-align:center}.xyzs-modal-body .reward-title{margin:15px auto;padding-bottom:5px;font-size:1.45rem;font-weight:700;line-height:1.45rem}.xyzs-modal-body .reward-img{height:150px;padding:0 25px}</style>"), $.FloatingToolXYZS([ {
        ico: "fa-eye-slash",
        title: "黑名单管理",
        callback: function() {
            var div = $('\n                    <div class="xyzs-enterprise-list xyzs-scrollbar" ></div>\n                ');
            $.each(blacklistList, function(index, item) {
                div.prepend($('<div class="xyzs-enterprise-item">' + item + "</div>").append($('<i class="fa fa-times xyzs-enterprise-item-ico" title="移除/恢复" item-name="' + item + '"></i>').click(function() {
                    (function(name) {
                        if (-1 < blacklistList.indexOf(name)) blacklistList.splice(blacklistList.indexOf(name), 1),
                            GM_setValue(blacklistKey, JSON.stringify(blacklistList));
                        blacklistFilter("0");
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
        ico: "fa-search",
        title: "搜索引擎管理",
        callback: function() {
            var div = $('<div class="xyzs-stand-list xyzs-scrollbar" ></div>');
            $.each(searchList, function(index, item) {
                var icoUrl = item.Ico || item.Host + "/favicon.ico";
                item.div = $('<div class="xyzs-stand-item" index=' + index + '><img style="width: 16px;height: 16px;" src="' + icoUrl + '"><span>' + item.Title + "</span></div>");
                var i1 = $('<i title="上移" class="fa fa-arrow-up xyzs-enterprise-item-ico"></i>').click(function() {
                    var index = Number($(i1).parent().attr("index"));
                    if (0 != index) {
                        var this_tmp = searchList[index], tmp = searchList[index - 1];
                        tmp.div.insertAfter(this_tmp.div), tmp.div.attr("index", index), this_tmp.div.attr("index", index - 1),
                            searchList[index - 1] = this_tmp, searchList[index] = tmp, saveSearchList();
                    }
                });
                item.div.append(i1);
                var i2 = $('<i title="下移" class="fa fa-arrow-down xyzs-enterprise-item-ico"></i>').click(function() {
                    var index = Number($(i2).parent().attr("index"));
                    if (index != searchList.length - 1) {
                        var this_tmp = searchList[index], tmp = searchList[index + 1];
                        tmp.div.insertBefore(this_tmp.div), tmp.div.attr("index", index), this_tmp.div.attr("index", index + 1),
                            searchList[index + 1] = this_tmp, searchList[index] = tmp, saveSearchList();
                    }
                });
                item.div.append(i2);
                var i3 = $('<i title="显示/隐藏" class="fa ' + (item.Show ? "fa-eye" : "fa-eye-slash") + ' xyzs-enterprise-item-ico"></i>').click(function() {
                    var index = Number($(i3).parent().attr("index"));
                    searchList[index].Show = !searchList[index].Show, i3.toggleClass("fa-eye"), i3.toggleClass("fa-eye-slash"),
                        saveSearchList();
                });
                item.div.append(i3), div.append(item.div);
            }), $.WindowXYZS().show("搜索引擎管理", div);
        }
    }, {
        ico: "fa-exclamation",
        title: "关于",
        callback: function() {
            var div = $('<div class="modal-content"></div>');
            div.append('<div><h4 class="reward-title">高级求职助手/招聘网站助手</h4><p>支持前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、百度百聘、58同城</p></div>'),
                div.append($("<div></div>").append($('<h4 class="reward-title" title="GitHub开源项目，点击Star支持一下">开源项目：<i class="fa fa-github"></i>，感谢您的捐赠及支持</h4>').click(function() {
                    window.open("https://github.com/qq943260285/tampermonkey-recruitment-tool.git", "_blank");
                })).append('<div class="reward-content"><img src="data:image/png;base64,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"class="reward-img" alt="微信打赏二维码"><img src="data:image/png;base64,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" class="reward-img" alt="支付宝打赏二维码"></div>')),
                $.WindowXYZS().show("关于", div);
        }
    } ]);
    var regExpCharacter = [ "\\", "$", "(", ")", "{", "}", "*", "+", ".", "[", "]", "?", "^", "|" ], blacklistKey = "blacklist", searchListKey = "searchList", blacklistList = "function" == typeof GM_getValue ? JSON.parse(GM_getValue(blacklistKey) || "[]") : [], blacklistFunction = {
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
        WebUrl: "we.51job.com",
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
            return $(".positionlist>.joblist-box__item");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".iteminfo__line1__compname__name");
        },
        NameJqToNameText: function(item) {
            return $(item).attr("title");
        },
        DleButtonToItem: function(item) {
            return $(item).closest(".joblist-box__item");
        }
    }, {
        WebName: "BOSS直聘",
        WebUrl: "www.zhipin.com",
        IsRefresh: !0,
        DleButtonStyle: "float: left;",
        HtmlToList: function() {
            return $(".company-name a[ka]").closest("li");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".company-name a[ka]");
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
            return $("#jobList").children("div").eq(0).children("div");
        },
        ItemToNameJq: function(item) {
            return $(item).children("div").eq(0).children("div").eq(1).children("div").eq(0).children("a").eq(0);
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest("div[xyzs]");
        }
    }, {
        WebName: "猎聘网",
        WebUrl: "www.liepin.com",
        IsRefresh: !0,
        DleButtonStyle: "display: inline-flex;position: absolute;right: 280px;",
        HtmlToList: function() {
            return $("div .job-card-pc-container");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".company-name");
        },
        NameJqToNameText: function(item) {
            return $(item).text();
        },
        DleButtonToItem: function(item) {
            return $(item).closest("div[xyzs]");
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
    } ], searchList = 0 ? JSON.parse(GM_getValue(searchListKey) || "[]") : [], defaultSearchList = [ {
        Id: 1,
        Title: "天眼查",
        Host: "https://tianyancha.com",
        SearchUrl: "/search?key=",
        Show: !0
    }, {
        Id: 2,
        Title: "爱企查",
        Host: "https://aiqicha.baidu.com",
        SearchUrl: "s?t=0&q=",
        Ico: "http://xinpub.cdn.bcebos.com/static/favicon.ico",
        Show: !0
    }, {
        Id: 3,
        Title: "看准",
        Host: "https://kanzhun.com",
        SearchUrl: "/search/?type=company&q=",
        Show: !0
    }, {
        Id: 4,
        Title: "企查查",
        Host: "https://qcc.com",
        SearchUrl: "web/search?key=",
        Ico: "https://qcc-static.qcc.com/resources/web/omaterial/favicon.png",
        Show: !0
    }, {
        Id: 5,
        Title: "百度搜索",
        Host: "https://baidu.com",
        SearchUrl: "/s?wd=",
        Show: !0
    } ];
    (function() {
        for (var i = 0; i < WebJqList.length; i++) if (-1 != window.location.host.indexOf(WebJqList[i].WebUrl)) {
            blacklistFunction = WebJqList[i];
            break;
        }
        for (var _i = 0; _i < defaultSearchList.length; _i++) {
            for (var exist = !1, item = defaultSearchList[_i], j = 0; j < searchList.length; j++) if (searchList[j].Id === item.Id) {
                exist = !0;
                break;
            }
            if (!exist) searchList.push(item), saveSearchList();
        }
        if (blacklistRefresh(), blacklistFunction.IsRefresh) setInterval(blacklistRefresh, 3e3);
    })();
}();
```

## 测试使用

- 程序功能

  ![截图](assets/1.jpg)

- 黑名单管理

  ![截图](assets/2.jpg)

- 支持网站

  ![截图](assets/3.jpg)

- 搜索引擎管理

  ![截图](assets/4.jpg)

## 捐赠支持
感谢您的捐赠及支持

微信

![微信](assets/wechat.png)

支付宝

![支付宝](assets/alipay.png)


## 许可 

[MPL3.0](LICENSE) 
