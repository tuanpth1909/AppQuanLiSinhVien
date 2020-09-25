<%@ Page Title="" Language="C#" MasterPageFile="~/LayoutPage/LayoutPage.Master" AutoEventWireup="true" CodeBehind="AddSinhVienDialog.aspx.cs" Inherits="AppQuanLiSinhVien.Dialog.AddSinhVienDialog" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="AddDialog">
        <h3 class="text-center">Add student profile</h3>
        <hr class="bg-white" />
        <div class="row" id="SinhVienDialog">
            <form>
                <div class="col-6">
                    <%--Name--%>
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" id="txtName" class="w-75 float-right" value="" required />
                    </div>
                    <%--Birth Day--%>
                    <div class="form-group">
                        <label>Birth Day:</label>
                        <input type="date" name="date" id="datBirthDay" class="w-75 float-right" value="" required />
                    </div>
                    <%--Sex--%>
                    <div class="form-group">
                        <label class="w-25">Sex:</label>
                        <input type="radio" name="sex" value="Male" checked />
                        Male
                  
                            <input type="radio" name="sex" value="Female" class="" />
                        Female
                    </div>
                    <%--Address--%>
                    <div class="form-group">
                        <label>Address:</label>
                        <input type="text" name="add" id="txtAddress" class="w-75 float-right" value="" required />
                    </div>
                    <%--Tel--%>
                    <div class="form-group">
                        <label>Tel:</label>
                        <input type="number" name="tel" id="numTel" class="w-75 float-right" value="" required />
                    </div>
                    <%--Email--%>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" id="emlEmail" class="w-75 float-right" value="" required />
                    </div>
                </div>
                <div class="col-6">
                    <%--Personal biography--%>
                    <div class="form-group">
                        <label>Personal biography:</label>
                        <textarea id="txtPersonal" name="txtPersonal" class="w-100 float-right"></textarea>
                    </div>
                    <label for="vehicle1" class="mt-1">Favorite sport:</label><br>
                    <div class="form-group ">
                        <div class="row">
                            <div class="col-6">
                                <input type="checkbox" id="chekSoccer" name="sport" value="Soccer">
                                <label for="vehicle1">Soccer</label><br>
                                <input type="checkbox" id="chekBadminton" name="sport" value="Badminton">
                                <label for="vehicle2">Running</label><br>
                                <input type="checkbox" id="chekSwimming" name="sport" value="Swimming">
                                <label for="vehicle3">Swimming</label><br>
                            </div>
                            <div class="col-6">
                                <input type="checkbox" id="checkBasketball" name="sport" value="Basketball">
                                <label for="vehicle3">Basketball</label><br>
                                <input type="checkbox" id="checkJogging" name="sport" value="Jogging">
                                <label for="vehicle3">Jogging</label><br>
                                <input type="checkbox" id="checkBoxing" name="sport" value="Boxing">
                                <label for="vehicle3">Boxing</label>
                            </div>
                        </div>

                        <br>
                    </div>
                    <%--Class--%>
                    <div class="form-group">
                        <label>Class:</label>
                        <select name="classes" id="classes" class="w-75 float-right" style="padding-top: -50px">
                            <option value="T1909M">T1909M</option>
                            <option value="T1908M">T1908M</option>
                            <option value="T1907M">T1907M</option>
                            <option value="T1906M">T1906M</option>
                        </select>
                    </div>
                </div>
                <div class="btnAction">
                    <button type="button" name="btnSave" id="btnSave" class=" text-center"><strong>LƯU</strong></button>
                    <button type="button" name="btnUpdate" id="btnUpdate" class=" text-center" style="display: none"><strong>CẬP NHẬT</strong></button>
                    <button type="button" name="btnSave" id="btnCancel" class=" text-center"><strong>HỦY</strong></button>
                </div>
            </form>
        </div>
    </div>
    <button type="button" id="btnAdd" class="btn btn-primary">Add</button>
</asp:Content>
