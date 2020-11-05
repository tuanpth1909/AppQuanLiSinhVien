<%@ Page Title="Thêm thông tin sinh viên" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeBehind="FormDetail.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.FormDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/DanhMuc/DanhSachSinhVien/Form.js?v=15"></script>
    <%--<script type="text/javascript">
        $('input:checkbox').each(function (e, val) {
            if (objSINHVIEN.ARRTHETHAOID.container(val.id))
                this.checked = true;
        });
    </script>--%>
    <style>
        .colorChange{
            background-color: #00ff21;
            color: black;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Popup" runat="server">
    <div id="AddDialog" style="background-color: #E5E5E5; padding: 10px;">
        <form id="validForm">
            <div class="row">
                <div class="col-6 mt-1">
                    <%--Họ và tên--%>
                    <div class="form-group">
                        <label>&nbsp Họ và tên (<span style="color: red">*</span>): </label>
                        <input type="text" name="txtName" id="txtName" class="w-75 float-right" value="<%=objSINHVIEN.HOVATEN %>"" required />
                    </div>
                    <%--Ngày sinh--%>
                    <div class="form-group">
                        <label>&nbsp Ngày sinh (<span style="color: red">*</span>):</label>
                        <input type="text" class="textbox-n w-75 float-right" onfocus="(this.type='date')" id="txtDate" name="txtDate" placeholder="Ngày/Tháng/Năm" value="<%=string.Format("{0:dd/MM/yyyy}",objSINHVIEN.NGAYSINH) %>" required>
                    </div>
                    <%--Giới tính--%>
                    <div class="form-group">
                        <label class="w-25">&nbsp Giới tính (<span style="color: red">*</span>):</label>
                        <input type="radio" name="rdoSex" value="1" <%if (objSINHVIEN.GIOITINH == 1) {%>checked="checked" <%} %> />
                        Nam
                            <input type="radio" name="rdoSex" value="0"  <%if (objSINHVIEN.GIOITINH == 0) {%>checked="checked" <%} %> />
                        Nữ
                    </div>
                    <%--Số điện thoại--%>
                    <div class="form-group">
                        <label>&nbsp Điện thoại:</label>
                        <input type="text" name="txtTel" id="txtTel" class="w-75 float-right" value="<%=objSINHVIEN.SDT %>"" />
                    </div>
                    <%--Email--%>
                    <div class="form-group">
                        <label>&nbsp Email:</label>
                        <input type="email" name="txtEmail" id="txtEmail" class="w-75 float-right" value="<%=objSINHVIEN.EMAIL %>"" />
                    </div>
                    <%--Lớp--%>
                    <div class="form-group">
                        <label>&nbsp Lớp (<span style="color: red">*</span>):</label>
                        <select name="ddlClasses" id="ddlClasses" class="w-25 ml-5" style="padding-top: -50px; height: 25px; margin-left: 10px" required>
                            <%foreach (var item in objLOPHOC)
                                {%>
                            <option value="<%=item.ID %>" <%=(objSINHVIEN.LOPID == item.ID ? "selected" : "") %>><%=item.TENLOP %></option>
                            <% } %>
                        </select>
                    </div>
                </div>
                <div class="col-6">
                    <%--Địa chỉ--%>
                    <div class="form-group">
                        <label>&nbsp Địa chỉ (<span style="color: red">*</span>):</label>
                        <textarea id="txtAddress" name="txtAddress" class="w-100 float-right" required><%=objSINHVIEN.DIACHI %></textarea>
                    </div>
                    <%--Thông tin cá nhân--%>
                    <div class="form-group">
                        <label>&nbsp Thông tin cá nhân:</label>
                        <textarea id="txtPersonal" name="txtPersonal" class="w-100 float-right"><%=objSINHVIEN.TT_CANHAN %></textarea>
                    </div>
                    <%--Môn thể thao ưu thích--%>
                    <label for="vehicle1" class="mt-1">&nbsp Môn thể thao:</label><br>
                    <div class="form-group ">
                        <div class="row">
                            <div class="col-4">
                                <input type="checkbox" id="chekSoccer" name="chk21AA9E2B-5BDA-4926-8557-D02073855B08" value="1"  />
                                <label for="vehicle1">Đá bóng</label><br>
                                <input type="checkbox" id="chekBadminton" name="chk94E9E009-D322-4B93-9C67-5F2CF1D88985" value="1">
                                <label for="vehicle2">Cầu lông</label><br>
                                <input type="checkbox" id="chekSwimming" name="chk20E03073-5F98-46C5-85EC-A803A43C15BA" value="1">
                                <label for="vehicle3">Bơi lội</label><br>
                            </div>
                            <div class="col-4">
                                <input type="checkbox" id="checkTennis" name="chk23A05D09-AE73-4C06-8FC7-5113C75873E4" value="1">
                                <label for="vehicle3">Tennis</label><br>
                                <input type="checkbox" id="checkSkiing" name="chk8C834AF3-50EC-4D1D-A7E9-6EC0F9B1887C" value="1">
                                <label for="vehicle3">Trượt tuyết</label><br>
                                <input type="checkbox" id="checkVolleyball" name="chk6C2C7F4B-FE6C-4145-A359-422501B33251" value="1">
                                <label for="vehicle3">Bóng chuyền</label>
                            </div>
                            <div class="col-4">
                                <input type="checkbox" id="checkBasketball" name="chkCF0CA0D0-6AC4-4FE2-A90D-B99F8F1A8C6D" value="1">
                                <label for="vehicle3">Bóng rổ</label><br>
                                <input type="checkbox" id="checkJogging" name="chkC7CE9520-8200-40C5-9214-026FDD04D39F" value="1">
                                <label for="vehicle3">Chạy bộ</label><br>
                                <input type="checkbox" id="checkBoxing" name="chkAAF1F239-CC7E-44B3-B9E0-5CD1CA2D4A81" value="1">
                                <label for="vehicle3">Boxing</label>
                            </div>
                        </div>

                        <br>
                    </div>
                </div>
                <div>
                    <input type="hidden" name="ItemId" value="<%=itemId %>"" />
                    <input type="hidden" name="do" value="<%=doAction %>"" />
                </div>
                <div class="row ml-3">
                    <button type="button" name="btnSave" id="btnSave" class="btnSave text-center" style="width: 50px; background-color: #0069D9;"><strong>LƯU</strong></button>
                    <%--<button type="button" name="btnUpdate" id="btnUpdate" class="btnUpdate text-center" style="display: none; width: 100px; background-color: #8DBC49;"><strong>CẬP NHẬT</strong></button>--%>
                    <button type="button" name="btnDong" id="btnCancel" class="btnCancel text-center ml-2" style="width: 50px;"><strong>HỦY</strong></button>
                </div>
            </div>
        </form>
    </div>

</asp:Content>
