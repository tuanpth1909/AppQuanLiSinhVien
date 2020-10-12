<%@ Page Title="Danh Sách Sinh Viên" Language="C#" MasterPageFile="~/ExtraMasters/ExtraForm.master" AutoEventWireup="true" CodeFile="DanhSach.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.DanhSach" %>

<asp:Content ID="Content2" ContentPlaceHolderID="DanhSachSinhVien" runat="server">
    <div class="container mt-4">
        <h4 class="mt-2"><i class="fas fa-list"></i><strong> DANH SÁCH SINH VIÊN</strong></h4>
        <div class="row">
            <%--Thêm sinh viên--%>
            <div class="col-4">
                <button type="button" name="btnAdd" id="btnAdd" class="btn btn-sm mb-1 btn-primary"><i class="fas fa-plus-circle"></i> THÊM</button>
            </div>
            <%--Khu vực tìm kiếm--%>
            <div class="col-8">
                    <input type="search" name="search" id="search" class="float-right mb-3 form-control" style="width: 350px; height: 25px;" value="" placeholder="Tìm kiếm..." />
                <div class="form-group float-right">
                        <label class="mr-1"> Lớp: </label>
                        <select name="ddlFindClass" id="ddlFindClass" class=" mr-1" style="padding-top: -50px; height: 25px;"">
                            <option value="">--Chọn lớp--</option>
                            <option value="T1909M">T1909M</option>
                            <option value="T1908M">T1908M</option>
                            <option value="T1907M">T1907M</option>
                            <option value="T1906M">T1906M</option>
                        </select>
                    </div>
            </div>
        </div>
        <%--Bảng thông tin sinh viên--%>
        <table class="w-100 table-bordered mb-3">
            <thead style="background-color: #E2F0F6;">
                <tr>
                    <th>HỌ VÀ TÊN</th>
                    <th style="width: 100px; text-align: center">NGÀY SINH</th>
                    <th style="width: 90px;">GIỚI TÍNH</th>
                    <th>ĐỊA CHỈ</th>
                    <th style="width: 120px;">SỐ ĐIỆN THOẠI</th>
                    <th>EMAIL</th>
                    <th style="width: 70px;">LỚP</th>
                    <th style="width: 20px"></th>
                    <th style="width: 20px"></th>
                    <th style="width: 20px"></th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    </div>
    <script src="/DanhMuc/DanhSachSinhVien/Contents.js?v=4"></script>
    <link href="/DanhMuc/DanhSachSinhVien/DanhSach.css" rel="stylesheet" />
</asp:Content>
