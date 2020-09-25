$(document).ready(function () {

    //$('#AddDialog').dialog({
    //    autoOpen: false,
    //    height: 400,
    //    width: 550,
    //    modal: true,
    //    show: {
    //        effect: 'drop',
    //        duration: 200,
    //    },
    //    hide: {
    //        effect: 'drop',
    //        duration: 200,
    //    },

    //});
    //$('#btnAdd').click(function () {
    //    $('#AddDialog').dialog('open');
    //});

    //$("#btnAdd").click(function () {
    //    //debugger
    //    $.post("/Dialog/AppSinhVienDialog.aspx", function (data) {
    //        //debugger;
    //        $("#Dialog").html(data);
    //        $('#Dialog').dialog({
    //            autoOpen: false,
    //            height: 900,
    //            width: 700,
    //            modal: true,
    //            show: {
    //                effect: 'scale',
    //                duration: 250,
    //            },
    //            hide: {
    //                effect: 'drop',
    //                duration: 200,
    //            }
    //        });
    //        $('#Dialog').dialog('open');
    //    });
    //});

    //Thêm mới
    addStudents();

    //Xóa
    deleteStudents();

    //Tìm kiếm
    searchStudents();

    //Hủy
    cancelStudents();

    //Chỉnh sửa
    editStudents();

    
});

//Hàm xóa hồ sơ sinh viên
function deleteStudents() {
    $('a[name=delete]').click(function () {
        $(this).closest('tr').remove();
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
}

//Hàm thêm mới hồ sơ sinh vien
function addStudents() {

    $('#btnSave').click(function () {
        debugger;
        //validateStudents();
        //lay gia tri tu cac input
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
            "<td>" + dob + "</td>" +
            "<td>" + sex + "</td>" +
            "<td>" + add + "</td>" +
            "<td>" + tel + "</td>" +
            "<td>" + email + "</td>" +
            "<td>" + classes + "</td>" +
            "<td><a href='#' name='edit'><i class='fas fa-edit'></i></a></td>" +
            "<td><a href='#' name='delete'><i class='fas fa-times'></i></a></td>" +
            "</tr>");
        
        $('#txtName').val("");
        $('#datBirthDay').val("");
        $('#txtAddress').val("");
        $('#numTel').val("");
        $('#emlEmail').val("");
        $('#txtPersonal').val("");
        $("input[name=sport]").prop("checked", false);
        $('#classes').val($("#classes option:first").val());

        alert("Added successfully!");

        //xoa ban ghi
        deleteStudents();

        //tim kiem ban ghi
        searchStudents();

        //sua ban ghi
        editStudents();

        //thoat
        cancelStudents();

        //Validate input
        validateStudents();

    });

}

//Hàm thoát
function cancelStudents() {
    $('#btnCancel').click(function () {
        $('#txtName').val("");
        $('#datBirthDay').val("");
        $('#txtAddress').val("");
        $('#numTel').val("");
        $('#emlEmail').val("");
        $('#txtPersonal').val("");
        $("input[name=sport]").prop("checked", false);
        $('#classes').val($("#classes option:first").val());

        $('#btnSave').show();
        $('#btnUpdate').hide();
    });
}

//Hàm chỉnh sửa
function editStudents() {

    let trEdit;

    //bat su kien khi nhap chuot vao Edit
    $('a[name=edit]').click(function () {

        //$('#form-dialog').dialog('open');

        trEdit = $(this).closest('tr');
        $('#btnSave').hide();
        $('#btnUpdate').show();

        let name = $(trEdit).find('td:eq(0)').text();
        let dob = $(trEdit).find('td:eq(1)').text();
        let sex = $(trEdit).find('td:eq(2)').text();
        let add = $(trEdit).find('td:eq(3)').text();
        let tel = $(trEdit).find('td:eq(4)').text();
        let email = $(trEdit).find('td:eq(5)').text();
        //let personal = $(trEdit).find('td:eq(6)').text();
        //let selectedSport = $(trEdit).find('td:eq(7)').text();
        let classes = $(trEdit).find('td:eq(6)').text();

        //alert(selectedSport);
        //alert(classes);
        //var lstSelectedSport = selectedSport.split(",");

        $('#txtName').val(name);
        $('#datBirthDay').val(dob);
        $('input[name=sex][value=' + sex + ']').prop("checked", true);
        $('#txtAddress').val(add);
        $('#numTel').val(tel);
        $('#emlEmail').val(email);
        //$('#txtPersonal').val(personal);
        //for (var item in lstSelectedSport) {
        //    $('input[   name=sport][value=' + lstSelectedSport[item] + ']').prop("checked", true);
        //}

        $("#classes").val(classes);


    });

    //bat su kiem khi nhap chuot vao update
    $('#btnUpdate').click(function () {
        if (trEdit) {
            //lay du lieu da duoc chinh sua
            let name = $('#txtName').val();
            let dob = $('#datBirthDay').val();
            let sex = $('input[name=sex]:checked').val();
            let add = $('#txtAddress').val();
            let tel = $('#numTel').val();
            let email = $('#emlEmail').val();
            //let personal = $('#txtPersonal').val();
            //let selectedSport = [];
            //$('input[name=sport]:checked').each(function () {
            //    selectedSport.push(this.value);
            //});
            let classes = $("#classes option:selected").val();

            //thay the du lieu cu sau khi chinh sua
            $(trEdit).find('td:eq(0)').text(name);
            $(trEdit).find('td:eq(1)').text(dob);
            $(trEdit).find('td:eq(2)').text(sex);
            $(trEdit).find('td:eq(3)').text(add);
            $(trEdit).find('td:eq(4)').text(tel);
            $(trEdit).find('td:eq(5)').text(email);
            //$(trEdit).find('td:eq(6)').text(personal);
            //$(trEdit).find('td:eq(7)').text(selectedSport);
            $(trEdit).find('td:eq(6)').text(classes);

            trEdit = null;

            $('#txtName').val("");
            $('#datBirthDay').val("");
            $('#txtAddress').val("");
            $('#numTel').val("");
            $('#emlEmail').val("");
            $('#txtPersonal').val("");
            $("input[name=sport]").prop("checked", false);
            $('#classes').val($("#classes option:first").val());

            $('#btnSave').show();
            $('#btnUpdate').hide();

            //$('form-dialog').dialog('close');
            //$('#form-dialog').dialog('close');

        }

    });

}