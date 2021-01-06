using db_Connect;
using db_Connect.Entities;
using db_Connect.LIB;
using LIB;
using Novacode;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Web;

namespace AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien
{
    public partial class ActionHandler : System.Web.UI.Page
    {
        string doAction = "";
        string itemId = "";
        string search = "";
        string searchDanhMuc = "";
        JEntity jMessage = new JEntity();
        QUANLYSINHVIENEntities dbContext;
        SMIS_2016Entities db;
        DmSINHVIENDAP dapSINHVIEN;
        DmTHETHAODAP dapTHETHAO;
        THETHAO_SINHVIENDAP dapTHETHAO_SINHVIEN;
        DmLOPHOCDAP dapLOPHOC;
        DmCHAMCONGDAP dapCHAMCONG;
        DmDANGKYONSITEDAP dapDANGKYONSITE;
        public List<THETHAO_SINHVIEN> lstTHETHAO_SINHVIEN = new List<THETHAO_SINHVIEN>();

        public void Page_Load(object sender, EventArgs e)
        {
            dbContext = new QUANLYSINHVIENEntities();
            dapSINHVIEN = new DmSINHVIENDAP(dbContext);
            dapTHETHAO = new DmTHETHAODAP(dbContext);
            dapLOPHOC = new DmLOPHOCDAP(dbContext);
            dapDANGKYONSITE = new DmDANGKYONSITEDAP();
            dapCHAMCONG = new DmCHAMCONGDAP();
            dapTHETHAO_SINHVIEN = new THETHAO_SINHVIENDAP(dbContext);
            doAction = string.IsNullOrEmpty(Request["do"]) ? "" : Request["do"].ToLower();
            itemId = Request["ItemId"];
            searchDanhMuc = Request["selectSearch"];
            search = Request["inputSearch"];

            switch (doAction)
            {
                case "add":
                    Add();
                    break;
                case "delete":
                    Delete();
                    break;
                case "edit":
                    Edit();
                    break;
                case "exportword":
                    ExportWord();
                    break;
                case "exportwordtable":
                    ExportWordTable();
                    break;
                case "exportexceltable":
                    ExportExcel();
                    break;
                case "exportexcelbm":
                    ExportExcelBm();
                    break;
                case "exportexcelcc":
                    ExportExcelCC();
                    break;
                case "importexcel":
                    ImportExcel();
                    break;
                case "loaddata":
                    LoadGridData();
                    break;
            }
            RenderMessage(jMessage);
        }

        public void LoadGridData()
        {
            List<SINHVIENEntities> lsmSINHVIEN = dapSINHVIEN.GetPaged(1, 15, searchDanhMuc, search);
            jMessage.jsonData = getJson(lsmSINHVIEN);
            jMessage.Erros = false;
        }

        private void Add()
        {
            DmSINHVIEN objSINHVIEN = new DmSINHVIEN();//Vì sinh viên là 1 đối tượng, nên phải khởi tạo đối tượng sinh viên trước để có thể thêm dữ liệu
            objSINHVIEN.ID = Guid.NewGuid().ToString();//Dùng Guid để và Newid() để tạo ID tự sinh theo type 36 kí tự
            objSINHVIEN.HOVATEN = Request["txtName"].ToString();
            objSINHVIEN.NGAYSINH = Convert.ToDateTime(Request["txtDate"].ToString());//Convert dữ liệu để chuẩn với db
            objSINHVIEN.GIOITINH = Int32.Parse(Request["rdoSex"]);//Convert dữ liệu để chuẩn với db
            objSINHVIEN.SDT = Request["txtTel"].ToString();
            objSINHVIEN.EMAIL = Request["txtEmail"].ToString();
            objSINHVIEN.LOPID = Request["ddlClasses"].ToString();
            objSINHVIEN.DIACHI = Request["txtAddress"].ToString();
            objSINHVIEN.TT_CANHAN = Request["txtPersonal"].ToString();
            dapSINHVIEN.Add(objSINHVIEN);

            String lstTheThao = Request["chkTheThao"].ToString();
            string[] arrListStr = lstTheThao.Split(',');//Do Sinh viên và thể thao là liên kết n-n nên phải khởi tạo một array thể thao

            //Kiểm tra xem có rỗng không để thêm vào dữ liệu
            if (lstTheThao != "")
            {
                foreach (var objTheThao in arrListStr)
                {
                    THETHAO_SINHVIEN objTHETHAO_SINHVIEN = new THETHAO_SINHVIEN();
                    objTHETHAO_SINHVIEN.ID = Guid.NewGuid().ToString();
                    objTHETHAO_SINHVIEN.SINHVIENID = objSINHVIEN.ID;
                    objTHETHAO_SINHVIEN.THETHAOID = objTheThao;
                    objTHETHAO_SINHVIEN.TENTHETHAO = dapTHETHAO.GetById(objTheThao).TENTHETHAO;
                    dapTHETHAO_SINHVIEN.Add(objTHETHAO_SINHVIEN);
                }
            }

            jMessage.Erros = false;
        }

        public void Delete()
        {
            dapSINHVIEN.Delete(itemId);//Xóa dữ liệu sinh viên qua method được định nghĩa trong dap
        }

        /// <summary>
        /// Hàm dùng để làm gì?
        /// </summary>
        /// <Modified>
        /// Auther:     Date        Comment
        /// TuanPham    2020/01/09  Tạo mới 
        /// Hai         2020/02/03  Sửa: Fix lỗi gì? 
        /// </Modified>
        private void Edit()
        {
            DmSINHVIEN objSINHVIEN = dapSINHVIEN.GetById(itemId);
            //Check trung du lieu   
            if (itemId == objSINHVIEN.ID)
            {
                objSINHVIEN.HOVATEN = Request["txtName"].ToString();
                objSINHVIEN.NGAYSINH = Convert.ToDateTime(Request["txtDate"].ToString());
                objSINHVIEN.GIOITINH = Int32.Parse(Request["rdoSex"]);
                objSINHVIEN.SDT = Request["txtTel"].ToString();
                objSINHVIEN.EMAIL = Request["txtEmail"].ToString();
                objSINHVIEN.LOPID = Request["ddlClasses"].ToString();
                objSINHVIEN.DIACHI = Request["txtAddress"].ToString();
                objSINHVIEN.TT_CANHAN = Request["txtPersonal"].ToString();

                //Chỉ xóa mỗi môn thể thao của sinh viên được Edit()
                dapSINHVIEN.DeleteTT_SV(itemId);

                #region Dữ liệu sau khi xóa sẽ được thêm mới 
                String lstTheThao = Request["chkTheThao"].ToString();
                string[] arrListStr = lstTheThao.Split(',');//Do Sinh viên và thể thao là liên kết n-n nên phải khởi tạo một array thể thao

                //Kiểm tra xem có rỗng không để thêm vào dữ liệu
                if (lstTheThao != "")
                {
                    foreach (var objTheThao in arrListStr)
                    {
                        THETHAO_SINHVIEN objTHETHAO_SINHVIEN = new THETHAO_SINHVIEN();
                        objTHETHAO_SINHVIEN.ID = Guid.NewGuid().ToString();
                        objTHETHAO_SINHVIEN.SINHVIENID = objSINHVIEN.ID;
                        objTHETHAO_SINHVIEN.THETHAOID = objTheThao;
                        objTHETHAO_SINHVIEN.TENTHETHAO = dapTHETHAO.GetById(objTheThao).TENTHETHAO;
                        dapTHETHAO_SINHVIEN.Add(objTHETHAO_SINHVIEN);
                    }
                }
                #endregion
                dapSINHVIEN.Save();
                jMessage.Erros = false;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        private void ExportWord()
        {
            DmSINHVIEN itemSV = dapSINHVIEN.GetById(itemId);
            lstTHETHAO_SINHVIEN = dapTHETHAO_SINHVIEN.GetById(itemId);
            if (itemSV != null)
            {
                //Khai báo đường dẫn khi file được lưu về máy
                string urlFileSave = "/AppFile/tmp/" + itemSV.ID + ".docx";
                urlFileSave = Server.MapPath(urlFileSave);
                //Khai báo đường dẫn file word cần đọc 
                string fileName = Server.MapPath("/AppFile/Docs/ExportWord.docx");
                var dob = (itemSV.NGAYSINH).ToString("dd/MM/yyyy");
                var sex = (itemSV.GIOITINH) == 1 ? "Nam" : "Nữ";
                var lstTHETHAO = "";

                using (DocX doc = DocX.Load(fileName))
                {
                    doc.ReplaceText("@hovaten", string.IsNullOrEmpty(itemSV.HOVATEN) ? "" : itemSV.HOVATEN);
                    doc.ReplaceText("@sinhnam", dob == null ? "" : dob);
                    doc.ReplaceText("@gioitinh", sex == null ? "" : sex);
                    doc.ReplaceText("@lop", itemSV.DmLOPHOC.TENLOP);
                    doc.ReplaceText("@diachi", string.IsNullOrEmpty(itemSV.DIACHI) ? "" : itemSV.DIACHI);
                    doc.ReplaceText("@sdt", string.IsNullOrEmpty(itemSV.SDT) ? "" : itemSV.SDT);
                    doc.ReplaceText("@email", string.IsNullOrEmpty(itemSV.EMAIL) ? "" : itemSV.EMAIL);
                    doc.ReplaceText("@ttcn", string.IsNullOrEmpty(itemSV.TT_CANHAN) ? "" : itemSV.TT_CANHAN);
                    foreach (var itemtt in lstTHETHAO_SINHVIEN)
                    {
                        lstTHETHAO += itemtt.TENTHETHAO + " ,";
                    }
                    lstTHETHAO = lstTHETHAO.Trim().Substring(0, lstTHETHAO.Length - 1);
                    doc.ReplaceText("@thethao", string.IsNullOrEmpty(lstTHETHAO) ? "" : lstTHETHAO);
                    doc.SaveAs(urlFileSave);
                    doc.Save();

                    Response.Buffer = true;
                    Response.Expires = 0;
                    Response.Clear();
                    string strHttpContext_ContentType = "application/msword";
                    HttpContext.Current.Response.ContentType = strHttpContext_ContentType;
                    HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
                    HttpContext.Current.Response.Charset = "utf-8";
                    Response.AddHeader("Content-Disposition", "attachment; filename=ThongTinSinhVien" + ".docx");
                    Response.TransmitFile(urlFileSave);
                    Response.Flush();
                    Response.Close();
                    Response.End();

                }
            }
        }

        private void ExportWordTable()
        {
            List<SINHVIENEntities> lstSINHVIEN = dapSINHVIEN.GetAll();
            if (lstSINHVIEN != null)
            {
                //Khai báo đường dẫn của file sau khi lưu 
                string urlFileSave = "/AppFile/tmp/ListSV.docx";
                urlFileSave = Server.MapPath(urlFileSave);
                //Khai báo đường dẫn của file doc được đọc
                string fileName = Server.MapPath("/AppFile/Docs/ExportWordTable.docx");

                using (DocX doc = DocX.Load(fileName))
                {
                    Novacode.Table tblSINHVIEN = doc.Tables[1];
                    Novacode.Row rowCn = tblSINHVIEN.Rows[1];
                    int count = 2;
                    Novacode.Row newRow;

                    for (int i = 0; i < lstSINHVIEN.Count; i++)
                    {
                        newRow = tblSINHVIEN.InsertRow(rowCn, count++);
                        newRow.Cells[0].ReplaceText("@stt", (i + 1).ToString());
                        newRow.Cells[1].ReplaceText("@hovaten", lstSINHVIEN[i].HOVATEN == null ? "" : lstSINHVIEN[i].HOVATEN);
                        newRow.Cells[2].ReplaceText("@ngaysinh", lstSINHVIEN[i].NGAYSINH == null ? "" : lstSINHVIEN[i].NGAYSINH.ToString("dd/MM/yyyy"));
                        newRow.Cells[3].ReplaceText("@gioitinh", lstSINHVIEN[i].GIOITINH == 1 ? "Nam" : "Nữ");
                        newRow.Cells[4].ReplaceText("@diachi", lstSINHVIEN[i].DIACHI == null ? "" : lstSINHVIEN[i].DIACHI);
                        newRow.Cells[5].ReplaceText("@sdt", lstSINHVIEN[i].SDT == null ? "" : lstSINHVIEN[i].SDT);
                        newRow.Cells[6].ReplaceText("@email", lstSINHVIEN[i].EMAIL == null ? "" : lstSINHVIEN[i].EMAIL);
                        newRow.Cells[7].ReplaceText("@lop", lstSINHVIEN[i].TENLOP);
                    }
                    tblSINHVIEN.RemoveRow(1);
                    doc.SaveAs(urlFileSave);
                    doc.Save();
                    Response.Buffer = true;
                    Response.Expires = 0;
                    Response.Clear();
                    string strHttpContext_ContentType = "application/msword";
                    HttpContext.Current.Response.ContentType = strHttpContext_ContentType;
                    HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
                    HttpContext.Current.Response.Charset = "utf-8";
                    Response.AddHeader("Content-Disposition", "attachment; filename=BangThongTinSinhVien" + ".docx");
                    Response.TransmitFile(urlFileSave);
                    Response.Flush();
                    Response.Close();
                    Response.End();
                }

            }
        }

        private void ExportExcel()
        {
            List<SINHVIENEntities> lstSINHVIEN = dapSINHVIEN.GetAll();

            if (lstSINHVIEN != null)
            {

                #region Đường dẫn tới file Excel
                string urlFileSave = "/AppFile/tmp/Export.xls";
                urlFileSave = Server.MapPath(urlFileSave);
                string fileName = Server.MapPath("/AppFile/Excel/ExportExcelSample.xls");
                #endregion

                //HSSFWorkbook wb = new HSSFWorkbook();
                //ISheet sheet = wb.CreateSheet();
                //HSSFWorkbook _excel = ExcelNpoi.ReadExcelToHSSFWorkBook(fileName);
                HSSFWorkbook _excel = ExcelNpoi.ReadExcelToHSSFWorkBook(fileName);
                HSSFSheet _sheet = (HSSFSheet)_excel.GetSheetAt(0);

                ICellStyle cellStyle = null;
                ICellStyle cellStyleCenter = null;

                cellStyle = _sheet.GetRow(2).GetCell(1).CellStyle;
                cellStyleCenter = _sheet.GetRow(2).GetCell(2).CellStyle;

                using (FileStream excel = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                {
                    #region Đổ dữ liệu ra sheet
                    int count = 2;
                    for (var i = 0; i < lstSINHVIEN.Count; i++)
                    {
                        var newRow = _sheet.CreateRow(count++);
                        SetCellVal(newRow, cellStyle, 0, (i + 1).ToString());
                        SetCellVal(newRow, cellStyle, 1, lstSINHVIEN[i].HOVATEN == null ? "" : lstSINHVIEN[i].HOVATEN);
                        SetCellVal(newRow, cellStyleCenter, 2, lstSINHVIEN[i].NGAYSINH == null ? "" : lstSINHVIEN[i].NGAYSINH.ToString("dd/MM/yyyy"));
                        SetCellVal(newRow, cellStyle, 3, lstSINHVIEN[i].GIOITINH == 1 ? "Nam" : "Nữ");
                        SetCellVal(newRow, cellStyle, 4, lstSINHVIEN[i].DIACHI == null ? "" : lstSINHVIEN[i].DIACHI);
                        SetCellVal(newRow, cellStyle, 5, lstSINHVIEN[i].SDT == null ? "" : lstSINHVIEN[i].SDT);
                        SetCellVal(newRow, cellStyle, 6, lstSINHVIEN[i].EMAIL == null ? "" : lstSINHVIEN[i].EMAIL);
                        SetCellVal(newRow, cellStyle, 7, lstSINHVIEN[i].TENLOP);
                    }
                    #endregion
                    #region ExportExcel
                    MemoryStream exportData = new MemoryStream();
                    _excel.Write(exportData);
                    Response.ContentType = "application/vnd.ms-excel";
                    Response.AppendHeader("Content-disposition", "attachment; filename=DanhSachSinhVien2020.xls");
                    Response.Clear();
                    Response.BinaryWrite(exportData.GetBuffer());
                    Response.End();
                    #endregion
                }
            }


        }

        private void ExportExcelBm()
        {

            string filePath = Server.MapPath("/AppFile/Excel/ExcelBm.xls");//duong dan file excel

            HSSFWorkbook wb = ExcelNpoi.ReadExcelToHSSFWorkBook(filePath);//tao excel ten ban excel duoc dua vao
            HSSFSheet sheet = (HSSFSheet)wb.GetSheetAt(0);//tao sheet moi tu excel duoc chon sheet 

            HSSFFont font1 = (HSSFFont)wb.CreateFont();//Khoi tao doi tuong font chu
            font1.FontName = "Arial";
            font1.FontHeight = 240;
            //Chu can giua o
            //Thieu chu phai in dam

            HSSFFont font2 = (HSSFFont)wb.CreateFont();
            font2.FontName = "Arial";
            font2.FontHeight = 90;
            //create cell style for title
            HSSFCellStyle xsStyle = (HSSFCellStyle)wb.CreateCellStyle();
            xsStyle.SetFont(font1);

            HSSFCellStyle xsStyletime = (HSSFCellStyle)wb.CreateCellStyle();
            xsStyletime.SetFont(font2);

            //Tao doi tuong hang (Chi duong phep lay hang truoc sau do trong hang co thuoc tinh cot)
            var row0 = sheet.CreateRow(0);
            row0.CreateCell(0);

            var row1 = sheet.CreateRow(1);
            row1.CreateCell(1);

            CellRangeAddress cellMerge = new CellRangeAddress(0, 0, 0, 20);//Gop cell theo y muon
            CellRangeAddress cellMergetime = new CellRangeAddress(1, 2, 1, 1);
            sheet.AddMergedRegion(cellMerge);
            sheet.AddMergedRegion(cellMergetime);
            row0.GetCell(0).CellStyle = xsStyle;
            row0.GetCell(0).SetCellValue("Quản lý thông tin sinh viên");
            row1.GetCell(1).CellStyle = xsStyletime;
            row1.GetCell(1).SetCellValue("Thoi gian ");


            var row2 = sheet.CreateRow(2);
            row2.CreateCell(0).SetCellValue("STT");
            row2.CreateCell(1).SetCellValue("Ho Va Ten");
            row2.CreateCell(2).SetCellValue("Ngay Sinh");
            row2.CreateCell(3).SetCellValue("Gioi Tinh");
            row2.CreateCell(4).SetCellValue("Dia Chi");
            row2.CreateCell(5).SetCellValue("SDT");
            row2.CreateCell(6).SetCellValue("Email");
            row2.CreateCell(7).SetCellValue("Lop");

            List<SINHVIENEntities> tbl_Sinhviens = dapSINHVIEN.GetAll();

            using (FileStream excel = new FileStream(filePath, FileMode.OpenOrCreate, FileAccess.Read))
            {
                #region Đổ dữ liệu ra sheet
                int rowIndex = 2;
                int stt = 0;
                foreach (var item in tbl_Sinhviens)
                {
                    //Neu di muon di to mau cam
                    //Neu onssite thi to may xanh

                    var newRow = sheet.CreateRow(rowIndex);
                    newRow.CreateCell(0).SetCellValue(stt += 1);
                    newRow.CreateCell(1).SetCellValue(item.HOVATEN);
                    newRow.CreateCell(2).SetCellValue(item.NGAYSINH.ToString("dd/MM/yyyy"));
                    newRow.CreateCell(3).SetCellValue(item.GIOITINH == 1 ? "Nữ" : "Nam");
                    newRow.CreateCell(4).SetCellValue(item.DIACHI);
                    newRow.CreateCell(5).SetCellValue(item.SDT);
                    newRow.CreateCell(6).SetCellValue(item.EMAIL);
                    newRow.CreateCell(7).SetCellValue(item.TENLOP);

                    rowIndex++;
                }
                #endregion 

                #region Xuất file Excel
                MemoryStream exportData = new MemoryStream();
                wb.Write(exportData);
                Response.ContentType = "application/vnd.ms-excel";
                Response.AppendHeader("Content-disposition", "attachment; filename=DanhSachSinhVien2020.xls");
                Response.Clear();
                Response.BinaryWrite(exportData.GetBuffer());
                Response.End();
                #endregion
            }
        }

        private void ExportExcelCC()
        {
            string filePath = Server.MapPath("/AppFile/Excel/ChamCongSimaxs.xls");

            HSSFWorkbook wb = ExcelNpoi.ReadExcelToHSSFWorkBook(filePath);//tao excel ten ban excel duoc dua vao
            HSSFSheet sheet = (HSSFSheet)wb.GetSheetAt(0);//tao sheet moi tu excel duoc chon sheet 

            #region Create font word

            HSSFCellStyle xWhite = (HSSFCellStyle)wb.CreateCellStyle();
            var setStyleCellWhite = xsSetStyle(xWhite, NPOI.HSSF.Util.HSSFColor.White.Index, NPOI.SS.UserModel.BorderStyle.None);

            HSSFCellStyle xWhiteCN = (HSSFCellStyle)wb.CreateCellStyle();
            var setStyleCellWhiteCN = xsSetStyle(xWhiteCN, NPOI.HSSF.Util.HSSFColor.White.Index, NPOI.SS.UserModel.BorderStyle.Dotted);

            HSSFCellStyle xYellow = (HSSFCellStyle)wb.CreateCellStyle();
            var setStyleCellYellow = xsSetStyle(xYellow, NPOI.HSSF.Util.HSSFColor.Yellow.Index, NPOI.SS.UserModel.BorderStyle.Dotted);

            HSSFCellStyle xBlue = (HSSFCellStyle)wb.CreateCellStyle();
            var setStyleCellBlue = xsSetStyle(xBlue, NPOI.HSSF.Util.HSSFColor.Aqua.Index, NPOI.SS.UserModel.BorderStyle.Dotted);

            //Merge cell
            #endregion

            List<KETQUACHAMCONGEntities> listKetQuaChamCong = dapCHAMCONG.ListChamCong();
            List<KETQUACHAMCONGEntities> listDayOfMonth = dapCHAMCONG.ListNgay();
            List<DANGKYONSITEEtities> listOnsite = dapDANGKYONSITE.ListOnsite();

            using (FileStream excel = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {

                #region Replace thứ trong tháng
                for (var i = 4; i < 35; i++)
                {
                    var row = sheet.GetRow(6).GetCell(i);
                    row.SetCellValue(listKetQuaChamCong[i - 4].THU);
                }
                #endregion

                #region Replace ngày trong tháng
                for (var i = 4; i < 35; i++)
                {
                    var row = sheet.GetRow(5).GetCell(i);
                    row.SetCellValue(listKetQuaChamCong[i - 4].DAY);
                }
                #endregion

                #region Replace tiêu đề tháng
                var date = sheet.GetRow(1).GetCell(0);
                date.SetCellValue("Từ ngày " + listKetQuaChamCong[0].NGAY + " đến ngày " + listKetQuaChamCong[30].NGAY);
                #endregion

                #region Đổ dữ liệu ra sheet

                int rowCopy = 7;
                int rowIndex = 9;
                int rowIndexCopy = 11;
                int stt = 0;
                string userID = listKetQuaChamCong[0].USERID; //Lấy Id đầu tiên làm chuẩn để so sánh với các Id khác
                IRow worksheetRow = sheet.GetRow(rowIndex);
                TimeSpan dateMorning = TimeSpan.Parse("08:00"); //Hours by default
                TimeSpan dateAfternoon = TimeSpan.Parse("17:30"); //Timeout by default

                for (int i = 0; i < listKetQuaChamCong.Count;)
                {
                    //Nếu trùng id thì chỉ cho đổi theo chiều ngang
                    if (userID != null && userID == listKetQuaChamCong[i].USERID)
                    {
                        worksheetRow.GetCell(0).SetCellValue(stt + 1);
                        worksheetRow.GetCell(1).SetCellValue("");
                        worksheetRow.GetCell(2).SetCellValue(listKetQuaChamCong[i].FULLNAME == null ? "" : listKetQuaChamCong[i].FULLNAME);

                        for (int j = 4; j < listDayOfMonth.Count + 4; j++)
                        {
                            if (listKetQuaChamCong[i].NGAY == listDayOfMonth[j - 4].DAY)
                            {
                                TimeSpan indexGioDen = TimeSpan.Parse(String.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "00:00" : listKetQuaChamCong[i].GIODEN);
                                TimeSpan indexGioRa = TimeSpan.Parse(String.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "18:00" : listKetQuaChamCong[i].GIORA);
                                int resultGioDen = TimeSpan.Compare(indexGioDen, dateMorning);
                                int resultGioRa = TimeSpan.Compare(indexGioRa, dateAfternoon);


                                if (resultGioDen > 0 || resultGioRa < 0)
                                {
                                    if (listKetQuaChamCong[i].THU == "T7")
                                    {
                                        if (resultGioDen > 0)
                                        {
                                            for (int n = 0; n < listOnsite.Count; n++)
                                            {
                                                if (listOnsite[n].TuNgay == listKetQuaChamCong[i].NGAY || listOnsite[n].DenNgay == listKetQuaChamCong[i].NGAY)
                                                {
                                                    //In ra giờ đến
                                                    worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                                    //worksheetRow.GetCell(j).CellStyle = xsStyleOrange;
                                                    worksheetRow.GetCell(j).CellStyle = setStyleCellBlue;
                                                    IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                                    //In ra giờ về
                                                    rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                                    rowIndexGioRa.GetCell(j).CellStyle = setStyleCellBlue;
                                                    i++;
                                                }
                                                else
                                                {
                                                    //In ra giờ đến
                                                    worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                                    //worksheetRow.GetCell(j).CellStyle = xsStyleOrange;
                                                    worksheetRow.GetCell(j).CellStyle = setStyleCellYellow;
                                                    IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                                    //In ra giờ về
                                                    rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                                    rowIndexGioRa.GetCell(j).CellStyle = setStyleCellYellow;
                                                    i++;
                                                }
                                            }

                                        }
                                        else
                                        {
                                            //In ra giờ đến
                                            worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                            IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                            //In ra giờ về
                                            rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                            i++;
                                        }
                                    }

                                    else
                                    {
                                        for (int n = 0; n < listOnsite.Count; n++)
                                        {
                                            if (listOnsite[n].TuNgay == listKetQuaChamCong[i].NGAY || listOnsite[n].DenNgay == listKetQuaChamCong[i].NGAY)
                                            {
                                                //In ra giờ đến
                                                worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                                //worksheetRow.GetCell(j).CellStyle = xsStyleOrange;
                                                worksheetRow.GetCell(j).CellStyle = setStyleCellBlue;
                                                IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                                //In ra giờ về
                                                rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                                rowIndexGioRa.GetCell(j).CellStyle = setStyleCellBlue;
                                                i++;
                                            }
                                            else
                                            {
                                                //In ra giờ đến
                                                worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                                //worksheetRow.GetCell(j).CellStyle = xsStyleOrange;
                                                worksheetRow.GetCell(j).CellStyle = setStyleCellYellow;
                                                IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                                //In ra giờ về
                                                rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                                rowIndexGioRa.GetCell(j).CellStyle = setStyleCellYellow;
                                                i++;
                                            }
                                        }

                                    }
                                }
                                else
                                {
                                    //In ra giờ đến
                                    worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                    IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                    //In ra giờ về
                                    rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                    if (listKetQuaChamCong[i].GIODEN == null && listKetQuaChamCong[i].GIORA == null)
                                    {
                                        worksheetRow.GetCell(j).CellStyle = setStyleCellWhite;
                                        worksheetRow.GetCell(j).SetCellValue("V");
                                    }
                                    if (listKetQuaChamCong[i].THU == "CN")
                                    {
                                        worksheetRow.GetCell(j).CellStyle = setStyleCellWhiteCN;
                                        worksheetRow.GetCell(j).SetCellValue("");
                                        rowIndexGioRa.GetCell(j).SetCellValue("");
                                    }
                                    i++;

                                }

                                //if (resultGioDen > 0 || resultGioRa < 0)
                                //{
                                //    if (listKetQuaChamCong[i].THU == "T7")
                                //    {
                                //        if (resultGioDen > 0)
                                //        {
                                //            //In ra giờ đến
                                //            worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                //            //worksheetRow.GetCell(j).CellStyle = xsStyleOrange;
                                //            worksheetRow.GetCell(j).CellStyle = setStyleCellYellow;
                                //            IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                //            //In ra giờ về
                                //            rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                //            rowIndexGioRa.GetCell(j).CellStyle = setStyleCellYellow;
                                //            i++;
                                //        }
                                //        else
                                //        {
                                //            //In ra giờ đến
                                //            worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                //            IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                //            //In ra giờ về
                                //            rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                //            i++;
                                //        }
                                //    }

                                //    else
                                //    {
                                //        //In ra giờ đến
                                //        worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                //        worksheetRow.GetCell(j).CellStyle = setStyleCellYellow;
                                //        IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                //        //In ra giờ về
                                //        rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                //        rowIndexGioRa.GetCell(j).CellStyle = setStyleCellYellow;
                                //        i++;
                                //    }
                                //}
                                //else
                                //{
                                //    //In ra giờ đến
                                //    worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
                                //    IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
                                //    //In ra giờ về
                                //    rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
                                //    if (listKetQuaChamCong[i].GIODEN == null && listKetQuaChamCong[i].GIORA == null)
                                //    {
                                //        worksheetRow.GetCell(j).CellStyle = setStyleCellWhite;
                                //        worksheetRow.GetCell(j).SetCellValue("V");
                                //    }
                                //    if (listKetQuaChamCong[i].THU == "CN")
                                //    {
                                //        worksheetRow.GetCell(j).CellStyle = setStyleCellWhiteCN;
                                //        worksheetRow.GetCell(j).SetCellValue("");
                                //        rowIndexGioRa.GetCell(j).SetCellValue("");
                                //    }
                                //    i++;

                                //}
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    //Khác id xuất dữ liệu xuống dòng tiếp theo
                    else
                    {
                        stt++;
                        worksheetRow = sheet.GetRow(rowIndexCopy);
                        //worksheetRow.GetCell(2).IsMergedCell = false;
                        sheet.CopyRow(rowCopy, rowIndexCopy);
                        sheet.CopyRow(rowCopy + 1, rowIndexCopy + 1);
                        rowIndexCopy = rowIndexCopy + 2;
                        rowIndex = rowIndex + 2;
                        userID = listKetQuaChamCong[i].USERID;
                    }
                }
                //for(int n = 0; n < listOnsite.Count; n++)
                //{

                //}

                #region Delete first row
                var rowDelete1 = sheet.GetRow(rowCopy);
                var rowDelete2 = sheet.GetRow(rowCopy + 1);
                if (rowDelete1 != null)
                {
                    sheet.RemoveRow(rowDelete1);
                    sheet.RemoveRow(rowDelete2);
                    sheet.ShiftRows(rowCopy + 1, sheet.LastRowNum, -1);
                    sheet.ShiftRows(rowCopy + 1, sheet.LastRowNum, -1);
                }
                #endregion

                #endregion

                #region ExportExcel
                MemoryStream exportData = new MemoryStream();
                wb.Write(exportData);
                Response.ContentType = "application/vnd.ms-excel";
                Response.AppendHeader("Content-disposition", "attachment; filename=ChamCong2020.xls");
                Response.Clear();
                Response.BinaryWrite(exportData.GetBuffer());
                Response.End();
                #endregion
            }
        }

        private void ImportExcel()
        {
            string fileName = Server.MapPath("/AppFile/Excel/ImportExcel.xls");
            IWorkbook ws = null;
            DataFormatter formatter = new DataFormatter();
            FileStream fs = new FileStream(fileName, FileMode.Open, FileAccess.Read);
            if (fileName.IndexOf(".xlsx") > 0)
                ws = new XSSFWorkbook(fs);
            else if (fileName.IndexOf(".xls") > 0)
                ws = new HSSFWorkbook(fs);

            //First sheet
            ISheet _sheet = ws.GetSheetAt(0);
            if (_sheet != null)
            {
                int rowIndex = 3;
                while (formatter.FormatCellValue(_sheet.GetRow(rowIndex).GetCell(0)).ToLower() != "end")
                {
                    IRow curRow = _sheet.GetRow(rowIndex);
                    // Get data from the 4th column (4th cell of each row)
                    DmSINHVIEN objSINHVIEN = new DmSINHVIEN();
                    objSINHVIEN.ID = Guid.NewGuid().ToString();
                    objSINHVIEN.HOVATEN = (formatter.FormatCellValue(curRow.GetCell(1)));
                    objSINHVIEN.NGAYSINH = Convert.ToDateTime(formatter.FormatCellValue(curRow.GetCell(2)));
                    objSINHVIEN.GIOITINH = Convert.ToInt32((formatter.FormatCellValue(curRow.GetCell(3))) == "Nam" ? 1 : 0);
                    objSINHVIEN.DIACHI = formatter.FormatCellValue(curRow.GetCell(4));
                    objSINHVIEN.SDT = formatter.FormatCellValue(curRow.GetCell(5));
                    objSINHVIEN.EMAIL = formatter.FormatCellValue(curRow.GetCell(6));
                    objSINHVIEN.LOPID = getIdLopHoc(formatter.FormatCellValue(curRow.GetCell(7)));

                    dapSINHVIEN.Add(objSINHVIEN);
                    rowIndex++;
                }
            }
        }

        #region Thiết lập cell
        void SetCellVal(IRow rowTemp, ICellStyle CellStyle, int intCell, string strCellVal, double doublCell = 0)
        {
            ICell tmpCell = rowTemp.GetCell(intCell);
            if (tmpCell == null)
                tmpCell = rowTemp.CreateCell(intCell);
            if (!string.IsNullOrEmpty(strCellVal))
                tmpCell.SetCellValue(strCellVal);
            else
                tmpCell.SetCellValue(doublCell);
            tmpCell.CellStyle = CellStyle;
        }
        #endregion

        private HSSFCellStyle xsSetStyle(HSSFCellStyle setStyle, short Color, NPOI.SS.UserModel.BorderStyle Border)
        {
            setStyle.Alignment = NPOI.SS.UserModel.HorizontalAlignment.Center;
            setStyle.FillForegroundColor = Color;
            setStyle.FillPattern = FillPattern.SolidForeground;
            setStyle.BorderBottom = Border;
            setStyle.BorderRight = NPOI.SS.UserModel.BorderStyle.Thin;

            return setStyle;
        }

        private void ImportChamCongNormal(IRow worksheetRow, int j, List<KETQUACHAMCONGEntities> listKetQuaChamCong, int i, HSSFSheet sheet, int rowIndex)
        {
            //In ra giờ đến
            worksheetRow.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIODEN) ? "" : listKetQuaChamCong[i].GIODEN);
            IRow rowIndexGioRa = sheet.GetRow(rowIndex + 1);
            //In ra giờ về
            rowIndexGioRa.GetCell(j).SetCellValue(string.IsNullOrEmpty(listKetQuaChamCong[i].GIORA) ? "" : listKetQuaChamCong[i].GIORA);
        }

        private string getIdLopHoc(string Lop)
        {
            string LopHoc = dapLOPHOC.getById(Lop);
            return LopHoc;
        }

        protected void RenderMessage<T>(T _object)
        {
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                oSerializer.MaxJsonLength = Int32.MaxValue;
                string strJsonMessage = oSerializer.Serialize(_object);
                this.Page.Response.Clear();
                this.Page.Response.ContentType = "application/json";
                this.Page.Response.Write(strJsonMessage);
                this.Page.Response.End();
            }
            catch { }
        }

        public string getJson<T>(List<T> _lstObject)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            return serializer.Serialize(_lstObject);
        }

    }

    public class JEntity
    {
        public JEntity() { Erros = true; }

        public string ID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string jsonData { get; set; }
        public bool Erros { get; set; }
        public string Message { get; set; }

    }
}