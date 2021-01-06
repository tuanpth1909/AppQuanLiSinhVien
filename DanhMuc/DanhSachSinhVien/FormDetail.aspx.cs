using db_Connect;
using db_Connect.Entities;
using db_Connect.LIB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien
{
    public partial class FormDetail : System.Web.UI.Page
    {
        public DmSINHVIEN objSINHVIEN = new DmSINHVIEN();
        public List<LOPHOCEntities> objLOPHOC = new List<LOPHOCEntities>();
        public List<DmTHETHAO> objTHETHAO = new List<DmTHETHAO>();
        public List<THETHAO_SINHVIEN> lstTHETHAO_SINHVIEN = new List<THETHAO_SINHVIEN>();
        public List<String> lstMONTHETHAO;
        public string doAction = "";
        public string itemId = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            QUANLYSINHVIENEntities dbContext = new QUANLYSINHVIENEntities();
            DmSINHVIENDAP dapSINHVIENDAO = new DmSINHVIENDAP(dbContext);
            DmLOPHOCDAP dapLOPHOCDAO = new DmLOPHOCDAP(dbContext);
            DmTHETHAODAP dapTHETHAODAP = new DmTHETHAODAP(dbContext);
            THETHAO_SINHVIENDAP dapTHETHAO_SINHVIEN = new THETHAO_SINHVIENDAP(dbContext);
            doAction = !string.IsNullOrEmpty(Request["do"]) ? Request["do"].ToString() : "";
            itemId = !string.IsNullOrEmpty(Request["itemid"]) ? Request["itemid"].ToString() : "";
            if (itemId.Length > 0)
            {
                objSINHVIEN = dapSINHVIENDAO.GetById(itemId);
            }
            objLOPHOC.AddRange(dapLOPHOCDAO.getListAll());
            objTHETHAO.AddRange(dapTHETHAODAP.GetListAll());
            lstTHETHAO_SINHVIEN = dapTHETHAO_SINHVIEN.GetById(itemId);
            lstMONTHETHAO = lstTHETHAO_SINHVIEN.Select(x => x.THETHAOID).ToList();

        }
    }
}