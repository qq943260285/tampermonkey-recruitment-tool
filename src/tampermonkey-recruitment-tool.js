(function () {
    'use strict';
    console.log("xxx")
    let body = $('body');
    body.before('<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />');
    body.before(
        `<style>
            
            /*=== 功能 ===*/
            /*.xyzs-features-div{*/
                /*background: #fff;*/
            /*}*/
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
            .xyzs-enterprise-item{
                border-radius: 10px;
                color: #666;
            }
            .xyzs-enterprise-item:hover{
                background-color: rgba(255,96,80,0.15);
            }
            .xyzs-enterprise-item-ico{
                cursor:pointer;
            }
            
            .xyzs-stand-item{
                cursor: pointer;
                margin: 0 10px;
                padding: 5px 15px;
            }
            .xyzs-stand-item:hover{
                background-color: rgba(255,96,80,0.15);
            }
            .xyzs-stand-item img{
                color: #333;
            }
            .xyzs-stand-item span{
                color: #666;
                margin-left: 10px;
                font-size: 14px;
            }
            .xyzs-search-div-lists{
                float: right;
                padding: 0 5px;
                background-color: #fff;
                border: 1px solid;
                display: none;
                position: absolute;
                border-radius: 6px;
                margin-left: 23px;
                margin-top: -34px;
                z-index: 9999;
                box-shadow: 0 0 10px rgba(82, 82, 82, .3);
            }
             .xyzs-search-div-lists::before{  
                content: '';
                display: block;
                position: absolute;
                top: 8px;
                left: -8px;
                border-top: 6px solid transparent;
                border-right: 8px solid #ff0909;
                border-bottom: 6px solid transparent;
            }
             .xyzs-search-div-lists::after{  
                content: '';
                display: block;
                position: absolute;
                top: 8px;
                left: -7px;
                border-top: 6px solid transparent;
                border-right: 8px solid #fff;
                border-bottom: 6px solid transparent;
            }
            .xyzs-search-div-list{
                margin: 5px;
                line-height: 16px;
                height: auto;
                width: 16px;
            }
            .xyzs-search-div-list-img{
                height: 100%;
                width: 100%;
                box-shadow: 0 0 5px rgba(82, 82, 82, .3);
            }
        </style>`
    );

    let menuItems = [
        {
            ico: "fa-eye-slash",
            title: "黑名单管理",
            callback: function () {
                // console.log("黑名单");https://github.com/qq943260285/tampermonkey-recruitment-tool/issues
                let div = $(`
                    <div class="xyzs-enterprise-list xyzs-scrollbar" ></div>
                `);
                $.each(blacklistList, function (index, item) {
                    div.prepend($(`<div class="xyzs-enterprise-item">` + item + `</div>`)
                        .append($(`<i class="fa fa-times xyzs-enterprise-item-ico" title="移除/恢复" item-name="` + item + `"></i>`)
                            .click(function () {
                                dleDlacklistName($(this).attr('item-name'));
                                $(this).closest('.xyzs-enterprise-item').remove();
                            })
                        )
                    )
                });
                $.WindowXYZS().show("黑名单管理  <span onclick='window.open(\"https://github.com/qq943260285/tampermonkey-recruitment-tool/issues\",\"_blank\");' title='点击反馈' style='cursor:pointer;font-size: 9px;color: #ff5c4c;'>[欢迎提建议和反馈问题（点击）]</span>", div)
            }
        },
        {
            ico: "fa-magic",
            title: "支持网站",
            callback: function () {
                let div = $(`
                    <div class="xyzs-stand-list xyzs-scrollbar" ></div>
                `);
                $.each(WebJqList, function (index, item) {
                    div.append($(`<div class="xyzs-stand-item" title="点击访问：` + item.WebName + `"><img style="width: 16px;height: 16px;" src="//` + item.WebUrl + `/favicon.ico"><span>` + item.WebName + `</span></div>`)
                        .click(function () {
                            window.open("//" + item.WebUrl, "_blank");
                        }).append($(`<i class="fa fa-arrow-right xyzs-enterprise-item-ico"></i>`))
                    )
                });
                $.WindowXYZS().show("支持网站  <span onclick='window.open(\"https://github.com/qq943260285/tampermonkey-recruitment-tool/issues\",\"_blank\");' title='点击反馈' style='cursor:pointer;font-size: 9px;color: #ff5c4c;'>[欢迎提建议和反馈问题（点击）]</span>", div)
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
            //网站名
            WebName: null,
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
        },
        WebJqList = [
            {
                WebName: "前程无忧",
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
                WebName: "智联招聘",
                WebUrl: "sou.zhaopin.com",
                IsRefresh: true,
                DleButtonStyle: 'margin: 0 10px;display: inline-table;',
                HtmlToList: () => $('#listContent .clearfix .commpanyName a[title]').closest('.clearfix'),
                ItemToNameJq: (item) => $(item).find('.commpanyName a[title]'),
                NameJqToNameText: (item) => $(item).attr('title'),
                DleButtonToItem: (item) => $(item).closest('.clearfix')
            },
            {
                WebName: "BOSS直聘",
                WebUrl: "www.zhipin.com",
                IsRefresh: false,
                DleButtonStyle: 'float: left;',
                HtmlToList: () => $('.company-text h3 a[ka]').closest('li'),
                ItemToNameJq: (item) => $(item).find('.company-text h3 a[ka]'),
                NameJqToNameText: (item) => $(item).text(),
                DleButtonToItem: (item) => $(item).closest('li')
            },
            {
                WebName: "拉勾网",
                WebUrl: "www.lagou.com",
                IsRefresh: true,
                DleButtonStyle: 'float: left;',
                HtmlToList: () => $('li .company_name a[data-lg-tj-cid]').closest('li'),
                ItemToNameJq: (item) => $(item).find('.company_name a[data-lg-tj-cid]'),
                NameJqToNameText: (item) => $(item).text(),
                DleButtonToItem: (item) => $(item).closest('li')
            },
            {
                WebName: "猎聘网",
                WebUrl: "www.liepin.com",
                IsRefresh: false,
                DleButtonStyle: 'display: inline-flex;position: absolute;right: 280px;',
                HtmlToList: () => $('li .company-name a[title]').closest('li'),
                ItemToNameJq: (item) => $(item).find('.company-name a[title]'),
                NameJqToNameText: (item) => $(item).text(),
                DleButtonToItem: (item) => $(item).closest('li')
            },
            {
                WebName: "58同城",
                WebUrl: "58.com",
                IsRefresh: false,
                DleButtonStyle: 'background: transparent;top: 12px;position: absolute;left: -50px;',
                HtmlToList: () => $('#list_con li .comp_name a[title]').closest('li'),
                ItemToNameJq: (item) => $(item).find('.comp_name a[title]'),
                NameJqToNameText: (item) => $(item).text(),
                DleButtonToItem: (item) => $(item).closest('li')
            },
            {
                WebName: "百度招聘",
                WebUrl: "zhaopin.baidu.com",
                IsRefresh: true,
                DleButtonStyle: 'background: transparent;top: 0;position: absolute;left: -10px;',
                HtmlToList: () => $('.listitem .single .companyname').closest('.single'),
                ItemToNameJq: (item) => $(item).find('.companyname'),
                NameJqToNameText: (item) => $(item).text(),
                DleButtonToItem: (item) => $(item).closest('.single')
            }],
        searchList = [
            {
                Title: '天眼查',
                Host: "https://tianyancha.com",
                SearchUrl: '/search?key='
            },
            {
                Title: '看准',
                Host: "https://kanzhun.com",
                SearchUrl: '/search/?type=company&q='
            },
            {
                Title: '企查查',
                Host: "https://qcc.com",
                SearchUrl: '/search?key='
            },
            {
                Title: '百度信誉',
                Host: "https://xin.baidu.com",
                SearchUrl: '/s?q='
            },
            {
                Title: '百度搜索',
                Host: "https://baidu.com",
                SearchUrl: '/s?wd='
            },
        ]
    ;

    //====== 初始化 =======
    function blacklistInit() {

        //站点方法初始化
        for (let i = 0; i < WebJqList.length; i++) {
            // console.log(window.location.host);

            if (window.location.host.indexOf(WebJqList[i].WebUrl) != -1) {
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
        console.log("---")
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
            } else {
                for (let i = 0; i < blacklistList.length; i++) {
                    if (new RegExp(blacklistList[i], 'i').test(name)) {
                        isShow = false;
                        console.log(blacklistList[i] + '正则表达式过滤,' + name);
                        break;
                    }
                }
            }
            if (isShow) {
                $(element).show();
            } else {
                $(element).hide();
            }
            console.log("***")
        });
    }

    //====== 添加黑名单 ======
    function addDlacklistName(name) {
        name += '';
        if (blacklistList.indexOf(name) === -1) {
            // console.log("加入黑名单," + name);
            blacklistList.push(name);
            GM_setValue(blacklistKey, JSON.stringify(blacklistList));
        } else {
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
                console.log("*-*")
                blacklistFunction.ItemToNameJq(element).after($('<div style="' + blacklistFunction.DleButtonStyle + '" class="xyzs-features-div"></div>').append(
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
                    ).append(function () {
                        var hoverTimer;
                        return $('<div title="企业查询" class="xyzs-search-div"><i class="fa fa-search xyzs-search-ico"></i></div>')
                            .append(
                                function () {
                                    let lists = $('<div class="xyzs-search-div-lists"></div>');
                                    $.each(searchList, function (i, o) {
                                        lists.append(
                                            $('<div title="' + o.Title + '" class="xyzs-search-div-list"><img class="xyzs-search-div-list-img" src="' + o.Host + '/favicon.ico"></div>')
                                                .click(function () {
                                                    window.open(o.Host + o.SearchUrl +
                                                        encodeURI(
                                                            blacklistFunction.NameJqToNameText(
                                                                blacklistFunction.ItemToNameJq(
                                                                    blacklistFunction.DleButtonToItem(this)
                                                                )
                                                            )));
                                                    return false;
                                                })
                                        )
                                    });
                                    return lists;
                                }()
                            )
                            .hover(function () {
                                    let _this = this;
                                    hoverTimer = setTimeout(function () {
                                        console.log("setTimeout-mouseover", _this, this);
                                        $(_this).find(".xyzs-search-div-lists")
                                            .css('display', 'flex');
                                    }, 500);

                                }
                                , function () {
                                    clearTimeout(hoverTimer);
                                    $(this).find(".xyzs-search-div-lists").hide();
                                }
                            )
                            .click(function () {
                                window.open(searchList[0].Host + searchList[0].SearchUrl +
                                    encodeURI(
                                        blacklistFunction.NameJqToNameText(
                                            blacklistFunction.ItemToNameJq(
                                                blacklistFunction.DleButtonToItem(this)
                                            )
                                        )));

                                return false;
                            })
                    }()
                    )
                )
            }
        });
    }

    // GM_setValue(blacklistKey, JSON.stringify([]));
    blacklistInit();
})();
