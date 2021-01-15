$(document).ready(function () {
    LoadGrid();

    RegisterEvent();
});

//Khai báo biến cho đường dẫn đến popup và action 
var urlForm = "/DanhMuc/DanhSachSinhVien/FormDetail.aspx";
var urlActionHandler = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx";

//Đăng ký các sự kiện cho các btn
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

    //Search theo input
    $('#search').on('search', function () {
        LoadGrid();
    });

    //Search theo dropdown (select-option)
    $('#ddlFindClass').change('click', function () {
        LoadGrid();
    });

    //Xuất list sinh viên
    $('#btnExportTable').click(function () {
        ExportWordList()
    });

    //Xuat danh sach sinh vien ra file Excel
    $('#btnExportExcel').click(function () {
        ExportExcel();
    });

    $('#btnExportExcelBm').click(function () {
        ExportExcelBm();
    });

    $('#btnExportExcelCC').click(function () {
        ExportExcelCC();
    });

    //Nhap file Excel them thong tin sinh vien
    $('#btnImportExcel').click(function () {
        ImportExcel();
    });
}

//Load lại bảng(chỉ bảng) sau mỗi lần thực hiện hành động
function LoadGrid() {
    var selectSearch = $('#ddlFindClass').val();
    var inputSearch = $('#search').val();
    $.post(encodeURI(urlActionHandler), { "do": "loaddata", "selectSearch": selectSearch, "inputSearch": inputSearch }, function (data) {
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
                + "<td class='text-center'><a href=\"#\" title='Xuất file doc' onclick=\"ExportWord('" + arrData[i].ID + "');\"><i class='far fa-file-word'></i></a></td>"
                + "</tr>";
        }
        console.log(htmlData);
        $("#dataList").html(htmlData);
    });
}

//Chức năng xóa
function DeleteItem(itemId) {
    if (confirm("Sinh viên này sẽ bị xóa khỏi danh sách của bạn") == true) {
        $.post(urlActionHandler, { "do": "delete", "itemId": itemId }, function () {
            LoadGrid();
        });
    } else {
        return false;
    }
}

//Chức năng chỉnh sửa
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

//Chức năng xem chi tiết
function DetailItem(itemId) {
    debugger
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

//Chức năng xuất ra file Doc
function ExportWord(itemId) {
    debugger
    var urlActionTaoFile = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx?filetype=doc&do=exportword&itemId=" + itemId +"";
    window.open(urlActionTaoFile, "_blank");
    return false;
    //#region Comment
    //Không dùng được phương thức Post vì post là phương thức truyền dữ liệu đi
    //không nhận giá trị trả về nên là vậy
    //#endregion
}

//Xuất 1 table file Doc
function ExportWordList() {
    var urlActionTaoFile = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx?filetype=doc&do=exportwordtable";
    window.open(urlActionTaoFile, "_blank");
    return false;
}

//Xuất 1 table file Excel 
function ExportExcel() {
    var urlActionTaoFile = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx?filetype=doc&do=exportexceltable";
    window.open(urlActionTaoFile, "_blank");
    return false;
}

//Xuat file Excel tao bang code
function ExportExcelBm() {
    var urlActionTaoFile = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx?filetype=doc&do=exportexcelbm";
    window.open(urlActionTaoFile, "_blank");
    return false;
}

//Xuat file cham cong
function ExportExcelCC() {
    var urlActionTaoFile = "/DanhMuc/DanhSachSinhVien/ActionHandler.aspx?filetype=doc&do=exportexcelcc";
    window.open(urlActionTaoFile, "_blank");
    return false;
}

//Nhập file Excel
function ImportExcel() {
    $.post(urlActionHandler, { "do": "importexcel" }, function () {
        alert("Thêm mới thành công!");
        LoadGrid();
    });
}
//#region Fomat ngày tháng năm qua 2 function
//Hàm chuyển đối json về string
function getJsonDate(jsonDate) {
    var dateString = jsonDate.substr(6);
    var currentTime = new Date(parseInt(dateString));
    return formatDate(currentTime);
}

//Fomat định dạng date
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

//#endregion



