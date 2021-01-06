using db_Connect;
using db_Connect.Entities;
using db_Connect.LIB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien
{
    public partial class ViewDetail : System.Web.UI.Page
    {
        public DmSINHVIEN objSINHVIEN = new DmSINHVIEN();
        public List<LOPHOCEntities> objLOPHOC = new List<LOPHOCEntities>();
        public List<THETHAO_SINHVIEN> lstTHETHAO_SINHVIEN = new List<THETHAO_SINHVIEN>();
        public List<String> lstTUan;
        public string itemId = "";
        public string lstTHETHAO = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            QUANLYSINHVIENEntities dbContext = new QUANLYSINHVIENEntities();
            DmSINHVIENDAP dapSINHVIEN = new DmSINHVIENDAP(dbContext);
            DmLOPHOCDAP dapLOPHOCDAO = new DmLOPHOCDAP(dbContext);
            THETHAO_SINHVIENDAP dapTHETHAO_SINHVIEN = new THETHAO_SINHVIENDAP(dbContext);
            itemId = !string.IsNullOrEmpty(Request["itemid"]) ? Request["itemid"].ToString() : "";
            if (itemId.Length > 0)
            {
                objSINHVIEN = dapSINHVIEN.GetById(itemId);
            };
            objLOPHOC.AddRange(dapLOPHOCDAO.getListAll());
            lstTHETHAO_SINHVIEN = dapTHETHAO_SINHVIEN.GetById(itemId);

            if (lstTHETHAO_SINHVIEN.Count() > 0)
            {
                foreach (var itemTT in lstTHETHAO_SINHVIEN)
                {
                    lstTHETHAO += itemTT.TENTHETHAO + " ,";
                }
                lstTHETHAO = lstTHETHAO.Substring(0, lstTHETHAO.Length - 1);
            }
            else
            {
                
            }
           
        }
    }

}