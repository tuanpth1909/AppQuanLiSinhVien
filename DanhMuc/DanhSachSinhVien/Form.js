$(document).ready(function () {

    //Đăng ký sự kiện cho các chức năng
    DangKySuKien();

});


function DangKySuKien() {
    //Hàm thêm mới hồ sơ sinh viên
    function adds() {

        $('#btnSave').click(function () {
            if ($('#validForm').valid()) {

                //Lấy giá trị từ các input
                let name = $('#txtName').val();
                let dob = $('#txtDate').val();
                let sex = $('input[name=rdoSex]:checked').val();
                let add = $('#txtAddress').val();
                let tel = $('#txtTel').val();
                let email = $('#txtEmail').val();
                let personal = $('#txtPersonal').val();
                let selectedSport = [];
                $('input[name=sport]:checked').each(function () {
                    selectedSport.push(this.value);
                });
                let classes = $("#ddlClasses option:selected").val();

                //Chèn dữ liệu mới vào trong bảng
                $('tbody').prepend("<tr>" +
                    "<td>" + name + "</td>" +
                    "<td class='text-center'>" + dob + "</td>" +
                    "<td>" + sex + "</td>" +
                    "<td>" + add + "</td>" +
                    "<td>" + tel + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>" + classes + "</td>" +
                    "<td><a href='#' name='edit' title='Sửa thông tin sinh viên'><i class='fas fa-edit'></i></a></td>" +
                    "<td><a href='#' name='delete' title='Xóa thông tin sinh viên'><i class='fas fa-times'></i></a></td>" +
                    "<td><a href='#' name='view' title='Hiển thị chi tiết thông tin sinh viên'><i class='fas fa-info-circle'></i></a></td>" +
                    "</tr>");

                //Trả về giá trị rỗng cho các input
                $('#txtName').val("");
                $('#txtDate').val("");
                $('#txtAddress').val("");
                $('#txtTel').val("");
                $('#txtEmail').val("");
                $('#txtPersonal').val("");
                $("input[name=chkSport]").prop("checked", false);
                $('#ddlClasses').val($("#ddlClasses option:first").val());
            } else {
                return false;
            }

            $('#jdialog').dialog('close');

            edits();

            deletes();

            searches();

            views();

        });

    }

    ////Hàm chỉnh sửa
    function update() {

        let trEdit;

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

    //Hàm thoát
    function cancels() {
        $('button[name=btnDong]').click(function () {
            $('#jdialog').html("");
            $('#jdialog').dialog('destroy');
        });
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
                    minlength: "Điền đi",
                },
            },
        });

    }


    adds();

    update();

    cancels();

    validates();

}


