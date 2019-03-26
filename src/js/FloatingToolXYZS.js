(function ($) {
    $.extend({
        FloatingToolXYZS: function (menuItems) {
            if (!Array.isArray(menuItems)) return;
            let toolSize = 50;
            let positionLeft = true;
            //控制展开
            let isExpand = true;
            let body = $('body');
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
                -webkit-touch-callout: none; 
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            .xyzs-tool .menu{
                width: 200px;
                height: 50px;
                position: absolute;
                left: ` + toolSize + `px;
                display: none;
                transition: display 3s;
                padding: 0 10px;
                -webkit-animation-duration: 1s;
                animation-duration: 1s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                -webkit-animation-name: rubberBand;
                animation-name: rubberBand;
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
                -webkit-animation-duration: .8s;
                animation-duration: .8s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                -webkit-animation-name: rubberBand;
                animation-name: rubberBand;
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
            @-webkit-keyframes rubberBand {
                from {
                    -webkit-transform: scale3d(1, 1, 1);
                    transform: scale3d(1, 1, 1);
                }
                30% {
                    -webkit-transform: scale3d(1.25, 0.75, 1);
                    transform: scale3d(1.25, 0.75, 1);
                }
                40% {
                    -webkit-transform: scale3d(0.75, 1.25, 1);
                    transform: scale3d(0.75, 1.25, 1);
                }
                50% {
                    -webkit-transform: scale3d(1.15, 0.85, 1);
                    transform: scale3d(1.15, 0.85, 1);
                }
                65% {
                    -webkit-transform: scale3d(0.95, 1.05, 1);
                    transform: scale3d(0.95, 1.05, 1);
                }
                75% {
                    -webkit-transform: scale3d(1.05, 0.95, 1);
                    transform: scale3d(1.05, 0.95, 1);
                }
                to {
                    -webkit-transform: scale3d(1, 1, 1);
                    transform: scale3d(1, 1, 1);
                }
            }
            @keyframes rubberBand {
                from {
                    -webkit-transform: scale3d(1, 1, 1);
                    transform: scale3d(1, 1, 1);
                }
                30% {
                    -webkit-transform: scale3d(1.25, 0.75, 1);
                    transform: scale3d(1.25, 0.75, 1);
                }
                40% {
                    -webkit-transform: scale3d(0.75, 1.25, 1);
                    transform: scale3d(0.75, 1.25, 1);
                }
                50% {
                    -webkit-transform: scale3d(1.15, 0.85, 1);
                    transform: scale3d(1.15, 0.85, 1);
                }
                65% {
                    -webkit-transform: scale3d(0.95, 1.05, 1);
                    transform: scale3d(0.95, 1.05, 1);
                }
                75% {
                    -webkit-transform: scale3d(1.05, 0.95, 1);
                    transform: scale3d(1.05, 0.95, 1);
                }
                to {
                    -webkit-transform: scale3d(1, 1, 1);
                    transform: scale3d(1, 1, 1);
                }
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
                // menu.addClass('zoomOutDown')
                menu.hide(70);

            }).mouseenter(function (e) {
                //鼠标移入
                // menu.removeClass('zoomOutDown')
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


            var menu = $(`
    <div id='xyzs-menu' class='menu animated rubberBand'>
    </div>
    `).css({"width": (menuItems.length * 50 + 20) + "px"});

            var createMenu = function () {
                menu.empty();
                for (let i = 0; i < menuItems.length; i++) {
                    menu.append($('<div class="xyzs-menu-item animated rubberBand"><i class="fa ' + menuItems[i].ico + ' fa-item " title="' + menuItems[i].title + '"></i></div>').click(
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
        }
    });
})(jQuery);
