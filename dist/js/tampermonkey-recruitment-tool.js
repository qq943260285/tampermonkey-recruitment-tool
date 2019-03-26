"use strict";

(function() {
    function blacklistRefresh() {
        blacklistFilter(), function() {
            blacklistFunction.HtmlToList().each(function(index, element) {
                if (0 === $(element).find(".xyzs-del-div").length) blacklistFunction.ItemToNameJq(element).after($('<div title="加入黑名单" style="' + blacklistFunction.DleButtonStyle + '" class="xyzs-del-div"><i class="fa fa-trash xyzs-del-ico"></i></div>').click(function() {
                    return function(name) {
                        if (name += "", -1 === blacklistList.indexOf(name)) blacklistList.push(name), GM_setValue(blacklistKey, JSON.stringify(blacklistList));
                        blacklistFilter();
                    }(blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(blacklistFunction.DleButtonToItem(this)))), 
                    !1;
                }));
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
    $("body").before("<style>\n            \n            /*=== 功能 ===*/\n            .xyzs-del-div{\n                color: #ff5c4c;\n                font-size: 20px;\n                cursor: pointer;\n            }\n            .xyzs-del-ico{\n            \n                color: #ff5c4c!important;\n            }\n        </style>");
    var menuItems = [ {
        ico: "fa-eye-slash",
        title: "黑名单管理",
        callback: function() {
            var div = $('\n                    <div class="xyzs-enterprise-list xyzs-scrollbar" ></div>\n                ');
            $.each(blacklistList, function(index, item) {
                div.append($('<div class="xyzs-enterprise-item">' + item + "</div>").append($('<i class="fa fa-times xyzs-enterprise-item-ico" title="删除" item-name="' + item + '"></i>').click(function() {
                    (function(name) {
                        if (-1 < blacklistList.indexOf(name)) blacklistList.splice(blacklistList.indexOf(name), 1), 
                        GM_setValue(blacklistKey, JSON.stringify(blacklistList));
                        blacklistFilter();
                    })($(this).attr("item-name")), $(this).closest(".xyzs-enterprise-item").remove();
                })));
            }), $.WindowXYZS().show("黑名单管理", div);
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
        WebUrl: null,
        IsRefresh: null,
        DleButtonStyle: null,
        HtmlToList: function() {},
        ItemToNameJq: function() {},
        NameJqToNameText: function() {},
        DleButtonToItem: function() {}
    }, WebJqList = [ {
        WebUrl: "search.51job.com",
        IsRefresh: !1,
        DleButtonStyle: "margin: 0 10px;display: contents;",
        HtmlToList: function() {
            return $(".el .t2 a[title]").closest(".el");
        },
        ItemToNameJq: function(item) {
            return $(item).find(".t2 a[title]");
        },
        NameJqToNameText: function(item) {
            return $(item).attr("title");
        },
        DleButtonToItem: function(item) {
            return $(item).closest(".el");
        }
    }, {
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
        WebUrl: "www.zhipin.com",
        IsRefresh: !1,
        DleButtonStyle: "margin: 0 10px;display: inline-table;",
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
        WebUrl: "www.lagou.com",
        IsRefresh: !1,
        DleButtonStyle: "margin: 0 10px;display: inline-table;",
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
        WebUrl: "www.liepin.com",
        IsRefresh: !1,
        DleButtonStyle: "margin: 0 10px;display: inline-flex;position: absolute;right: 12px;",
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
    } ];
    (function() {
        for (var i = 0; i < WebJqList.length; i++) if (WebJqList[i].WebUrl === window.location.host) {
            blacklistFunction = WebJqList[i];
            break;
        }
        if (blacklistRefresh(), blacklistFunction.IsRefresh) setInterval(blacklistRefresh, 3e3);
    })();
})();