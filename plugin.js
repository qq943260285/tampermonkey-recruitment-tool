// ==UserScript==
// @name         小宇专属-测试
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  测试
// @author       小宇专属(943260285@qq.com)
// @match        https://codepen.io/midoghranek/pen/yFCtf
// @include *
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant           GM_getValue
// @grant           GM.getValue
// @grant           GM_setValue
// @grant           GM.setValue
// @grant			GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_getResourceText
// @grant           GM_registerMenuCommand
// ==/UserScript==
//http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css


// @require      https://cdn.bootcss.com/font-awesome/5.7.2/css/all.min.css
(function () {
    'use strict';
    var toolSize = 50;
    var positionLeft = true;
    //控制展开
    var isExpand = true;
    $('body').before(`<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />`)
    $('body').before(
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
             -moz-border-radius:` + toolSize / 2 + `px; /* Old Firefox */
             position: absolute;
             left: 10px;
             bottom: 10px;
             cursor: move;
             pointer-events:auto;
             -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;
             -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
             box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);
             /*animation:myfirst 5s;*/
             /*transition: left 3s linear ,bottom 1s;*/
            /*-moz-transition: left 3s linear,bottom 1s;	!* Firefox 4 *!*/
            /*-webkit-transition: left 1s linear,bottom 1s;	!* Safari 和 Chrome *!*/
            /*-o-transition: left 3s linear,bottom 1s;	!* Opera *!*/

            }


            .xyzs-tool .menu{
            width: 200px;
            height: 50px;
            /*background-color: #0ad3f8;*/
            position: absolute;
            left: ` + toolSize + `px;
            display: none;
            transition: display 3s;
            padding: 0 10px;
            /*cursor: default;*/
            }
            .xyzs-tool .fa-tool{
             font-size: 27px;
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

                /*color: #0ad3f8;*/
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
                /*line-height: 1;*/
            }
            .xyzs-modal-body{
                padding: 16px;
                font-size: 12px;
                /*line-height: 1.5;*/
            }
            
            .xyzs-enterprise-list{
                width: 100%;
                height: 300px;
                overflow-y: auto;
                overflow-x: hidden;
            }
            .xyzs-enterprise-item{
                height: 30px;
                /*width: 100%;*/
                margin: 5px;
                background-color: aqua;
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
        </style>`
    )


    var isMobile = false, mousedownPosition = {x: 0, y: 0}, toolPosition = {x: 0, y: 0};

    var toolRegion = $('<div class="xyzs-tool-region"></div>').mousedown(function (e) {
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

            var left = X + mouseX - mousedownPosition.x;
            var bottom = winH - toolSize - Y - mouseY + mousedownPosition.y;
            tool.css({
                "left": (left < 0 ? 0 : ((left + toolSize) > winW) ? (winW - toolSize) : left) + "px",
                "bottom": (bottom < 0 ? 0 : ((bottom + toolSize) > winH) ? (winH - toolSize) : bottom) + "px"
            });
            if (positionLeft == ((winW / 2) < (X + toolSize / 2))) {
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

    var tool = $(`
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


    var menuItems = [
        {
            ico: "fa-eye-slash",
            title: "黑名单",
            callback: function () {
                console.log("黑名单")
                var div = $(`
                <div class="xyzs-enterprise-list xyzs-scrollbar" >
                    <div class="xyzs-enterprise-item"></div>
                </div>
`);
                showWin("黑名单", div)
            }
        },
        {
            ico: "fa-cog",
            title: "设置",
            callback: function () {
                console.log("设置")
            }
        },
        {
            ico: "fa-podcast",
            title: "博客",
            callback: function () {
                console.log("博客")
            }
        },
        {
            ico: "fa-github",
            title: "github",
            callback: function () {
                console.log("github")
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
            menu.append($('<div class="xyzs-menu-item"><i class="fa ' + menuItems[i].ico + ' fa-item" title="' + menuItems[i].title + '"></i></div>').click(
                function () {
                    menuItems[i].callback();
                }
            ));
        }
    }


    createMenu();
    tool.append(menu);
    toolRegion.append(tool);
    $('body').append(toolRegion);
    // Your code here...


    //========== 窗口 ==========
    var win = $(`
        <div class="xyzs-win">
            <div class="xyzs-modal-content">
                <div class="xyzs-modal-close">
                    <i class="fa fa-remove xyzs-icon-ios-close"></i>
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
    var showWin = function (t, div) {
        toolRegion.css({'pointer-events': 'auto', "background-color": "rgba(55,55,55,.6)"});
        win.show(500);
        win.find(".xyzs-modal-header-inner").text(t);
        win.find('.xyzs-modal-body').empty().append(div);
    }
    toolRegion.append(win);

    //========== 功能相关 ==========

    //1.初始化
    //2.判断网站
    //3.定位列表
    //4.过滤列表
    //5.列表添加功能
    //6.隐藏列表项
    //7.

    var list = GM_getValue('blacklist') ? JSON.parse(GM_getValue('blacklist')) : [];
    //
    // function mapBlockZhaopin(){
    //     $('.commpaGM_setValue nyName a').each(function(i,item){
    //         $.each(list,function(j,company){
    //             if(company===$(item).attr('title')) {
    //                 $(item).closest('.listItemBox').hide();
    //             }
    //         });
    //     });
    // }
    //
    // function zhaopinBlockHandler(){
    //     $('.block').click(function(){
    //         var $this = $(this);
    //         var $company = $(this).parent().attr('title');
    //         list.push($company);
    //         GM_setValue("list", JSON.stringify(list));
    //         blockByName($company);
    //     });
    // }
    //
    // function jobBlockHandler(){
    //     $('.block').click(function(){
    //         var $company = $(this).siblings().attr('title');
    //         list.push($company);
    //         GM_setValue("list", JSON.stringify(list));
    //         blockByName($company);
    //     });
    // }
    //
    // function map2Block51job(){
    //     $('.t2 a').each(function(x,i){
    //         $.each(list,function(y,z){
    //             if($(i).attr('title') == z){
    //                 $(i).closest('.el').remove();
    //             }
    //         });
    //     });
    // }
    //
    // function blockByName(name){
    //     if(window.location.host=="search.51job.com"){
    //         $('.t2 a').each(function(x,i){
    //             if($(i).attr('title') === name){
    //                 $(i).closest('.el').hide(500);
    //                 return false;
    //             }
    //         });
    //     }
    //     if(window.location.host=="sou.zhaopin.com"){
    //         $('.commpanyName a').each(function(i,item){
    //             if($(item).attr('title')===name){
    //                 $(item).closest('.listItemBox').hide(500);
    //             }
    //         })
    //     }
    // };
    //
    //
    // (function() {
    //     'use strict';
    //     setTimeout(function(){
    //         var app= $('<div id="xyzs-blacklist" style="position: fixed;width: 10px;background-color: #ffffff;border-left: solid 1px #ff6e07;right: 0;top: 0;height: 100%;z-index: 2048;overflow-x: auto;"></div>').mouseover(
    //             function(){
    //                 $(this).width(280)
    //             }).mouseout(function(){
    //             $(this).width(10)
    //         })
    //         $('body').append(app)
    //         $.each(list,function(i,company){
    //             $('#xyzs-blacklist').append($('<div style="float: left;white-space:nowrap;width: 100%;margin: 5px;border: solid 1px;" v='+i+'>'+i+':'+company+'</div>').click(
    //                 function(){
    //                     var v=$(this).attr("v");
    //                     list.splice(v,1);
    //                     GM_setValue("list", JSON.stringify(list));
    //                     $(this).remove();
    //                 }
    //             ))
    //         });
    //     },3000)
    // })();
    //
    // /*block 51 jobs*/
    // (function() {
    //     'use strict';
    //     console.log("1")
    //     if(window.location.host=='search.51job.com')
    //     {
    //         console.log("12")
    //         map2Block51job();
    //         console.log("123")
    //         $('.t2 a').after('<a href="javascript:;" class="block" style="color: #fd5f60;position: absolute;padding: 0 10px;">X</a>');
    //         console.log("1234")
    //         jobBlockHandler();
    //     }
    // })();
    //
    // /*block zhaopin */
    // (function() {
    //     'use strict';
    //     if(window.location.host=='sou.zhaopin.com')
    //     {
    //         setTimeout(function(){
    //             mapBlockZhaopin();
    //             $('.commpanyName a').append('<a href="javascript:;" class="block" style="color: blueviolet;">&nbsp;&nbsp;X</a>');
    //             zhaopinBlockHandler();
    //         },3000)
    //     }
    // })();
    //
    // /*block www.zhipin.com */
    // (function() {
    //     'use strict';
    //     if(window.location.host=='www.zhipin.com')
    //     {
    //         setTimeout(function(){
    //
    //             /*             $('.company-text .name>a[ka]').each(function(i,item){
    //                 $.each(list,function(j,company){
    //                     if(company===$(item).text()) {
    //                         $(item).closest('li').hide();
    //                     }
    //                 });
    //             }); */
    //
    //
    //             $(".company-text .name>a[ka]").each((i,e)=>{
    //                 console.log(i)
    //                 $(e).after($('<a href="javascript:;" class="block" style="color: #fd5f60;position: absolute;padding: 0 10px;">X</a>').click(function(){
    //                     var $company = $(this).siblings('a[ka]').text();
    //                     console.log($company);
    //                     $(this).closest('li').hide(500);
    //                 }))
    //             })
    //         },3000)
    //     }
    // })();
})();
