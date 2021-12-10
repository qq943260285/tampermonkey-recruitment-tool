// ==UserScript==
// @name         高级求职助手/招聘网站助手，支持前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、百度百聘、58同城
// @namespace    https://github.com/qq943260285
// @version      3.21.1210
// @description  1.快捷添加企业黑名单；2.快捷公司/企业信息查询，支持天眼查、看准、企查查、爱企查、百度信誉、百度搜索3.支持全网热门招聘网站，前程无忧、智联招聘、BOSS直聘、拉钩网、猎聘网、百度百聘、58同城;4.各大网站黑名单数据连通。
// @author       小宇专属
// @license      GPL-3.0-only
// @icon         https://raw.githubusercontent.com/qq943260285/tampermonkey-recruitment-tool/master/assets/logo_ico.png
// @create       2019-03-25
// @lastmodified 2021-12-10
// @home-url     https://greasyfork.org/zh-TW/scripts/380848
// @supportURL   https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @feedback-url https://github.com/qq943260285/tampermonkey-recruitment-tool.git
// @note         2021-12-10 1.修复猎聘网改版支持；2.添加爱企查企业信息查询；3.优化代码及匹配规则；
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
            body.before("<style><%= FloatingToolCss %></style>");
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
            body.before("<style><%= WindowCss %></style>");
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
        if ("function" == typeof GM_setValue) GM_setValue(searchListKey, arr);
    }
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
                            if (o.Show) lists.append($('<div title="' + o.Title + '" class="xyzs-search-div-list"><img class="xyzs-search-div-list-img" src="' + o.Host + '/favicon.ico"></div>').click(function() {
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
    body.before("<style><%= IndexCss %></style>"), $.FloatingToolXYZS([ {
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
        ico: "fa-cog",
        title: "设置",
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
            }), $.WindowXYZS().show("设置", div);
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
    } ]);
    var regExpCharacter = [ "\\", "$", "(", ")", "{", "}", "*", "+", ".", "[", "]", "?", "^", "|" ], blacklistKey = "blacklist", searchListKey = "searchList", blacklistList = "function" == typeof GM_getValue ? JSON.parse(GM_getValue(blacklistKey)) || [] : [], blacklistFunction = {
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
            return $("li .job-list-item").closest("li");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".company-name");
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
    } ], searchList = "function" == typeof GM_getValue ? JSON.parse(GM_getValue(searchListKey)) || [] : [], defaultSearchList = [ {
        Id: 1,
        Title: "天眼查",
        Host: "https://tianyancha.com",
        SearchUrl: "/search?key=",
        Show: !0
    }, {
        Id: 2,
        Title: "看准",
        Host: "https://kanzhun.com",
        SearchUrl: "/search/?type=company&q=",
        Show: !0
    }, {
        Id: 3,
        Title: "企查查",
        Host: "https://qcc.com",
        SearchUrl: "/search?key=",
        Show: !0
    }, {
        Id: 4,
        Title: "爱企查",
        Host: "https://aiqicha.baidu.com",
        SearchUrl: "/s?q=",
        Ico: "http://xinpub.cdn.bcebos.com/static/favicon.ico",
        Show: !0
    }, {
        Id: 5,
        Title: "百度信誉",
        Host: "https://xin.baidu.com",
        SearchUrl: "/s?q=",
        Show: !0
    }, {
        Id: 6,
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