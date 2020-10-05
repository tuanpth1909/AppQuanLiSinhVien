<%@ Page Title="" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeBehind="ChiTiet.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.ChiTiet" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/DanhMuc/DanhSachSinhVien/Form.js?v=7"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div style="background-color: #E5E5E5; padding: 35px;">
        <div class="row">
            <div class="col-6">
                <%--Họ và tên--%>
                <div class="row">
                    <label class="white-space: nowrap">Họ và tên (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtHovaTen"></p>
                </div>
                <%--Ngày sinh--%>
               <div class="row">
                    <label>Ngày sinh (<span style="color: red">*</span>): &nbsp</label>
                    <p id="datNgaySinh">&nbsp</p>
                </div>
                <%--Giới tính--%>
               <div class="row">
                    <label class="w-25">Giới tính (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtGioiTinh">&nbsp</p>
                </div>
                <%--Số điện thoại--%>
               <div class="row">
                    <label>Điện thoại: &nbsp</label>
                    <p id="txtDienThoai"></p>
                </div>
                <%--Email--%>
               <div class="row">
                    <label>Email:&nbsp</label>
                    <p id="emlEmail"></p>
                </div>
                <%--Lớp--%>
               <div class="row">
                    <label>Lớp (<span style="color: red">*</span>):&nbsp</label>
                    <p id="chkLop"></p>
                </div>
            </div>
            <div class="col-6">
                <%--Địa chỉ--%>
               <div class="row">
                    <label>Địa chỉ (<span style="color: red">*</span>):&nbsp</label>
                    <p id="txtDiaChi"></p>
                </div>
                <%--Thông tin cá nhân--%>
                <div class="row">
                    <label>Thông tin cá nhân: &nbsp</label>
                    <p id="txtThongTinCaNhan"></p>
                </div>
                <%--Môn thể thao ưu thích--%>
                <div class="row">
                    <label for="vehicle1" class="mt-1">Môn thể thao:&nbsp</label><br>
                    <p id="checkSport"></p>
                </div>
            </div>
        </div>
        <div class="row">
            <button type="button" name="btnCancel" id="btnCancel" class="btnCancel text-center" style="width: 65px;"><strong>ĐÓNG</strong></button>
        </div>
    </div>
</asp:Content>
