<%@ Page Title="Thêm thông tin sinh viên" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeBehind="FormDetail.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.FormDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/DanhMuc/DanhSachSinhVien/Form.js?v=7"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Popup" runat="server">
        <div id="AddDialog" style="background-color: #E5E5E5; padding: 10px;">
            <form id="validForm">
                <div class="row">
                    <div class="col-6 mt-1">
                        <%--Họ và tên--%>
                        <div class="form-group">
                            <label>&nbsp Họ và tên (<span style="color: red">*</span>): </label>
                            <input type="text" name="txtName" id="txtName" class="w-75 float-right" value="" required/>
                        </div>
                        <%--Ngày sinh--%>
                        <div class="form-group">
                            <label>&nbsp Ngày sinh (<span style="color: red">*</span>):</label>
                            <input type="text" class="textbox-n w-75 float-right" onfocus="(this.type='date')" id="txtDate" name="txtDate" placeholder="Ngày/Tháng/Năm" value="" required>
                        </div>
                        <%--Giới tính--%>
                        <div class="form-group">
                            <label class="w-25">&nbsp Giới tính (<span style="color: red">*</span>):</label>
                            <input type="radio" name="rdoSex" value="Nam" checked />
                            Nam
                            <input type="radio" name="rdoSex" value="Nữ" class="" />
                            Nữ
                        </div>
                        <%--Số điện thoại--%>
                        <div class="form-group">
                            <label>&nbsp Điện thoại:</label>
                            <input type="text" name="txtTel" id="txtTel" class="w-75 float-right" value="" />
                        </div>
                        <%--Email--%>
                        <div class="form-group">
                            <label>&nbsp Email:</label>
                            <input type="email" name="txtEmail" id="txtEmail" class="w-75 float-right" value="" />
                        </div>
                        <%--Lớp--%>
                        <div class="form-group">
                            <label>&nbsp Lớp (<span style="color: red">*</span>):</label>
                            <select name="ddlClasses" id="ddlClasses" class="w-25 ml-5" style="padding-top: -50px; height: 25px; margin-left: 10px" required>
                                <option value="T1909M">T1909M</option>
                                <option value="T1908M">T1908M</option>
                                <option value="T1907M">T1907M</option>
                                <option value="T1906M">T1906M</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <%--Địa chỉ--%>
                        <div class="form-group">
                            <label>&nbsp Địa chỉ (<span style="color: red">*</span>):</label>
                            <textarea id="txtAddress" name="txtAddress" class="w-100 float-right" required></textarea>
                        </div>
                        <%--Thông tin cá nhân--%>
                        <div class="form-group">
                            <label>&nbsp Thông tin cá nhân:</label>
                            <textarea id="txtPersonal" name="txtPersonal" class="w-100 float-right"></textarea>
                        </div>
                        <%--Môn thể thao ưu thích--%>
                        <label for="vehicle1" class="mt-1">&nbsp Môn thể thao:</label><br>
                        <div class="form-group ">
                            <div class="row">
                                <div class="col-4">
                                    <input type="checkbox" id="chekSoccer" name="chkSport" value="Đá bóng">
                                    <label for="vehicle1">Đá bóng</label><br>
                                    <input type="checkbox" id="chekBadminton" name="chkSport" value="Cầu lông">
                                    <label for="vehicle2">Cầu lông</label><br>
                                    <input type="checkbox" id="chekSwimming" name="chkSport" value="Bơi lội">
                                    <label for="vehicle3">Bơi lội</label><br>
                                </div>
                                <div class="col-4">
                                    <input type="checkbox" id="checkTennis" name="chkSport" value="Tennis">
                                    <label for="vehicle3">Tennis</label><br>
                                    <input type="checkbox" id="checkSkiing" name="chkSport" value="Trượt tuyết">
                                    <label for="vehicle3">Trượt tuyết</label><br>
                                    <input type="checkbox" id="checkVolleyball" name="chkSport" value="Bóng chuyền">
                                    <label for="vehicle3">Bóng chuyền</label>
                                </div>
                                <div class="col-4">
                                    <input type="checkbox" id="checkBasketball" name="chkSport" value="Bóng rổ">
                                    <label for="vehicle3">Bóng rổ</label><br>
                                    <input type="checkbox" id="checkJogging" name="chkSport" value="Chạy bộ">
                                    <label for="vehicle3">Chạy bộ</label><br>
                                    <input type="checkbox" id="checkBoxing" name="chkSport" value="Boxing">
                                    <label for="vehicle3">Boxing</label>
                                </div>
                            </div>

                            <br>
                        </div>

                    </div>
                    <div class="row ml-3">
                        <button type="button" name="btnSave" id="btnSave" class="btnSave text-center" style="width: 50px; background-color: #0069D9;" onclick="adds()"><strong>LƯU</strong></button>
                        <button type="button" name="btnUpdate" id="btnUpdate" class="btnUpdate text-center" style="display: none; width: 100px; background-color: #8DBC49;"><strong>CẬP NHẬT</strong></button>
                        <button type="button" name="btnDong" id="btnCancel" class="btnCancel text-center ml-2" style="width: 50px;"><strong>HỦY</strong></button>
                    </div>
                </div>
            </form>
        </div>
</asp:Content>
