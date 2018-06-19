using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : Controller
    {

        public IActionResult Index()
        {
            TodoListContext context = HttpContext.RequestServices.GetService(typeof(TodoApp.Models.TodoListContext)) as TodoListContext;    
            
            return View(context.GetAllUsers());
            
        }

        [Route("users")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult Users()
        {
            
            TodoListContext context = HttpContext.RequestServices.GetService(typeof(TodoApp.Models.TodoListContext)) as TodoListContext; 
            
            return Json(context.GetAllUsers());
            //return resultJson;


        }

       /* [Route("getusers")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult GetUsers()
        {
            //return Json(_users);
            TodoListContext context = HttpContext.RequestServices.GetService(typeof(TodoApp.Models.TodoListContext)) as TodoListContext; 
            return Json(context.GetAllTheUsers());

        }*/
     
    }

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            TodoListContext context = HttpContext.RequestServices.GetService(typeof(TodoApp.Models.TodoListContext)) as TodoListContext;    
            
            return View(context.GetAllTheUsers());
            
        }

        [Route("getusers")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public ActionResult GetUsers()
        {
            //return Json(_users);
            TodoListContext context = HttpContext.RequestServices.GetService(typeof(TodoApp.Models.TodoListContext)) as TodoListContext; 
            return Json(context.GetAllTheUsers());

        }
    }
    
}