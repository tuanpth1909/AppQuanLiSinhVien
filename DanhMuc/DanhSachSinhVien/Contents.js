﻿$(document).ready(function () {

    //Đăng ký sự kiên
    DangKySuKien();

});



function DangKySuKien() {

    //Hiển thị Dialog
    function views() {
        //Hiển thị Dialog thêm mới thông tin sinh viên

        $("#btnAdd").click(function () {
            $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
                $("#jdialog").html(data);
                $('#jdialog').dialog({
                    autoOpen: false,
                    width: 850,
                    modal: true,
                    closeText: "x",
                    title: "THÊM THÔNG TIN SINH VIÊN",
                });
                $('#jdialog').dialog('open');
            });
        }
        );

        //Hiển thị chi tiết thông tin sinh viên

        let trEdit;
        // bat su kien khi nhap chuot vao View
        $('a[name=view]').click(function () {
            trEdit = $(this).closest('tr');

            let name = $(trEdit).find('td:eq(0)').text();
            let dob = $(trEdit).find('td:eq(1)').text();
            let sex = $(trEdit).find('td:eq(2)').text();
            let add = $(trEdit).find('td:eq(3)').text();
            let tel = $(trEdit).find('td:eq(4)').text();
            let email = $(trEdit).find('td:eq(5)').text();
            let classes = $(trEdit).find('td:eq(6)').text();

            $.post("/DanhMuc/DanhSachSinhVien/ChiTiet.aspx", {}, function (data) {
                $("#jdialog").html(data);
                $('#jdialog').dialog({
                    autoOpen: false,
                    width: 850,
                    modal: true,
                    closeText: "x", 
                    title: "CHI TIẾT THÔNG TIN SINH VIÊN",
                });


                $('#txtHovaTen').text(name);
                $('#txtNgaySinh').text(dob);
                $('#txtGioiTinh').text(sex);
                $('#txtDiaChi').text(add);
                $('#txtDienThoai').text(tel);
                $('#txtEmail').text(email);
                $("#txtLop").text(classes);

                $('#jdialog').dialog('open');
            });
        });
    }

    //Hàm xóa hồ sơ sinh viên
    function deletes() {
        $('a[name=delete]').click(function () {
            if (confirm("Bạn có muốn xóa sinh viên hay không?") == true) {
                $(this).closest('tr').remove();
            } else {
                return false;
            }
        });
    }

    //Hàm tìm kiếm hồ sơ 
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

    //Hàm chỉnh sửa hồ sơ
    function edits() {

        let trEdit;

        // bat su kien khi nhap chuot vao Edit
        $('a[name=edit]').click(function () {
            trEdit = $(this).closest('tr');

            let name = $(trEdit).find('td:eq(0)').text();
            let dob = $(trEdit).find('td:eq(1)').text();
            let sex = $(trEdit).find('td:eq(2)').text();
            let add = $(trEdit).find('td:eq(3)').text();
            let tel = $(trEdit).find('td:eq(4)').text();
            let email = $(trEdit).find('td:eq(5)').text();
            let classes = $(trEdit).find('td:eq(6)').text();

            $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
                $("#jdialog").html(data);
                $('#jdialog').dialog({
                    autoOpen: false,
                    width: 850,
                    modal: true,
                    closeText: "x",
                    title: "CHỈNH SỬA THÔNG TIN SINH VIÊN",
                });


                $('#txtName').val(name);
                $('#txtDate').val(dob);
                $('input[name=rdoSex][value=' + sex + ']').prop("checked", true);
                $('#txtAddress').val(add);
                $('#txtTel').val(tel);
                $('#txtEmail').val(email);
                $("#ddlClasses").val(classes);

                $('#btnSave').hide();
                $('#btnUpdate').show();

                $('#jdialog').dialog('open');
            });
        });

        //bat su kiem khi nhap chuot vao update
        $('#btnUpdate').click(function () {
            debugger
            if ($('#validForm').valid()) {

                if (trEdit) {

                    let name = $('#txtName').val();
                    let dob = $('#datBirthDay').val();
                    let sex = $('input[name=sex]:checked').val();
                    let add = $('#txtAddress').val();
                    let tel = $('#numTel').val();
                    let email = $('#emlEmail').val();
                    let classes = $("#classes option:selected").val();


                    //thay the du lieu cu sau khi chinh sua
                    $(trEdit).find('td:eq(0)').text(name);
                    $(trEdit).find('td:eq(1)').text(dob);
                    $(trEdit).find('td:eq(2)').text(sex);
                    $(trEdit).find('td:eq(3)').text(add);
                    $(trEdit).find('td:eq(4)').text(tel);
                    $(trEdit).find('td:eq(5)').text(email);
                    $(trEdit).find('td:eq(6)').text(classes);

                    trEdit = null;

                    $('#txtName').val("");
                    $('#datBirthDay').val("");
                    $('#txtAddress').val("");
                    $('#numTel').val("");
                    $('#emlEmail').val("");
                    $('#classes').val($("#classes option:first").val());

                    alert("Cập nhật thông tin thành công!");
                }
            } else {
                return false;
            }
            $('#jdialog').dialog('close');
        });

    }

    //Danh sach Dai Hoc
    function DaiHoc() {
        //tìm kiếm danh sách các trường đại học
        $('#searchCategory').on('search', function () {
            let keyword = $(this).val().toLowerCase();
            $('div #dsDaiHoc ul li').filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
            });
        });

        //Sắp xếp danh sách các trường đại học từ a-z
        $(".list-group li").sort(asc_sort).appendTo('.list-group');
        // Sắp xếp theo thứ tự tăng dần
        function asc_sort(a, b) {
            return ($(a).text()) > ($(b).text()) ? 1 : -1;
        }
    }

    //Validate Form
    function validates() {

        $('#validForm').validate({
            rules: {
                txtName: "required",
                txtDate: "required",
                txtAddress: {
                    required: true,
                    minlength: 8,
                },
            },
            messages: {
                txtName: "Vui lòng nhập tên",
                txtDate: "Vui lòng chọn ngày sinh",
                txtAddress: {
                    required: "Vui lòng nhập địa chỉ",
                    minlength: "Số lượng kí tự phải lớp hơn 8 kí tự",
                },
            },
        });

    }


    views();

    deletes();

    edits();

    searches();

    DaiHoc();

}




