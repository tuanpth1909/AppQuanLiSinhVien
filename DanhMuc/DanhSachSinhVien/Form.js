$(document).ready(function () {

    //Thêm mới sinh viên
    addStudents();

    //Thoát
    cancelStudents();

    //Cập nhật thông tin sau khi được chỉnh sửa
    Update();

    //Khai báo validate
    validateStudents();

});

//Hàm thêm mới hồ sơ sinh vien
function addStudents() {

    $('#btnSave').click(function () {
        if ($('#validForm').valid()) {

            let name = $('#txtName').val();
            let dob = $('#datBirthDay').val();
            let sex = $('input[name=sex]:checked').val();
            let add = $('#txtAddress').val();
            let tel = $('#numTel').val();
            let email = $('#emlEmail').val();
            let personal = $('#txtPersonal').val();
            let selectedSport = [];
            $('input[name=sport]:checked').each(function () {
                selectedSport.push(this.value);
            });
            let classes = $("#classes option:selected").val();

            //chen du lieu vao table
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
                "</tr>");

            //$(this).reset();
            $('#txtName').val("");
            $('#datBirthDay').val("");
            $('#txtAddress').val("");
            $('#numTel').val("");
            $('#emlEmail').val("");
            $('#txtPersonal').val("");
            $("input[name=sport]").prop("checked", false);
            $('#classes').val($("#classes option:first").val());
        } else {
            return false;
        }

        $('#jdialog').dialog('close');

        //xoa ban ghi
        deleteStudents();

        //tim kiem ban ghi
        searchStudents();

        //sua ban ghi
        editStudents();

        //thoat
        cancelStudents();

    });

}

////Hàm chỉnh sửa
function Update() {

    let trEdit;

    //bat su kiem khi nhap chuot vao update
    $('#btnUpdate').click(function () {

        $('a[name=edit]').focus(function () {

        });
     
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
function cancelStudents() {
    $('#btnCancel').click(function () {
        $('#jdialog').html("");
        $('#jdialog').dialog('destroy');
    });
}

//Validate Form
function validateStudents() {

    $('#validForm').validate({
        rules: {
            name: "required",
            date: "required",
            txtAddress: {
                required: true,
                minlength: 8,
            },
        },
        messages: {
            name: "Vui lòng nhập tên",
            date: "Vui lòng chọn ngày sinh",
            txtAddress: {
                required: "Vui lòng nhập địa chỉ",
                minlength: "Điền đi",
            },
        },
    });

}

