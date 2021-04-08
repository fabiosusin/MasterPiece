using DAO.Databases;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Controllers
{
    public class UsersController : Controller
    {
        [HttpPost, Route("Save")]
        public IActionResult Delete([FromBody] User user)
        {
            return Ok();
        }
    }
}
