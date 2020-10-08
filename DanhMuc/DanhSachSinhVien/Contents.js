//Vị trí update sau khi được sửa
function editItem(item, key, obj) {
    item.splice(key, 1);
    item.splice(key, 0, obj);
}

//Sửa thông tin sinh viên
function edits(index) {
    //Lấy chỉ số của đối tượng cần edit trong mảng
    let student = dataStudents[index];
    $.post("/DanhMuc/DanhSachSinhVien/FormDetail.aspx", {}, function (data) {
        $("#jdialog").html(data);
        $('#jdialog').dialog({
            autoOpen: false,
            width: 900,
            modal: true,
            closeText: "x",
            title: "THÊM THÔNG TIN SINH VIÊN",
        });

        $('#txtName').val(student.name);
        $('#txtDate').val(student.dob);
        $('input[name=rdoSex][value=' + student.sex + ']').prop("checked", true);
        $('#txtAddress').val(student.add);
        $('#txtTel').val(student.tel);
        $('#txtEmail').val(student.email);
        $("#ddlClasses").val(student.classes);

        $('#btnSave').hide();
        $('#btnUpdate').show();

        $('#jdialog').dialog('open');

        //Lấy dữ liệu được sửa update vào bảng
        $('#btnUpdate').click(function () {
            let obj = getStudent();
            editItem(dataStudents, index, obj);
            push(dataStudents);

            $('#btnUpdate').hide();
            $('#btnSave').show();

            $('#jdialog').dialog('close');
        });
    });

    
}



