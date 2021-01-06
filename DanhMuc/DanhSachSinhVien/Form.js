$(document).ready(function () {
    RegisterEvent();
});

function RegisterEvent() {

    //Save data
    $('#btnSave').click(function () {
        debugger
        var validate = $('#validForm').valid();
        if (validate) {
            AddForm();
        } else {
            return false;
        }
        $('#home').removeClass('active');
    });

    //Delete Blur Backgroud
    $('.ui-button').click(function () {
        $('#home').removeClass('active');
    });

    //Cancel Popup
    $('button[name=btnDong]').click(function () {
        $('#home').removeClass('active');
        //document.getElementById('validForm').reset();
        $('#jdialog').dialog('close');
    });

    validateForm();
}

function AddForm() {
    debugger
    var ItemTheThao = [];
    $.each($("input[name = 'chkTheThao']:checked"), function () {
        ItemTheThao.push($(this).val());
    });
    var dataPost = $('#validForm').find('input, hidden, select, textarea, radio, email, checkbox').not("#__VIEWSTATE,#__EVENTVALIDATION").serializeArray();
    dataPost.push(ItemTheThao);
    $.post(urlActionHandler, dataPost, function (data) {
        if (data.Erros) {
            alert(data.Message);
            $('#jdialog', window.parent.document).scrollTop(0);
        } else {
            $("#jdialog").html("").dialog('close');
            LoadGridData();
        }
    });
}

function validateForm() {

    $("#validForm").validate({
        rules: {
            txtName: {
                required: true,
            },
            txtDate: {
                required: true,
                date: true,
                min: "1900-01-01",
                max: "2002-01-01"
            },
            txtAddress: {
                required: true
            }
        },
        messages: {
            txtName: {
                required: "Nhập tên sinh viên",
            },
            txtDate: {
                required: "Nhập ngày sinh",
                date: "Ngày sinh không hợp lệ",
                min: "Ngày sinh không hợp lệ",
                max: "Không thể nhập quá ngày hiện tại"
            },
            txtAddress: {
                required: "Nhập địa chỉ"
            }
        }
    });

}


