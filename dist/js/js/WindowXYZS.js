"use strict";

(function($) {
    $.extend({
        WindowXYZS: function() {
            var body = $("body");
            body.before("<style>\n.xyzs-win-region{\n        position: fixed;\n        z-index: 20480;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n}\n/*===== win =====*/\n.xyzs-win{\n        width: 500px;\n        margin: 0 auto;\n        position: relative;\n        outline: 0;\n        top: 100px;\n        pointer-events:auto;\n    }\n.xyzs-modal-content{\n        border-radius: 5px;\n        background-clip: padding-box;\n        background-color: #fff;\n        -moz-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);;\n        -webkit-box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n        box-shadow:1px 1px 10px rgba(82, 82, 82, 0.74);\n        pointer-events:auto;\n        border: solid 1px #ff5c4c;\n    }\n.xyzs-modal-close{\n        z-index: 1;\n        position: absolute;\n        right: 12px;\n        top: 8px;\n        overflow: hidden;\n        cursor: pointer;\n        min-width: 25px;\n    }\n.xyzs-icon-ios-close{\n        font-size: 25px;\n        color: #999;\n    }\n.xyzs-modal-header{\n        border-bottom: 1px solid #e8eaec;\n        padding: 10px 16px;\n        text-align: left;\n        font-size: 15px;\n        font-weight: bold;\n        font-family: cursive;\n    }\n.xyzs-modal-body{\n        padding: 16px;\n        font-size: 12px;\n    }\n\n.xyzs-enterprise-list{\n        width: 100%;\n        height: 300px;\n        overflow-y: auto;\n        overflow-x: hidden;\n    }\n.xyzs-enterprise-item{\n        /*height: 20px;*/\n        line-height: 20px;\n        margin: 5px;\n        font-size: 12px;\n        padding: 5px 12px;\n        border: solid 1px #dedede;\n    }\n.xyzs-enterprise-item-ico{\n        color: #ff5c4c;\n        float: right;\n        font-size: 18px;\n        \n    }\n\n.xyzs-scrollbar::-webkit-scrollbar-track {\n        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n        background-color: #F5F5F5;\n        border-radius:5px\n    }\n\n.xyzs-scrollbar::-webkit-scrollbar {\n        width: 10px;\n        background-color: #F5F5F5;\n    }\n\n.xyzs-scrollbar::-webkit-scrollbar-thumb {\n        background-color: rgba(255,92,76,0.7);\n        border-radius:5px\n    }\n.xyzs-scrollbar::-webkit-scrollbar-thumb:hover {\n        background-color: #ff5c4c;\n    }\n    \n        </style>");
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
                    }), win.show(500), win.find(".xyzs-modal-header-inner").text(winTitle), win.find(".xyzs-modal-body").empty().append(winDiv);
                }
            };
        }
    });
})(jQuery);