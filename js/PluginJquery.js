(function ($) {
    //Cấu hình Plugin tự định nghĩa thông qua các thông số của Framework
    $.fn.smDialog = function (settings) {
        //Cài đặt các giá trị mặc định, các biến cần thêm trong plugin, nó sẽ được khai báo dưới dạng object
        var config = {
            autoOpen: false,
            height: "auto",
            width: 650,
            modal: true,
            title: "",
            closeText: "✖"
        };

        //Gán các tham số truyền vào nếu người dùng thay đổi
        if (settings) { $.extend(config, settings); }

        //Xử lý các điều kiện và duyệt qua từng phần tử
        return this.each(function () {

            $(this).dialog({
                autoOpen: config.autoOpen,
                height: config.height,
                width: config.width,
                modal: config.modal,
                title: config.title,
                closeText: config.closeText,
                create: function (e, ui) {
                    //khởi tạo biến lấy this
                    let that = $(this);

                    //Khởi tạo biến lấy dialog
                    let dlg = $(this).dialog('widget');

                    //#region Tạo btn thu nhỏ dialog
                    //Khởi tạo các thuộc tính và button cần custom
                    let min = $('<button>', {
                        //Khai báo kiểu JSON
                        class: "ui-dialog-titlebar-min",
                        type: "button",
                        title: "Minimize"
                    })

                        //Khởi tạo nút btn
                        .button({
                            icon: "fas fa-compress-alt",
                            showLabel: false
                        })
                    //#endregion

                    //#region Tạo btn phóng to dialog
                    let max = $('<button>', {
                        class: "ui-dialog-titlebar-max",
                        type: "button",
                        title: "Maximize"
                    })

                        //Khởi tạo nút btn phóng to
                        .button({
                            icon: "fas fa-compress",
                            showLabel: false
                        })
                    //#endregion

                    //#region Tạo btn ẩn dialog
                    let eyes = $('<button>', {
                        class: "ui-dialog-titlebar-hide",
                        type: "button",
                        title: "Hide Dialog"
                    })

                        .button({
                            icon: "fas fa-eye-slash",
                            showLabel: false
                        })
                    //#endregion

                    let oSize = {
                        width: that.dialog('option', 'width'),
                        height: that.dialog('option', 'height'),
                        position: {
                            my: 'center',
                            at: 'center',
                            of: window
                        }
                    };
                    
                    let mSize = {
                        width: $(window).width(),
                        height: $(window).height(),
                        position: {
                            my: 'left top',
                            at: 'left top',
                            of: window
                        }
                    };

                    var minimine = min.click(function (e) {
                        that.dialog('option', oSize);
                    });

                    var maximine = max.click(function (e) {
                        that.dialog('option', mSize);
                    });

                    eyes.hover(function (e) {
                        that.hide();
                    }, function (e) {
                        that.show();
                    });

                    if (!minimine) {
                        maximine
                    } else {
                        minimine
                    }

                    $('.ui-dialog-titlebar .ui-dialog-title', dlg).after(eyes, maximine);
                }
            });
            $('#jdialog').dialog('open');
        });
    }
})(jQuery);

// Configure Dialog
(function ($) {
    $.fn.ctDialog = function (settings) {
        var config = {
            autoOpen: false,
            height: "auto",
            width: "auto",
            modal: true,
            title: "",

        };

        if (settings) { $.extend(config, settings) }

        return this.each(function () {
            $(this).dialog({
                autoOpen: config.autoOpen,
                height: config.height,
                width: config.width,
                modal: config.modal,
                title: config.title
            });
        });
    }
}(jQuery))