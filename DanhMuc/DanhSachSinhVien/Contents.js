$(document).ready(function () {
    LoadGridData();

    RegisterEvent();
});

var urlForm = "/DanhMuc/DanhSachSinhVien/FormDetail.aspx";
var urlActionHandler = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx";

function RegisterEvent() {
    //Sự kiện nhấn nút Add
    $('#btnAdd').click(function () {
        document.getElementById('home').classList.toggle('active');
        $.post(encodeURI(urlForm), { "do": "add" }, function (data) {
            $('#jdialog').html(data);
            var otp = {
                width: 900,
                title: "THÊM THÔNG TIN SINH VIÊN",
            }
            var theDialog = $('#jdialog').smDialog(otp);
            theDialog.dialog("open");
        });
    });

    //Sự kiện Search
    $('#search').on('search', function () {
        LoadGridSearch();
    });

    $('#ddlFindClass').change('click', function () {
        LoadGridSearch();
    });
}

function LoadGridData() {
    $.post(encodeURI(urlActionHandler), { "do": "loaddata" }, function (data) {
        var htmlData = "";
        var arrData = typeof data.jsonData != 'object' ? JSON.parse(data.jsonData) : data.jsonData;
        for (var i = 0; i < arrData.length; i++) {
            htmlData += "<tr>"
                + "<td>" + (i + 1) + "</td>"
                + "<td>" + arrData[i].HOVATEN + "</td>"
                + "<td class='text-center'>" + getJsonDate(arrData[i].NGAYSINH) + "</td>"
                + "<td>" + (arrData[i].GIOITINH == 1 ? "Nam" : "Nữ") + "</td>"
                + "<td>" + arrData[i].DIACHI + "</td>"
                + "<td>" + arrData[i].SDT + "</td>"
                + "<td>" + arrData[i].EMAIL + "</td>"
                + "<td>" + arrData[i].TENLOP + "</td>"
                + "<td class='text-center'><a href=\"#\" title='Sửa thông tin sinh viên' style='color: #ffd800' onclick=\"EditItem('" + arrData[i].ID + "');\"><i class='fas fa-edit'></i></a></td>"
                + "<td class='text-center'><a href=\"#\" title='Xóa thông tin sinh viên' style='color: #ff0000' onclick=\"DeleteItem('" + arrData[i].ID + "');\"><i class='fas fa-times'></i></a></td>"
                + "<td class='text-center'><a href=\"#\" title='Hiển thị chi tiết thông tin sinh viên' onclick=\"DetailItem('" + arrData[i].ID + "');\"><i class='fas fa-info-circle'></i></a></td>"
                + "</tr>";
        }
        console.log(htmlData);
        $("#dataList").html(htmlData);
    });
}

function LoadGridSearch() {
    debugger
    var selectSearch = $('#ddlFindClass').val();
    var inputSearch = $('#search').val();
    $.post(encodeURI(urlActionHandler), { "do": "search", "selectSearch": selectSearch, "inputSearch": inputSearch }, function (data) {
        var htmlData = "";
        var arrData = typeof data.jsonData != 'object' ? JSON.parse(data.jsonData) : data.jsonData;
        for (var i = 0; i < arrData.length; i++) {
            htmlData += "<tr>"
                + "<td>" + (i + 1) + "</td>"
                + "<td>" + arrData[i].HOVATEN + "</td>"
                + "<td class='text-center'>" + getJsonDate(arrData[i].NGAYSINH) + "</td>"
                + "<td>" + (arrData[i].GIOITINH == 1 ? "Nam" : "Nữ") + "</td>"
                + "<td>" + arrData[i].DIACHI + "</td>"
                + "<td>" + arrData[i].SDT + "</td>"
                + "<td>" + arrData[i].EMAIL + "</td>"
                + "<td>" + arrData[i].TENLOP + "</td>"
                + "<td class='text-center'><a href=\"#\" title='Sửa thông tin sinh viên' style='color: #ffd800' onclick=\"EditItem('" + arrData[i].ID + "');\"><i class='fas fa-edit'></i></a></td>"
                + "<td class='text-center'><a href=\"#\" title='Xóa thông tin sinh viên' style='color: #ff0000' onclick=\"DeleteItem('" + arrData[i].ID + "');\"><i class='fas fa-times'></i></a></td>"
                + "<td class='text-center'><a href=\"#\" title='Hiển thị chi tiết thông tin sinh viên' onclick=\"DetailItem('" + arrData[i].ID + "');\"><i class='fas fa-info-circle'></i></a></td>"
                + "</tr>";
        }
        console.log(htmlData);
        $("#dataList").html(htmlData);
    });
}

function DeleteItem(itemId) {
    if (confirm("Sinh viên này sẽ bị xóa khỏi danh sách của bạn") == true) {
        $.post(urlActionHandler, { "do": "delete", "itemId": itemId }, function (data) {
            LoadGridData();
        });
    } else {
        return false;
    }
}

function EditItem(itemId) {
    document.getElementById('home').classList.toggle('active');

    $.post(encodeURI(urlForm), { "do": "edit", "itemId": itemId }, function (data) {
        $('#jdialog').html(data);
        var otp = {
            width: 900,
            title: "CHỈNH SỬA THÔNG TIN SINH VIÊN",
        };
        $('#jdialog').smDialog(otp).dialog('open');
        $('#btnSave').text = "CẬP NHẬT";
    });
}

function DetailItem(itemId) {
    document.getElementById('home').classList.toggle('active');
    $.post(encodeURI("/DanhMuc/DanhSachSinhVien/ViewDetail.aspx"), { "do": "detail", "itemId": itemId }, function (data) {
        $('#jdialog').html(data);
        var otp = {
            width: 900,
            title: "CHI TIẾT THÔNG TIN SINH VIÊN",
        };
        $('#jdialog').smDialog(otp).dialog('open');
    });
}

function getJsonDate(jsonDate) {
    var dateString = jsonDate.substr(6);
    var currentTime = new Date(parseInt(dateString));
    return formatDate(currentTime);
}

function formatDate(date) {
    if (date == null || date == "")
        return "";
    if (date.getMonth() + 1 < 10) {
        if (date.getDate() < 10)
            return "0" + date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
        else
            return date.getDate() + "/0" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
    else {
        if (date.getDate() < 10)
            return "0" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        else
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}



