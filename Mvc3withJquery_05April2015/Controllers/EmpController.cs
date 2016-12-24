using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Mvc3withJquery_05April2015.EF;

namespace Mvc3withJquery_05April2015.Controllers
{
    public class EmpController : Controller
    {
        //
        // GET: /Emp/
        AbhiEntities db;
        public EmpController()
        {
            db = new AbhiEntities();
        }
        public ActionResult Index()
        {
            return View();
        }
        [OutputCache(Duration = 0)]
        public JsonResult GetEmployee()
        {
            return Json(db.Employees.ToList(), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult AddEmployee(Employee Emp)
        {
            db.Employees.Add(Emp);
            db.SaveChanges();
            return Json("Record has Inserted.", JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteEmployee(int EmpId)
        {
            Employee Emp =db.Employees.First(em=>em.EmpId==EmpId);
            db.Employees.Remove(Emp);
            db.SaveChanges();
            return Json("Record has Deleted.", JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateEmployee(Employee Emp)
        {
           Employee emp =db.Employees.First(em=>em.EmpId==Emp.EmpId);
           emp.EmpName = Emp.EmpName;
           emp.EmpSalary = Emp.EmpSalary;
            db.SaveChanges();
            return Json("Record has Updated.", JsonRequestBehavior.AllowGet);
        }

    }
}
