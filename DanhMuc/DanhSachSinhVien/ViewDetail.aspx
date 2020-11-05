<%@ Page Title="" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeFile="ViewDetail.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.ViewDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Popup" runat="server">
    <div style="background-color: #E5E5E5; padding: 35px;">
        <div class="row">
            <div class="col-6">
                <%--Họ và tên--%>
                <div class="row">
                    <label class="white-space: nowrap">&nbsp Họ và tên (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtHovaTen">&nbsp<%=objSINHVIEN.HOVATEN %></p>
                </div>
                <%--Ngày sinh--%>
               <div class="row">
                    <label>&nbsp Ngày sinh (<span style="color: red">*</span>): &nbsp</label>
                    <p id="txtNgaySinh"> <%=string.Format("{0:dd/MM/yyyy}",objSINHVIEN.NGAYSINH) %></p>
                </div>
                <%--Giới tính--%>
               <div class="row">
                    <label class="w-25">&nbsp Giới tính (<span style="color: red">*</span>):</label>
                    <p id="txtGioiTinh"><%=objSINHVIEN.GIOITINH  == 1 ? "Nam" : "Nữ" %></p>
                </div>
                <%--Số điện thoại--%>
               <div class="row">
                    <label>&nbsp Điện thoại: &nbsp</label>
                    <p id="txtDienThoai"><%=objSINHVIEN.SDT %></p>
                </div>
                <%--Email--%>
               <div class="row">
                    <label>&nbsp Email:&nbsp</label>
                    <p id="txtEmail">&nbsp<%=objSINHVIEN.EMAIL %></p>
                </div>
                <%--Lớp--%>
               <div class="row">
                    <label>&nbsp Lớp (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtLop">&nbsp<%=objSINHVIEN.LOPID %></p>
                </div>
            </div>
            <div class="col-6">
                <%--Địa chỉ--%>
               <div class="row">
                    <label>&nbsp Địa chỉ (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtDiaChi">&nbsp<%=objSINHVIEN.DIACHI %></p>
                </div>
                <%--Thông tin cá nhân--%>
                <div class="row">
                    <label>&nbsp Thông tin cá nhân: &nbsp</label>
                    <p id="txtThongTinCaNhan"><%=objSINHVIEN.TT_CANHAN %></p>
                </div>
                <%--Môn thể thao ưu thích--%>
                <div class="row">
                    <label for="vehicle1" class="mt-1">&nbsp Môn thể thao:&nbsp</label><br>
                    <p id="txtSport"><%=objSINHVIEN.ARRTHETHAOID %></p>
                </div>
            </div>
        </div>
        <div class="row">
            <button type="button" name="btnDong" id="btnDong" class="btnCancel text-center" style="width: 65px;"><strong>ĐÓNG</strong></button>
        </div>                          
    </div>
    <script>
        $('button[name=btnDong]').click(function () {
            $('#jdialog').dialog('close');
            $('#home').removeClass('active');
        });
        $('.ui-button').click(function () {
            $('#home').removeClass('active');
        });


    </script>
</asp:Content>
