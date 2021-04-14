using Business.Logic.Users;
using DAO.Databases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Settings;

namespace MasterPiece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly BlUsers _blUsers;
        public UsersController(IMasterPieceDatabaseSettings settings)
        {
            _blUsers = new BlUsers(settings);
        }

        [HttpPost, Route("Save"), AllowAnonymous]
        public IActionResult Delete([FromBody] User user)
        {
            _blUsers.Add(user);
            return Ok();
        }
    }
}
