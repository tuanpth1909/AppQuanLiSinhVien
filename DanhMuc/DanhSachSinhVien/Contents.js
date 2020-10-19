$(document).ready(function () {
    dataStudents = [];

    views();

    searches();

});

var dataStudents;

function getStudent() {

    let name = $('#txtName').val();
    let dob = $('#txtDate').val();
    let sex = $('input[name=rdoSex]:checked').val();
    let add = $('#txtAddress').val();
    let tel = $('#txtTel').val();
    let email = $('#txtEmail').val();
    let classes = $("#ddlClasses option:selected").val();

    student = {
        name: name,
        dob: dob,
        sex: sex,
        add: add,
        tel: tel,
        email: email,
        classes: classes
    }
    return student;
}

function setStudent() {
    $(".item").remove();
    $.each(dataStudents, function (key, item) {
        $('tbody').append("<tr class=\"item\">" +
            "<td>" + item.name + "</td>" +
            "<td class='text-center'>" + item.dob + "</td>" +
            "<td>" + item.sex + "</td>" +
            "<td>" + item.add + "</td>" +
            "<td>" + item.tel + "</td>" +
            "<td>" + item.email + "</td>" +
            "<td>" + item.classes + "</td>" +
            "<td class='text-center'><a href='#' name='edit' title='Sửa thông tin sinh viên' style='color: #ffd800' onclick=edits(" + key + ")><i class='fas fa-edit'></i></a></td>" +
            "<td class='text-center'><a href='#' name='delete' title='Xóa thông tin sinh viên'style='color: #ff0000' onclick=deletes(dataStudents," + key + ")><i class='fas fa-times'></i></a></td>" +
            "<td class='text-center'><a href='#' name='view' title='Hiển thị chi tiết thông tin sinh viên' onclick=display(" + key + ")><i class='fas fa-info-circle'></i></a></td>" +
            "</tr>");
    })
}

function adds() {
    if ($('#validForm').valid()) {
        let validateField = compareStudents();
        if (validateField) {
            let dataStudent = getStudent();
            dataStudents.push(dataStudent);
            setStudent();
            document.getElementById('validForm').reset();
        } else {
            alert("Dữ liệu nhập bị trùng vui lòng nhập lại!");
        }
    } else {
        return false;
    }
}

function views() {
    $("#btnAdd").click(function () {
        //blur();
        document.getElementById('home').classList.toggle('active');
        $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
            $("#jdialog").html(data);
            $('#jdialog').dialog({
                autoOpen: false,
                height: "auto",
                width: 900,
                modal: true,
                closeText: "✖",
                title: "THÊM THÔNG TIN SINH VIÊN",
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
                            icon: "fas fa-minus",
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
                            icon: "fas fa-expand-arrows-alt",
                            showLabel: false
                        })
                    //#endregion

                    //

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

                    let oSize = {
                        width: that.dialog('option', 'width'),
                        height: that.dialog('option', 'height'),
                        position: {
                            my: 'center',
                            at: 'center',
                            of: window
                        }
                    };
                    //#endregion

                    let mSize = {
                        width: $(window).width(),
                        height: $(window).height(),
                        position: {
                            my: 'left top',
                            at: 'left top',
                            of: window
                        }
                    };

                    min.click(function (e) {
                        that.dialog('option', oSize);
                    });

                    max.click(function (e) {
                        that.dialog('option', mSize);
                    });

                    eyes.hover(function (e) {
                        that.hide();
                    }, function (e) {
                        that.show();
                    });

                    $('.ui-dialog-titlebar .ui-dialog-title', dlg).after(min, max, eyes);
                }
            });
            $('#jdialog').dialog('open');
        });
    }
    );
}

function display(index) {
    document.getElementById('home').classList.toggle('active');
    $.post("/DanhMuc/DanhSachSinhVien/ViewDetail.aspx", {}, function (data) {
        $("#jdialog").html(data);
        $('#jdialog').dialog({
            autoOpen: false,
            height: "auto",
            width: 900,
            modal: true,
            title: "THÊM THÔNG TIN SINH VIÊN",

        });

        let student = dataStudents[index];

        $('#txtHovaTen').text(student.name);
        $('#txtNgaySinh').text(student.dob);
        $('#txtGioiTinh').text(student.sex);
        $('#txtDiaChi').text(student.add);
        $('#txtDienThoai').text(student.tel);
        $('#txtEmail').text(student.email);
        $("#txtLop").text(student.classes);

        $('#jdialog').dialog('open');
    });
}

function deletes(item, key) {
    if (confirm("Bạn có chắc là muốn xóa không?") == true) {
        item.splice(key, 1);
        setStudent(item);
    } else {
        return false;
    }

}

function searches() {
    $('#search').on('search', function () {
        let keyword = $(this).val().toLowerCase();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
        });
    });

    $('#ddlFindClass').change('click', function () {
        let classes = $(this).val();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().indexOf(classes) > -1);
        });
    });
}

function compareStudents() {
    let objItem = getStudent();
    for (item in dataStudents) {
        if (dataStudents[item].name == objItem.name && dataStudents[item].dob == objItem.dob) {
            return false;
        }
    }
    return true;
}




