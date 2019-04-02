(function () {
    'use strict';
    console.log("xxx")
    let body = $('body');
    body.before('<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />');
    body.before(
        `<style>
            
            /*=== 功能 ===*/
            .xyzs-features-div{
                background: #fff;
            }
            .xyzs-del-div{
                color: #ff5c4c;
                font-size: 20px;
                cursor: pointer;
                float: left;
                margin: 0 3px;
            }
            .xyzs-search-div{
                color: #ff5c4c;
                font-size: 20px;
                cursor: pointer;
                float: left;
                margin: 0 3px;
            }
            
            .xyzs-search-ico{
                color: #ff5c4c!important;
            }
            .xyzs-del-ico{
                color: #ff5c4c!important;
            }
        </style>`
    );

    let menuItems = [
        {
            ico: "fa-eye-slash",
            title: "黑名单管理",
            callback: function () {
                // console.log("黑名单");
                let div = $(`
                    <div class="xyzs-enterprise-list xyzs-scrollbar" ></div>
                `);
                $.each(blacklistList, function (index, item) {
                    div.prepend($(`<div class="xyzs-enterprise-item">` + item + `</div>`)
                        .append($(`<i class="fa fa-times xyzs-enterprise-item-ico" title="删除" item-name="` + item + `"></i>`)
                            .click(function () {
                                dleDlacklistName($(this).attr('item-name'));
                                $(this).closest('.xyzs-enterprise-item').remove();
                            })
                        )
                    )
                });
                $.WindowXYZS().show("黑名单管理", div)
            }
        },
        // {
        //     ico: "fa-cog",
        //     title: "设置",
        //     callback: function () {
        //         // console.log("设置");
        //     }
        // },
        {
            ico: "fa-podcast",
            title: "作者博客",
            callback: function () {
                // console.log("作者博客");
                window.open("https://qq943260285.github.io");
            }
        },
        {
            ico: "fa-github",
            title: "github开源",
            callback: function () {
                // console.log("github")
                window.open('https://github.com/qq943260285/tampermonkey-recruitment-tool.git');
            }
        },
    ];
    $.FloatingToolXYZS(menuItems);


    //========== 功能相关 ==========
    let blacklistKey = 'blacklist'
        , blacklistList = GM_getValue(blacklistKey) ? JSON.parse(GM_getValue(blacklistKey)) : []
        , blacklistFunction = {
        //网站
        WebUrl: null,
        //是否需要刷新
        IsRefresh: null,
        //加入黑名单按钮样式
        DleButtonStyle: null,
        //网站定位列表
        HtmlToList: () => {
        },
        //列表项定位名称对象
        ItemToNameJq: () => {
        },
        //名称对象定位名称字符串
        NameJqToNameText: () => {
        },
        //x按钮定位Item
        DleButtonToItem: () => {
        }
    }, WebJqList = [
        {
            WebUrl: "search.51job.com",
            IsRefresh: false,
            //margin: 0 10px;display: inline;position: absolute;
            DleButtonStyle: 'position: absolute;left: 295px;display: inline-flex;',
            HtmlToList: () => $('.el .t2 a[title]').closest('.el'),
            ItemToNameJq: (item) => $(item).find('.t2 a[title]'),
            NameJqToNameText: (item) => $(item).attr('title'),
            DleButtonToItem: (item) => $(item).closest('.el')
        },
        {
            WebUrl: "sou.zhaopin.com",
            IsRefresh: true,
            DleButtonStyle: 'margin: 0 10px;display: inline-table;',
            HtmlToList: () => $('#listContent .clearfix .commpanyName a[title]').closest('.clearfix'),
            ItemToNameJq: (item) => $(item).find('.commpanyName a[title]'),
            NameJqToNameText: (item) => $(item).attr('title'),
            DleButtonToItem: (item) => $(item).closest('.clearfix')
        },
        {
            WebUrl: "www.zhipin.com",
            IsRefresh: false,
            DleButtonStyle: 'float: left;',
            HtmlToList: () => $('.company-text h3 a[ka]').closest('li'),
            ItemToNameJq: (item) => $(item).find('.company-text h3 a[ka]'),
            NameJqToNameText: (item) => $(item).text(),
            DleButtonToItem: (item) => $(item).closest('li')
        },
        {
            WebUrl: "www.lagou.com",
            IsRefresh: false,
            DleButtonStyle: 'float: left;',
            HtmlToList: () => $('li .company_name a[data-lg-tj-cid]').closest('li'),
            ItemToNameJq: (item) => $(item).find('.company_name a[data-lg-tj-cid]'),
            NameJqToNameText: (item) => $(item).text(),
            DleButtonToItem: (item) => $(item).closest('li')
        },
        {
            WebUrl: "www.liepin.com",
            IsRefresh: false,
            DleButtonStyle: 'display: inline-flex;position: absolute;right: 280px;',
            HtmlToList: () => $('li .company-name a[title]').closest('li'),
            ItemToNameJq: (item) => $(item).find('.company-name a[title]'),
            NameJqToNameText: (item) => $(item).text(),
            DleButtonToItem: (item) => $(item).closest('li')
        }];

    //====== 初始化 =======
    function blacklistInit() {

        //站点方法初始化
        for (let i = 0; i < WebJqList.length; i++) {
            // console.log(window.location.host);

            if (WebJqList[i].WebUrl === window.location.host) {
                blacklistFunction = WebJqList[i];
                break;
            }
        }
        //刷新
        blacklistRefresh();
        if (blacklistFunction.IsRefresh) setInterval(blacklistRefresh, 3000);
    }

    //====== 刷新 ======
    function blacklistRefresh() {
        //过滤列表
        blacklistFilter();
        //添加按钮
        createDelDiv();
    }

    //====== 过滤列表 ======
    function blacklistFilter() {
        blacklistFunction.HtmlToList().each(function (index, element) {
            let isShow = true;
            let name = blacklistFunction.NameJqToNameText(blacklistFunction.ItemToNameJq(element));
            if (blacklistList.indexOf(name) > -1) {
                isShow = false;
                // console.log('indexOf过滤,' + name);
            }
            else {
                for (let i = 0; i < blacklistList.length; i++) {
                    if (new RegExp(blacklistList[i], 'i').test(name)) {
                        isShow = false;
                        // console.log(blacklistList[i] + '正则表达式过滤,' + name);
                        break;
                    }
                }
            }
            if (isShow) {
                $(element).show();
            } else {
                $(element).hide();
            }
        });
    }

    //====== 添加黑名单 ======
    function addDlacklistName(name) {
        name += '';
        if (blacklistList.indexOf(name) === -1) {
            // console.log("加入黑名单," + name);
            blacklistList.push(name);
            GM_setValue(blacklistKey, JSON.stringify(blacklistList));
        }
        else {
            // console.log("已存在黑名单," + name);
        }
        blacklistFilter();
    }

    //====== 删除黑名单 ======
    function dleDlacklistName(name) {
        if (blacklistList.indexOf(name) > -1) {
            blacklistList.splice(blacklistList.indexOf(name), 1);
            GM_setValue(blacklistKey, JSON.stringify(blacklistList));
        }
        blacklistFilter();
    }

    //====== 创建隐藏按钮 ======
    function createDelDiv() {
        blacklistFunction.HtmlToList().each(function (index, element) {
            if ($(element).find('.xyzs-del-div').length === 0) {
                blacklistFunction.ItemToNameJq(element).after($('<div style="' + blacklistFunction.DleButtonStyle+'" class="xyzs-features-div"></div>').append(
                    $('<div title="加入黑名单" class="xyzs-del-div"><i class="fa fa-trash xyzs-del-ico"></i></div>')
                        .click(function () {
                            addDlacklistName(
                                blacklistFunction.NameJqToNameText(
                                    blacklistFunction.ItemToNameJq(
                                        blacklistFunction.DleButtonToItem(this)
                                    )
                                )
                            );
                            return false;
                        })
                ).append(

                    //企查查
                    //https://www.qichacha.com/material/theme/chacha/cms/v2/images/favicon.png
                    //https://www.qichacha.com/search?key=瑞多思
                    //天眼查
                    //https://cdn.tianyancha.com/wap/images/18blue/weixinlogo.png
                    //https://www.tianyancha.com/search?key=瑞多思
                    $('<div title="企业查询" class="xyzs-search-div"><i class="fa fa-search xyzs-search-ico"></i></div>')
                        .click(function () {
                            window.open('https://www.tianyancha.com/search?key='+
                                encodeURI(
                                blacklistFunction.NameJqToNameText(
                                    blacklistFunction.ItemToNameJq(
                                        blacklistFunction.DleButtonToItem(this)
                                    )
                                )));

                            return false;
                        })
                ))
            }
        });
    }

    // GM_setValue(blacklistKey, JSON.stringify([]));
    blacklistInit();
})();
