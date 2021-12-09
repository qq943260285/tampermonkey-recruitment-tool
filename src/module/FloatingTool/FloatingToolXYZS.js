(function ($) {
    $.extend({
        FloatingToolXYZS: function (menuItems) {
            if (!Array.isArray(menuItems)) return;
            let toolSize = 50;
            let positionLeft = true;
            //控制展开
            let isExpand = true;
            let body = $('body');
            body.before("<style><%= FloatingToolCss %></style>");


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
