<%@ Page Title="" Language="C#" MasterPageFile="~/MainMasters/LayoutForm.master" AutoEventWireup="true" CodeFile="DanhSachSinhVien.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.DanhSachSinhVien" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container mt-4">
        <h4 class="mt-2"><i class="fas fa-list"></i><strong> DANH SÁCH SINH VIÊN</strong></h4>
        <div class="row">
            <%--btn Thêm sinh viên--%>
            <div class="col-4">
                <button type="button" name="btnAdd" class="btn btn-sm mb-1 btn-primary" id="btnAdd"><i class="fas fa-plus-circle"></i> THÊM</button>
            </div>
            <%--Khu vực tìm kiếm--%>
            <div class="col-8">
                    <input type="search" name="name" id="search" class="float-right mb-3 form-control" style="width: 350px; height: 25px;" value="" placeholder="Tìm kiếm..." />
                <div class="form-group float-right">
                        <label class="mr-1"> Lớp: </label>
                        <select name="slClasses" id="slClasses" class=" mr-1" style="padding-top: -50px; height: 25px;"">
                            <option value="">--Chọn lớp--</option>
                            <option value="T1909M">T1909M</option>
                            <option value="T1908M">T1908M</option>
                            <option value="T1907M">T1907M</option>
                            <option value="T1906M">T1906M</option>
                        </select>
                    </div>
                <div class="form-group float-right">
                    <label class="mr-1"> Giới Tính: </label>
                    <select name="slGioiTinh" id="slGioiTinh" class=" mr-1" style="padding-top: -50px; height: 25px;"">
                            <option value="">--Chọn Giới Tính--</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
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
                    <th>LỚP</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Phạm Tuân</td>
                    <td class="text-center">2001-04-08</td>
                    <td>Nam</td>
                    <td>35A ngõ 116/51 Miếu Đầm - Nam Từ Liêm - Hà Nội</td>
                    <td>0382548442</td>
                    <td>phamtuancules20@gmail.com</td>
                    <td>T1909M</td>
                    <td><a href="#" name="edit" title="Sửa thông tin sinh viên"><i class="fas fa-edit"></i></a></td>
                    <td><a href="#" name="delete" title="Xóa thông tin sinh viên"><i class="fas fa-times"></i></a></td>
                </tr>
                <tr>
                    <td>Nguyễn Thị A</td>
                    <td class="text-center">2001-04-08</td>
                    <td>Nữ</td>
                    <td>90 Nguyễn Tuân - Thanh Xuân Trung - Thanh Xuân - Hà Nội</td>
                    <td>0382548442</td>
                    <td>nguyenthia@gmail.com</td>
                    <td>T1908M</td>
                    <td><a href="#" name="edit" title="Sửa thông tin sinh viên"><i class="fas fa-edit"></i></a></td>
                    <td><a href="#" name="delete" title="Xóa thông tin sinh viên"><i class="fas fa-times"></i></a></td>
                </tr>
                <tr>
                    <td>Lê Thanh B</td>
                    <td class="text-center">2001-04-08</td>
                    <td>Nam</td>
                    <td>54 Liễu Giai - Ngọc Khánh - Ba Đình - Hà Nội</td>
                    <td>0382548442</td>
                    <td>lethanhb@gmail.com</td>
                    <td>T1906M</td>
                    <td><a href="#" name="edit" title="Sửa thông tin sinh viên"><i class="fas fa-edit"></i></a></td>
                    <td><a href="#" name="delete" title="Xóa thông tin sinh viên"><i class="fas fa-times"></i></a></td>
                </tr>
                 <tr>
                    <td>Trần Thị B</td>
                    <td class="text-center">2001-04-08</td>
                    <td>Nam</td>
                    <td>54 Liễu Giai - Ngọc Khánh - Ba Đình - Hà Nội</td>
                    <td>0382548442</td>
                    <td>lethanhb@gmail.com</td>
                    <td>T1906M</td>
                    <td><a href="#" name="edit" title="Sửa thông tin sinh viên"><i class="fas fa-edit"></i></a></td>
                    <td><a href="#" name="delete" title="Xóa thông tin sinh viên"><i class="fas fa-times"></i></a></td>
                </tr>
            </tbody>
        </table>
    </div>
</asp:Content>
