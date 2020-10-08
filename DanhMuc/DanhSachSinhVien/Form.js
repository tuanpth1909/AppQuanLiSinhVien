$(document).ready(function () {
    dataStudents = [];

    views();

    University();

    searches();
});
var dataStudents;

//Lấy dữ liệu mà người dùng nhập 
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

//Đẩy dữ liệu được thêm mới vào bảng
function push(item) {
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
            "<td class='text-center'><a href='#' name='delete' title='Xóa thông tin sinh viên'style='color: #ff0000'  onclick=deletes(dataStudents," + key + ")><i class='fas fa-times'></i></a></td>" +
            "<td class='text-center'><a href='#' name='view' title='Hiển thị chi tiết thông tin sinh viên' onclick=display(" + key + ")><i class='fas fa-info-circle'></i></a></td>" +
            "</tr>");
    })
}

//Thêm dữ liệu vào bảng sau khi được validate
function adds() {
    if ($('#validForm').valid()) {
        dataStudents.push(getStudent());
        push(getStudent);
        document.getElementById('validForm').reset();
    } else {
        return false;
    }
}

//Hiển thị Dialog
function views() {
    $("#btnAdd").click(function () {
        $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
            $("#jdialog").html(data);
            $('#jdialog').dialog({
                autoOpen: false,
                width: 900,
                modal: true,
                closeText: "x",
                title: "THÊM THÔNG TIN SINH VIÊN",
            });
            $('#jdialog').dialog('open');
        });
    }
    );
}

//Hiện thị thông tin chi tiết của sinh viên
function display(index) {
    $.post("/DanhMuc/DanhSachSinhVien/ChiTiet.aspx", {}, function (data) {
        $("#jdialog").html(data);
        $('#jdialog').dialog({
            autoOpen: false,
            width: 900,
            modal: true,
            closeText: "x",
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

//Xóa thông tin sinh viên
function deletes(item, key) {
    if (confirm("Bạn có chắc là muốn xóa không?") == true) {
        item.splice(key, 1);
        push(item);
    } else {
        return false;
    }

}

//Hàm về danh sách các trường đại học
function University() {
    //Sắp xếp tên các trường đại học theo thứ tự từ a-z
    $(".list-group li").sort(asc_sort).appendTo('.list-group');
    function asc_sort(a, b) {
        return ($(a).text()) > ($(b).text()) ? 1 : -1;
    }

    //Tìm kiếm trường đại học
    $('#searchCategory').on('search', function () {
        let keyword = $(this).val().toLowerCase();
        $('div #dsDaiHoc ul li').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
        });
    });
}

//Hàm tìm kiếm thông tin sinh viên
function searches() {
    $('#search').on('search', function () {
        let keyword = $(this).val().toLowerCase();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
        });
    });

    $('#ddlClass').change('click', function () {
        let classes = $(this).val();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().indexOf(classes) > -1);
        });
    });
}








