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
    public partial class ActionHandler : System.Web.UI.Page
    {
        string doAction = "";//Hành động được thực hiện sau khi xảy ra event
        string itemId = "";//Truyền Id khi thực hiện hành động
        string search = "";
        string searchDanhMuc = "";
        JEntity jMessage = new JEntity();//Khởi tạp đối tượng thông báo lỗi
        QUANLYSINHVIENEntities dbContext;//Khai báo đối tượng db
        DmSINHVIENDAP dapSINHVIEN;//Khai báo bảng cần tương tác
        DmTHETHAODAP dapTHETHAO;

        //Function thực hiện hành động sau khi được click
        public void Page_Load(object sender, EventArgs e)
        {
            dbContext = new QUANLYSINHVIENEntities();
            dapSINHVIEN = new DmSINHVIENDAP(dbContext);
            dapTHETHAO = new DmTHETHAODAP(dbContext);
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
                case "search":
                    Search();
                    break;
                case "loaddata":
                    LoadGridData();
                    break;
            }
            RenderMessage(jMessage);
        }

        public void LoadGridData()
        {
            List<SINHVIENEntities> lsmSINHVIEN = dapSINHVIEN.GetPaged(1,15);
            jMessage.jsonData = getJson(lsmSINHVIEN);
            jMessage.Erros = false;
        }

        private void Add()
        {
            List<DmTHETHAO> lstDmTheThao = dapTHETHAO.GetListAll();
            DmSINHVIEN objSINHVIEN = new DmSINHVIEN();
            objSINHVIEN.ID = Guid.NewGuid().ToString();
            objSINHVIEN.HOVATEN = Request["txtName"].ToString();
            objSINHVIEN.NGAYSINH = Convert.ToDateTime(Request["txtDate"].ToString());
            objSINHVIEN.GIOITINH = Int32.Parse(Request["rdoSex"]);
            objSINHVIEN.SDT = Request["txtTel"].ToString();
            objSINHVIEN.EMAIL = Request["txtEmail"].ToString();
            objSINHVIEN.LOPID = Request["ddlClasses"].ToString();
            objSINHVIEN.DIACHI = Request["txtAddress"].ToString();
            objSINHVIEN.TT_CANHAN = Request["txtPersonal"].ToString();
            //objSINHVIEN.THETHAOID = Request["chkSport"].ToString();

            foreach (var item in lstDmTheThao)
            {
                string value = "chk" + item.ID;
                if (Request[value] != null)
                {
                    objSINHVIEN.THETHAOID = item.ID;
                    objSINHVIEN.ARRTHETHAOID += Request[value] == "1" ? item.ID + " " : "";
                }

            }

            dapSINHVIEN.Add(objSINHVIEN);
            dapSINHVIEN.Save();
            jMessage.Erros = false;
        }

        public void Delete()
        {
            dapSINHVIEN.Delete(itemId);
        }

        public void Edit()
        {
            List<DmTHETHAO> lstDmTheThao = dapTHETHAO.GetListAll();
            

            DmSINHVIEN objSINHVIEN = dapSINHVIEN.GetById(itemId);
            objSINHVIEN.HOVATEN = Request["txtName"].ToString();
            objSINHVIEN.NGAYSINH = Convert.ToDateTime(Request["txtDate"].ToString());
            objSINHVIEN.GIOITINH = Int32.Parse(Request["rdoSex"]);
            objSINHVIEN.SDT = Request["txtTel"].ToString();
            objSINHVIEN.EMAIL = Request["txtEmail"].ToString();
            objSINHVIEN.LOPID = Request["ddlClasses"].ToString();
            objSINHVIEN.DIACHI = Request["txtAddress"].ToString();
            objSINHVIEN.TT_CANHAN = Request["txtPersonal"].ToString();

            foreach (var item in lstDmTheThao)
            {
                string value = "chk" + item.ID;
                if (Request[value] != null)
                {
                    objSINHVIEN.THETHAOID = item.ID;
                    objSINHVIEN.ARRTHETHAOID += Request[value] == "1" ? item.ID + " " : "";
                }

            }

            dapSINHVIEN.Save();
            jMessage.Erros = false;
  
        }

        public void Search()
        {
            
            List<SINHVIENEntities> lsmSINHVIEN = dapSINHVIEN.GetSearch(1, 15, searchDanhMuc, search);
            jMessage.jsonData = getJson(lsmSINHVIEN);
            jMessage.Erros = false;
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