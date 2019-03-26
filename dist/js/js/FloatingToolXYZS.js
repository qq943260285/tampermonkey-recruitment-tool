"use strict";

(function($) {
    $.extend({
        FloatingToolXYZS: function(menuItems) {
            if (!Array.isArray(menuItems)) return;
            var positionLeft = !0, isExpand = !0, body = $("body");
            body.before("<style>\n            .xyzs-tool-region{\n                position: fixed;\n                z-index: 20480;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n            }\n            .xyzs-tool{\n                background-color: #ff5c4c;\n                width: 50px;\n                height: 50px;\n                border-radius:25px;\n                -moz-border-radius:25px; \n                position: absolute;\n                left: 10px;\n                bottom: 10px;\n                cursor: move;\n                pointer-events:auto;\n                -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;\n                -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                -webkit-touch-callout: none; \n                -webkit-user-select: none;\n                -khtml-user-select: none;\n                -moz-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n            }\n            .xyzs-tool .menu{\n                width: 200px;\n                height: 50px;\n                position: absolute;\n                left: 50px;\n                display: none;\n                transition: display 3s;\n                padding: 0 10px;\n                -webkit-animation-duration: 1s;\n                animation-duration: 1s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n                -webkit-animation-name: rubberBand;\n                animation-name: rubberBand;\n            }\n            .xyzs-tool .fa-tool{\n                font-size: 27px;\n                color: #FFF!important;\n            }\n            .xyzs-menu-item{\n                height: 30px;\n                width: 30px;\n                border-radius:15px;\n                float: left;\n                margin: 10px;\n                background-color: #ff5c4c;\n                -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;\n                -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n                text-align: center;\n            }\n            .xyzs-menu-item:hover{\n                -moz-box-shadow:1px 1px 15px rgb(35,35,35);\n                -webkit-box-shadow:1px 1px 15px rgb(35,35,35);\n                box-shadow:1px 1px 15px rgb(35,35,35);\n                -webkit-animation-duration: .8s;\n                animation-duration: .8s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n                -webkit-animation-name: rubberBand;\n                animation-name: rubberBand;\n            }\n            .xyzs-menu-item .fa-item{\n                font-size: 20px;\n                margin: auto 0;\n                width: 30px;\n                height: 30px;\n                line-height: 30px;\n                cursor: pointer;\n                color: #fff;\n            }\n            .xyzs-menu-item .fa-item:hover{\n\n            }\n            @-webkit-keyframes rubberBand {\n                from {\n                    -webkit-transform: scale3d(1, 1, 1);\n                    transform: scale3d(1, 1, 1);\n                }\n                30% {\n                    -webkit-transform: scale3d(1.25, 0.75, 1);\n                    transform: scale3d(1.25, 0.75, 1);\n                }\n                40% {\n                    -webkit-transform: scale3d(0.75, 1.25, 1);\n                    transform: scale3d(0.75, 1.25, 1);\n                }\n                50% {\n                    -webkit-transform: scale3d(1.15, 0.85, 1);\n                    transform: scale3d(1.15, 0.85, 1);\n                }\n                65% {\n                    -webkit-transform: scale3d(0.95, 1.05, 1);\n                    transform: scale3d(0.95, 1.05, 1);\n                }\n                75% {\n                    -webkit-transform: scale3d(1.05, 0.95, 1);\n                    transform: scale3d(1.05, 0.95, 1);\n                }\n                to {\n                    -webkit-transform: scale3d(1, 1, 1);\n                    transform: scale3d(1, 1, 1);\n                }\n            }\n            @keyframes rubberBand {\n                from {\n                    -webkit-transform: scale3d(1, 1, 1);\n                    transform: scale3d(1, 1, 1);\n                }\n                30% {\n                    -webkit-transform: scale3d(1.25, 0.75, 1);\n                    transform: scale3d(1.25, 0.75, 1);\n                }\n                40% {\n                    -webkit-transform: scale3d(0.75, 1.25, 1);\n                    transform: scale3d(0.75, 1.25, 1);\n                }\n                50% {\n                    -webkit-transform: scale3d(1.15, 0.85, 1);\n                    transform: scale3d(1.15, 0.85, 1);\n                }\n                65% {\n                    -webkit-transform: scale3d(0.95, 1.05, 1);\n                    transform: scale3d(0.95, 1.05, 1);\n                }\n                75% {\n                    -webkit-transform: scale3d(1.05, 0.95, 1);\n                    transform: scale3d(1.05, 0.95, 1);\n                }\n                to {\n                    -webkit-transform: scale3d(1, 1, 1);\n                    transform: scale3d(1, 1, 1);\n                }\n            }\n\n\n\n            \n        </style>");
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
})(jQuery);