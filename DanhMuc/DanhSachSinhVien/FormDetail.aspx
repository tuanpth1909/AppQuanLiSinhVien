<%@ Page Title="Thêm thông tin sinh viên" Language="C#" MasterPageFile="~/LayoutMasters/LayoutDialog.Master" AutoEventWireup="true" CodeBehind="FormDetail.aspx.cs" Inherits="AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien.FormDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/DanhMuc/DanhSachSinhVien/Form.js?v=2"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Popup" runat="server">
    <div id="AddDialog" style="background-color: #E5E5E5; padding: 10px; height: 360px">
        <form id="validForm">
            <div class="row">
                <div class="col-6 mt-1">
                    <%--Họ và tên--%>
                    <div class="form-group">
                        <label>&nbsp Họ và tên (<span style="color: red">*</span>): </label>
                        <input type="text" name="txtName" id="txtName" class="w-75 float-right" value="<%=objSINHVIEN.HOVATEN %>" />
                    </div>
                    <%--Ngày sinh--%>
                    <div class="form-group">
                        <label>&nbsp Ngày sinh (<span style="color: red">*</span>):</label>
                        <input type="text" class="textbox-n w-75 float-right" onfocus="(this.type='date')" id="txtDate" name="txtDate" placeholder="Ngày/Tháng/Năm" value="<%=string.Format("{0:dd/MM/yyyy}",objSINHVIEN.NGAYSINH) %>">
                    </div>
                    <%--Giới tính--%>
                    <div class="form-group">
                        <label class="w-25">&nbsp Giới tính (<span style="color: red">*</span>):</label>
                        <input type="radio" name="rdoSex" value="1" <%if (objSINHVIEN.GIOITINH == 1)
                            {%>checked="checked"
                            <%} %> />
                        Nam
                            <input type="radio" name="rdoSex" value="0" <%if (objSINHVIEN.GIOITINH == 0)
                                {%>checked="checked"
                                <%} %> />
                        Nữ
                    </div>
                    <%--Số điện thoại--%>
                    <div class="form-group">
                        <label>&nbsp Điện thoại:</label>
                        <input type="text" name="txtTel" id="txtTel" class="w-75 float-right" value="<%=objSINHVIEN.SDT %>" />
                    </div>
                    <%--Email--%>
                    <div class="form-group">
                        <label>&nbsp Email:</label>
                        <input type="email" name="txtEmail" id="txtEmail" class="w-75 float-right" value="<%=objSINHVIEN.EMAIL %>" />
                    </div>
                    <%--Lớp--%>
                    <div class="form-group">
                        <label>&nbsp Lớp (<span style="color: red">*</span>):</label>
                        <select name="ddlClasses" id="ddlClasses" class="w-25 ml-5" style="padding-top: -50px; height: 25px; margin-left: 10px">
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
                        <textarea id="txtAddress" name="txtAddress" class="w-100 float-right"><%=objSINHVIEN.DIACHI %></textarea>
                    </div>
                    <%--Thông tin cá nhân--%>
                    <div class="form-group">
                        <label>&nbsp Thông tin cá nhân:</label>
                        <textarea id="txtPersonal" name="txtPersonal" class="w-100 float-right"><%=objSINHVIEN.TT_CANHAN %></textarea>
                    </div>
                    <%--Môn thể thao ưu thích--%>
                    <label for="vehicle1" class="mt-1">&nbsp Môn thể thao:</label><br>
                    <div class="form-group">
                        <div class="row">
                            <%foreach (var itemTT in objTHETHAO)
                                { %>
                            <%for (var i = 0; i < 1; i++)
                                { %>
                            <% if (lstMONTHETHAO.Contains(itemTT.ID.ToString())) { %>
                            <div class="col-4">
                                <input type="checkbox" name="chkTheThao" value="<%=itemTT.ID %>" checked/>
                                <label for="vehicle1"><%=itemTT.TENTHETHAO %></label><br>
                            </div>                            
                            <%} %> <% else { %>
                            <div class="col-4">
                                <input type="checkbox" name="chkTheThao" value="<%=itemTT.ID %>" />
                                <label for="vehicle1"><%=itemTT.TENTHETHAO %></label><br>
                            </div>    
                            <%}%>
                            <%} %>

                            <%} %>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <div class="float-right">
                <button type="submit" name="btnSave" id="btnSave" class="btnSave text-center" style="width: 50px; background-color: #0069D9;"><strong>LƯU</strong></button>
                <button type="button" name="btnDong" id="btnCancel" class="btnCancel text-center ml-2" style="width: 50px;"><strong>HỦY</strong></button>
            </div>
            <div>
                <input type="hidden" name="ItemId" value="<%=itemId %>" />
                <input type="hidden" name="do" value="<%=doAction %>" />
            </div>
        </form>
    </div>
</asp:Content>
