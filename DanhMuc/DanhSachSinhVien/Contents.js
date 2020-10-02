$(document).ready(function () {

    //Mở Dialog
    openDialog();

    //Xóa thông tin sinh viên
    deleteStudents();

    //Tìm kiếm thông tin sinh viên
    searchStudents();

    //Chỉnh sửa thông tin sinh viên
    editStudents()

    //Tìm kiếm danh sách trường đại học
    searchDSDaiHoc();

    //Sắp xếp tên danh sách các trường ĐH
    sortDSDaiHoc()
});

//Hàm mở dialog thêm sinh viên
function openDialog() {
    $("#btnAdd").click(function () {
        $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
            $("#jdialog").html(data);
            $('#jdialog').dialog({
                autoOpen: false,
                height: 900,
                width: 850,
                modal: true,
                closeText: "x",
                title: "THÊM THÔNG TIN SINH VIÊN",
            });
            //$('#jdialog').css({
            //    top: ((window.innerHeight / 2) - ($('#jdialog').height() / 2)) + 'px',
            //    left: ((window.innerWidth / 2) - ($('#jdialog').width() / 2)) + 'px'
            //});
            $('#jdialog').dialog('open');
        });
    }
    );
}

//Hàm xóa hồ sơ sinh viên
function deleteStudents() {
    $('a[name=delete]').click(function () {
        if (confirm("Bạn có muốn xóa sinh viên hay không?") == true) {
            $(this).closest('tr').remove();
        } else {
            return false;
        }
    });
}

//Hàm tìm kiếm danh sách các trường đại học
function searchDSDaiHoc() {
    $('#searchCategory').on('keyup', function () {
        let keyword = $(this).val().toLowerCase();
        $('div #dsDaiHoc ul li').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
        });
    });
}

//Hàm tìm kiếm hồ sơ 
function searchStudents() {

    $('#search').on('keyup', function () {
        let keyword = $(this).val().toLowerCase();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(keyword) > -1);
        });
    });

    $('#slClasses').on('click', function () {
        let value = $(this).val();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().indexOf(value) > -1);
        });
    });

    $('#slGioiTinh').on('click', function () {
        let value = $(this).val();
        $('tbody tr').filter(function () {
            $(this).toggle($(this).text().indexOf(value) > -1);
        });
    });



}

//Hàm chỉnh sửa hồ sơ
function editStudents() {

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
            $('#datBirthDay').val(dob);
            $('input[name=sex][value=' + sex + ']').prop("checked", true);
            $('#txtAddress').val(add);
            $('#numTel').val(tel);
            $('#emlEmail').val(email);
            $("#classes").val(classes);

            $('#btnSave').hide();
            $('#btnUpdate').show();

            $('#jdialog').dialog('open');
        });
    });

    //bat su kiem khi nhap chuot vao update
    $('#btnUpdate').click(function () {
        debugger;
        if ($('#validForm').valid()) {
            if (trEdit) {

                $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
                    $("#jdialog").html(data);

                    let name = $('#txtName').val();
                    let dob = $('#datBirthDay').val();
                    let sex = $('input[name=sex]:checked').val();
                    let add = $('#txtAddress').val();
                    let tel = $('#numTel').val();
                    let email = $('#emlEmail').val();
                    let classes = $("#classes option:selected").val();
                });

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
                

            }
        } else {
            return false;
        }
        $('#jdialog').dialog('close');
    });

}

//Sắp xếp danh sách các trường đại học từ a-z
function sortDSDaiHoc() {

    $(".list-group li").sort(asc_sort).appendTo('.list-group');
    // Sắp xếp theo thứ tự tăng dần
    function asc_sort(a, b) {
        return ($(a).text()) > ($(b).text()) ? 1 : -1;
    }
}
