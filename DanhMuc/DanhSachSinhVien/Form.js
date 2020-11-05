$(document).ready(function () {
    RegisterEvent();
});

function RegisterEvent() {

    //Save data
    $('#btnSave').click(function () {
        AddForm();
        $('#home').removeClass('active');
    });

    //Delete Blur Backgroud
    $('.ui-button').click(function () {
        $('#home').removeClass('active');
    });

    //Cancel Popup
    $('button[name=btnDong]').click(function () {
        $('#home').removeClass('active');
        document.getElementById('validForm').reset();
        $('#jdialog').dialog('close');
    });

}

function AddForm() {
    var dataPost = $('#jdialog').find('input, hidden, select, textarea, radio, email, checkbox').not("#__VIEWSTATE,#__EVENTVALIDATION").serialize();
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



