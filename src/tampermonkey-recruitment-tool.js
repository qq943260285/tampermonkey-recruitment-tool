(function () {
    'use strict';
    console.log("xxx")
    let toolSize = 50;
    let positionLeft = true;
    //控制展开
    let isExpand = true;
    let body = $('body');
    body.before(`<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />`)
    body.before(
        `<style>
            .xyzs-tool-region{
            position: fixed;
             z-index: 20480;
             left: 0;
             top: 0;
             width: 100%;
             height: 100%;
            }
            .xyzs-tool{
             background-color: #ff5c4c;
             width: ` + toolSize + `px;
             height: ` + toolSize + `px;
             border-radius:` + toolSize / 2 + `px;
             -moz-border-radius:` + toolSize / 2 + `px; 
             position: absolute;
             left: 10px;
             bottom: 10px;
             cursor: move;
             pointer-events:auto;
             -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;
             -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
             box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
            }
            .xyzs-tool .menu{
            width: 200px;
            height: 50px;
            position: absolute;
            left: ` + toolSize + `px;
            display: none;
            transition: display 3s;
            padding: 0 10px;
            }
            .xyzs-tool .fa-tool{
             font-size: 27px;
             color: #FFF!important;
            }
            .xyzs-menu-item{
            height: 30px;
            width: 30px;
            border-radius:15px;
            float: left;
            margin: 10px;
            background-color: #ff5c4c;
             -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;
             -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
             box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
             text-align: center;
            }
            .xyzs-menu-item:hover{
             -moz-box-shadow:1px 1px 15px rgb(35,35,35);
             -webkit-box-shadow:1px 1px 15px rgb(35,35,35);
             box-shadow:1px 1px 15px rgb(35,35,35);
            }
            .xyzs-menu-item .fa-item{
                font-size: 20px;
                margin: auto 0;
                width: 30px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                color: #fff;
            }
            .xyzs-menu-item .fa-item:hover{

            }
            /*===== win =====*/
            .xyzs-win{
                width: 500px;
                margin: 0 auto;
                position: relative;
                outline: 0;
                top: 100px;
                pointer-events:auto;
            }
            .xyzs-modal-content{
                border-radius: 5px;
                background-clip: padding-box;
                background-color: #fff;
                -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;
                -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
                box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
                pointer-events:auto;
                border: solid 1px #ff5c4c;
            }
            .xyzs-modal-close{
                z-index: 1;
                position: absolute;
                right: 12px;
                top: 8px;
                overflow: hidden;
                cursor: pointer;
            }
            .xyzs-icon-ios-close{
                font-size: 25px;
                color: #999;
            }
            .xyzs-modal-header{
                border-bottom: 1px solid #e8eaec;
                padding: 10px 16px;
                text-align: left;
                font-size: 15px;
                font-weight: bold;
                font-family: cursive;
            }
            .xyzs-modal-body{
                padding: 16px;
                font-size: 12px;
            }

            .xyzs-enterprise-list{
                width: 100%;
                height: 300px;
                overflow-y: auto;
                overflow-x: hidden;
            }
            .xyzs-enterprise-item{
                /*height: 20px;*/
                line-height: 20px;
                margin: 5px;
                font-size: 12px;
                padding: 5px 12px;
                border: solid 1px #dedede;
            }
            .xyzs-enterprise-item-ico{
                color: #ff5c4c;
                float: right;
                font-size: 18px;
            }

            .xyzs-scrollbar::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
              background-color: #F5F5F5;
              border-radius:5px
            }

            .xyzs-scrollbar::-webkit-scrollbar {
              width: 10px;
              background-color: #F5F5F5;
            }

            .xyzs-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgba(255,92,76,0.7);
              border-radius:5px
            }
            .xyzs-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #ff5c4c;
            }
            /*=== 功能 ===*/
            .xyzs-del-div{
                color: #ff5c4c;
                font-size: 20px;
                cursor: pointer;
            }
            .xyzs-del-ico{
            
                color: #ff5c4c!important;
            }
        </style>`
    );


    let isMobile = false, mousedownPosition = {x: 0, y: 0}, toolPosition = {x: 0, y: 0};

    let toolRegion = $('<div class="xyzs-tool-region"></div>').mousedown(function () {
        //鼠标按下
        // isMobile = true;
        toolRegion.css('pointer-events', 'auto');

    }).mouseup(function () {
        //鼠标松开
        isMobile = false;
        toolRegion.css('pointer-events', 'none');
    }).mousemove(function (e) {
        //鼠标移动
        if (isMobile) {

            var mouseX = e.originalEvent.x || e.originalEvent.layerX || 0;
            var mouseY = e.originalEvent.y || e.originalEvent.layerY || 0;

            var Y = tool.position().top;
            var X = tool.position().left;
            var winH = $(window).height();
            var winW = $(window).width();
            toolPosition.x = X;
            toolPosition.y = Y;

            let left = X + mouseX - mousedownPosition.x;
            let bottom = winH - toolSize - Y - mouseY + mousedownPosition.y;
            tool.css({
                "left": (left < 0 ? 0 : ((left + toolSize) > winW) ? (winW - toolSize) : left) + "px",
                "bottom": (bottom < 0 ? 0 : ((bottom + toolSize) > winH) ? (winH - toolSize) : bottom) + "px"
            });
            if (positionLeft === ((winW / 2) < (X + toolSize / 2))) {
                menu.css({
                    "width": (menuItems.length * 50 + 20) + "px",
                    "left": ((winW / 2) < (X + toolSize / 2) ? (-1 * (menuItems.length * 50 + 20)) : 50) + "px"
                });
                menuItems.reverse();
                createMenu();
                positionLeft = !positionLeft;
            }
            mousedownPosition.x = mouseX;
            mousedownPosition.y = mouseY;
        }
    }).css('pointer-events', 'none');

    let tool = $(`
        <div class='xyzs-tool'>
        <div style="position: absolute;text-align: center;width: 50px;top: 10px;color: #fff;">
        <i class="fa fa-wrench fa-tool" title="工具箱"></i>
        </div>
        </div>`
    ).mouseleave(function () {
        //鼠标移出
        menu.hide(70);
    }).mouseenter(function () {
        //鼠标移入
        menu.show(70);
    }).mousedown(function (e) {
        //鼠标按下
        isMobile = true;
        isExpand = true;
        toolRegion.css('pointer-events', 'auto');
        mousedownPosition.x = e.originalEvent.x || e.originalEvent.layerX || 0;
        mousedownPosition.y = e.originalEvent.y || e.originalEvent.layerY || 0;
    }).mousemove(function () {
        //鼠标移动
        isExpand = false;
    }).click(function () {
        //鼠标点击
        if (isExpand) {
            menu.toggle();
        }
    }).css({"left": "10px", "bottom": "10px"});


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
                    div.append($(`<div class="xyzs-enterprise-item">` + item + `</div>`)
                        .append($(`<i class="fa fa-times xyzs-enterprise-item-ico" title="删除" item-name="` + item + `"></i>`)
                            .click(function () {
                                dleDlacklistName($(this).attr('item-name'));
                                $(this).closest('.xyzs-enterprise-item').remove();
                            })
                        )
                    )
                });
                showWin("黑名单管理", div);
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


    var menu = $(`
    <div id='xyzs-menu' class='menu'>
    </div>
    `).css({"width": (menuItems.length * 50 + 20) + "px"});

    var createMenu = function () {
        menu.empty();
        for (let i = 0; i < menuItems.length; i++) {
            menu.append($('<div class="xyzs-menu-item"><i class="fa ' + menuItems[i].ico + ' fa-item " title="' + menuItems[i].title + '"></i></div>').click(
                function () {
                    menuItems[i].callback();
                }
            ));
        }
    };

    createMenu();
    tool.append(menu);
    toolRegion.append(tool);
    body.append(toolRegion);

    //========== 窗口 ==========
    let win = $(`
        <div class="xyzs-win">
            <div class="xyzs-modal-content">
                <div class="xyzs-modal-close">
                    <i title="关闭" class="fa fa-remove xyzs-icon-ios-close"></i>
                </div>
                <div class="xyzs-modal-header">
                    <div class="xyzs-modal-header-inner">标题</div>
                </div>
                <div class="xyzs-modal-body">
                    内容
                </div>
            </div>
        </div>
    `).hide();
    win.find('.xyzs-modal-close').click(function () {
        win.hide();
        toolRegion.css({"background-color": ""});
    });

    function showWin(t, div) {
        toolRegion.css({'pointer-events': 'auto', "background-color": "rgba(55,55,55,.6)"});
        win.show(500);
        win.find(".xyzs-modal-header-inner").text(t);
        win.find('.xyzs-modal-body').empty().append(div);
    }

    toolRegion.append(win);

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
            DleButtonStyle: 'margin: 0 10px;display: contents;',
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
            DleButtonStyle: 'margin: 0 10px;display: inline-table;',
            HtmlToList: () => $('.company-text h3 a[ka]').closest('li'),
            ItemToNameJq: (item) => $(item).find('.company-text h3 a[ka]'),
            NameJqToNameText: (item) => $(item).text(),
            DleButtonToItem: (item) => $(item).closest('li')
        },
        {
            WebUrl: "www.lagou.com",
            IsRefresh: false,
            DleButtonStyle: 'margin: 0 10px;display: inline-table;',
            HtmlToList: () => $('li .company_name a[data-lg-tj-cid]').closest('li'),
            ItemToNameJq: (item) => $(item).find('.company_name a[data-lg-tj-cid]'),
            NameJqToNameText: (item) => $(item).text(),
            DleButtonToItem: (item) => $(item).closest('li')
        },
        {
            WebUrl: "www.liepin.com",
            IsRefresh: false,
            DleButtonStyle: 'margin: 0 10px;display: inline-flex;position: absolute;right: 12px;',
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
                blacklistFunction.ItemToNameJq(element).after(
                    $('<div title="加入黑名单" style="' + blacklistFunction.DleButtonStyle + '" class="xyzs-del-div"><i class="fa fa-trash xyzs-del-ico"></i></div>')
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
                )
            }
        });
    }

    // GM_setValue(blacklistKey, JSON.stringify([]));
    blacklistInit();
})();
