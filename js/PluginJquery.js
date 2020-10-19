(function ($) {
    $.fn.fpmenu = function (param) {
        //xử lý tham số mặc định
        param = $.extend(
            {
                //các lớp của icon đóng - mở menu. Dùng font awesome 
                btnClasses: 'fa fa-list-ul',
                btnCloseClasses: 'fa fa-times',

                //hiệu ứng và thời gian thực hiện hiệu ứng
                animEffect: 'swing',
                animSpeed: 500
            }, param);

        //mặc định ẩn menu
        this.each(function (idx, el) {
            $(el).addClass('fpmenu fp-hide').height($(window).height());
        });

        //hiển thị nút đóng - mở menu
        $('<i class="fp-btn ' + param.btnClasses + '"></i>').appendTo('body');

        //thuộc tính cờ cho biết menu đang đóng hay mở
        Object.defineProperty(this, 'isOpen', { value: false, writable: true });

        //xử lý sự kiện người dùng nhấn đóng - mở menu
        var _self = this;
        $('i.fp-btn').click(function (e) {
            e.preventDefault();
            if (!$(_self).is(':animated')) {
                if (_self.isOpen) {
                    $(_self).animate({ opacity: 0 }, param.animSpeed, param.animEffect, function () {
                        $(this).addClass('fp-hide');
                        $('i.fp-btn').removeClass(param.btnCloseClasses).addClass(param.btnClasses);
                    });
                } else {
                    $(_self).removeClass('fp-hide')
                        .animate({ opacity: 1 }, param.animSpeed, param.animEffect, function () {
                            $('i.fp-btn').removeClass(param.btnClasses).addClass(param.btnCloseClasses);
                        });
                }
                _self.isOpen = !_self.isOpen;
            }
        });

        return this;
    }
})(jQuery);

(function ($) {
    $.fn.btnZoom = function (settings) {
        var config = {

        }
    }
});