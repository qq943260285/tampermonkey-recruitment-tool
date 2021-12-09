(function ($) {
    $.extend({
            WindowXYZS: function () {
                let body = $('body');
                body.before("<style><%= WindowCss %></style>");
                let winRegion = $('<div class="xyzs-win-region"></div>').click(function () {
                    win.hide();
                    winRegion.css({"background-color": "", 'pointer-events': 'none'});
                    return false;
                }).css('pointer-events', 'none');

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
    `).click(() => false).css('pointer-events', 'auto').hide();
                win.find('.xyzs-modal-close').click(function () {
                    win.hide();
                    winRegion.css({"background-color": "", 'pointer-events': 'none'});
                });


                winRegion.append(win);

                body.append(winRegion);
                return {
                    show: function (winTitle, winDiv) {
                        console.log("---" + winTitle)
                        winRegion.css({'pointer-events': 'auto', "background-color": "rgba(55,55,55,.6)"});
                        win.show(500);
                        win.find(".xyzs-modal-header-inner").html(winTitle);
                        win.find('.xyzs-modal-body').empty().append(winDiv);
                    }
                }
            }
        }
    );
})(jQuery);
