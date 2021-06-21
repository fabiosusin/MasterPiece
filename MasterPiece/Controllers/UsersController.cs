using Business.Logic.Users;
using Business.Services;
using DAO.Databases;
using DAO.Input;
using DAO.Output;
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

        [HttpPost, Route("Create"), AllowAnonymous]
        public IActionResult Create([FromBody] User user)
        {
            _ = _blUsers.Add(user);
            return Ok(new SaveUserOutput
            {
                User = user,
                Token = TokenService.GenerateToken(user)
            });
        }

        [HttpPost, Route("Login"), AllowAnonymous]
        public IActionResult Login([FromBody] LoginInput user) => Ok(_blUsers.Login(user));
    }
}
