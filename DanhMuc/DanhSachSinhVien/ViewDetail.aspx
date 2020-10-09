<%@ Page Title="" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeFile="ViewDetail.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.ViewDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Popup" runat="server">
    <div style="background-color: #E5E5E5; padding: 35px;">
        <div class="row">
            <div class="col-6">
                <%--Họ và tên--%>
                <div class="row">
                    <label class="white-space: nowrap"><i class="fas fa-pencil-alt"></i>&nbsp Họ và tên (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtHovaTen"></p>
                </div>
                <%--Ngày sinh--%>
               <div class="row">
                    <label><i class="fas fa-calendar-alt"></i>&nbsp Ngày sinh (<span style="color: red">*</span>): &nbsp</label>
                    <p id="txtNgaySinh">&nbsp</p>
                </div>
                <%--Giới tính--%>
               <div class="row">
                    <label class="w-25"><i class="fas fa-male"></i><i class="fas fa-female"></i>&nbsp Giới tính (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtGioiTinh">&nbsp</p>
                </div>
                <%--Số điện thoại--%>
               <div class="row">
                    <label><i class="fas fa-phone"></i>&nbsp Điện thoại: &nbsp</label>
                    <p id="txtDienThoai"></p>
                </div>
                <%--Email--%>
               <div class="row">
                    <label><i class="fas fa-envelope"></i>&nbsp Email:&nbsp</label>
                    <p id="txtEmail"></p>
                </div>
                <%--Lớp--%>
               <div class="row">
                    <label><i class="fas fa-users"></i>&nbsp Lớp (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtLop"></p>
                </div>
            </div>
            <div class="col-6">
                <%--Địa chỉ--%>
               <div class="row">
                    <label> <i class="fas fa-map-marker-alt"></i>&nbsp Địa chỉ (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtDiaChi"></p>
                </div>
                <%--Thông tin cá nhân--%>
                <div class="row">
                    <label><i class="fas fa-user-shield"></i>&nbsp Thông tin cá nhân: &nbsp</label>
                    <p id="txtThongTinCaNhan"></p>
                </div>
                <%--Môn thể thao ưu thích--%>
                <div class="row">
                    <label for="vehicle1" class="mt-1"><i class="fas fa-futbol"></i>&nbsp Môn thể thao:&nbsp</label><br>
                    <p id="txtSport"></p>
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
        });
    </script>
</asp:Content>
