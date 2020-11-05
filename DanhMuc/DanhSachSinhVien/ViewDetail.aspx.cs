using db_Connect;
using db_Connect.Entities;
using db_Connect.LIB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace AppQuanLiSinhVien.DanhMuc.DanhSachSinhVien
{
    public partial class ViewDetail : System.Web.UI.Page
    {
        public DmSINHVIEN objSINHVIEN = new DmSINHVIEN();
        public List<LOPHOCEntities> objLOPHOC = new List<LOPHOCEntities>();
        public string itemId = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            QUANLYSINHVIENEntities dbContext = new QUANLYSINHVIENEntities();
            DmSINHVIENDAP dapSINHVIEN = new DmSINHVIENDAP(dbContext);
            DmLOPHOCDAP dapLOPHOCDAO = new DmLOPHOCDAP(dbContext);
            itemId = !string.IsNullOrEmpty(Request["itemid"]) ? Request["itemid"].ToString() : "";
            if (itemId.Length > 0)
            {
                objSINHVIEN = dapSINHVIEN.GetById(itemId);
            };
            objLOPHOC.AddRange(dapLOPHOCDAO.getAll());
        }
    }
}