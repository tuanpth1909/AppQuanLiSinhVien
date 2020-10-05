<%@ Page Title="" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeBehind="FormDetail.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.FormDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/DanhMuc/DanhSachSinhVien/Form.js?v=9"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div id="AddDialog" style="background-color: #E5E5E5; padding: 10px;">
            <form id="validForm">
                <div class="row">
                    <div class="col-6 mt-1">
                        <%--Họ và tên--%>
                        <div class="form-group">
                            <label>Họ và tên (<span style="color: red">*</span>): </label>
                            <input type="text" name="name" id="txtName" class="w-75 float-right" value="" />
                        </div>
                        <%--Ngày sinh--%>
                        <div class="form-group">
                            <label>Ngày sinh (<span style="color: red">*</span>):</label>
                            <input type="text" class="textbox-n w-75 float-right" onfocus="(this.type='date')" id="datBirthDay" name="date" placeholder="Ngày/Tháng/Năm" value="">
                        </div>
                        <%--Giới tính--%>
                        <div class="form-group">
                            <label class="w-25">Giới tính (<span style="color: red">*</span>):</label>
                            <input type="radio" name="sex" value="Nam" checked />
                            Nam
                            <input type="radio" name="sex" value="Nữ" class="" />
                            Nữ
                        </div>
                        <%--Số điện thoại--%>
                        <div class="form-group">
                            <label>Điện thoại:</label>
                            <input type="text" name="tel" id="numTel" class="w-75 float-right" value="" />
                        </div>
                        <%--Email--%>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" id="emlEmail" class="w-75 float-right" value="" />
                        </div>
                        <%--Lớp--%>
                        <div class="form-group">
                            <label>Lớp (<span style="color: red">*</span>):</label>
                            <select name="classes" id="classes" class="w-25 ml-5" style="padding-top: -50px; height: 25px;">
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
                            <label>Địa chỉ (<span style="color: red">*</span>):</label>
                            <textarea id="txtAddress" name="txtAddress" class="w-100 float-right" required></textarea>
                        </div>
                        <%--Thông tin cá nhân--%>
                        <div class="form-group">
                            <label>Thông tin cá nhân:</label>
                            <textarea id="txtPersonal" name="txtPersonal" class="w-100 float-right"></textarea>
                        </div>
                        <%--Môn thể thao ưu thích--%>
                        <label for="vehicle1" class="mt-1">Môn thể thao:</label><br>
                        <div class="form-group ">
                            <div class="row">
                                <div class="col-4">
                                    <input type="checkbox" id="chekSoccer" name="sport" value="Đá bóng">
                                    <label for="vehicle1">Đá bóng</label><br>
                                    <input type="checkbox" id="chekBadminton" name="sport" value="Cầu lông">
                                    <label for="vehicle2">Cầu lông</label><br>
                                    <input type="checkbox" id="chekSwimming" name="sport" value="Bơi lội">
                                    <label for="vehicle3">Bơi lội</label><br>
                                </div>
                                <div class="col-4">
                                    <input type="checkbox" id="checkTennis" name="sport" value="Tennis">
                                    <label for="vehicle3">Tennis</label><br>
                                    <input type="checkbox" id="checkSkiing" name="sport" value="Skiing">
                                    <label for="vehicle3">Skiing</label><br>
                                    <input type="checkbox" id="checkVolleyball" name="sport" value="Volleyball">
                                    <label for="vehicle3">Volleyball</label>
                                </div>
                                <div class="col-4">
                                    <input type="checkbox" id="checkBasketball" name="sport" value="Bóng rổ">
                                    <label for="vehicle3">Bóng rổ</label><br>
                                    <input type="checkbox" id="checkJogging" name="sport" value="Chạy bộ">
                                    <label for="vehicle3">Chạy bộ</label><br>
                                    <input type="checkbox" id="checkBoxing" name="sport" value="Boxing">
                                    <label for="vehicle3">Boxing</label>
                                </div>
                            </div>

                            <br>
                        </div>

                    </div>
                    <div class="row ml-3">
                        <button type="button" name="btnSave" id="btnSave" class="btnSave text-center" style="width: 50px; background-color: #0069D9;"><strong>LƯU</strong></button>
                        <button type="button" name="btnUpdate" id="btnUpdate" class="btnUpdate text-center" style="display: none; width: 100px; background-color: #8DBC49;"><strong>CẬP NHẬT</strong></button>
                        <button type="button" name="btnCancel" id="btnCancel" class="btnCancel text-center ml-2" style="width: 50px;"><strong>HỦY</strong></button>
                    </div>
                </div>
            </form>
        </div>
</asp:Content>
