<%@ Page Title="Danh Sách Sinh Viên" Language="C#" MasterPageFile="~/ExtraMasters/ExtraForm.master" AutoEventWireup="true" CodeFile="DanhSach.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.DanhSach" %>

<asp:Content ID="Content2" ContentPlaceHolderID="DanhSachSinhVien" runat="server">
    <div class="container mt-4">
        <h4 class="mt-2"><i class="fas fa-list"></i><strong>DANH SÁCH SINH VIÊN</strong></h4>
        <div class="row">
            <%--Thêm sinh viên--%>
            <div class="col-4">
                <button type="button" name="btnAdd" id="btnAdd" class="btn btn-sm mb-1 btn-primary"><i class="fas fa-plus-circle"></i>THÊM</button>
            </div>
            <%--Khu vực tìm kiếm--%>
            <div class="col-8">
                <input type="search" name="search" id="search" class="float-right mb-3 form-control" style="width: 350px; height: 25px;" value="" placeholder="Tìm kiếm tên sinh viên..." />
                <div class="form-group float-right">
                    <label class="mr-1">Lớp: </label>
                    <select name="ddlFindClass" id="ddlFindClass" class=" mr-1" style="padding-top: -50px; height: 25px;">
                        <option value="">--Chọn lớp--</option>
                        <option value="AB80D836-C4FC-4153-9E63-3C976C553C53">T1909M</option>
                        <option value="1C77F49D-9733-48EA-8D2F-237EB7093052">T1908M</option>
                        <option value="091B9E55-9B16-4573-824B-7537DCA2A6A9">T1907M</option>
                        <option value="E39F714D-36E0-4A36-9A8B-34835B788E8B">T1906M</option>
                    </select>
                </div>
            </div>
        </div>
        <%--Bảng thông tin sinh viên--%>
        <table class="w-100 table-bordered mb-3">
            <thead style="background-color: #E2F0F6;">
                <tr>
                    <th>STT</th>
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
            <tbody id="dataList">
            </tbody>
        </table>
        <div class="float-right">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <script src="/DanhMuc/DanhSachSinhVien/Contents.js?v=3"></script>
    <link href="/DanhMuc/DanhSachSinhVien/DanhSach.css?v=3" rel="stylesheet" />
</asp:Content>
