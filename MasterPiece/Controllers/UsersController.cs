using Business.Logic.Users;
using DAO.Databases;
using DAO.Input;
using DAO.Output;
using MasterPiece.Services;
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
            _blUsers.Add(user);
            return Ok(new SaveUserOutput
            {
                User = user,
                Token = TokenService.GenerateToken(user)
            });
        }

        [HttpPost, Route("Login"), AllowAnonymous]
        public IActionResult Login([FromBody] LoginInput user)
        {
            return Ok(new
            {
                Logged = _blUsers.Login(user),
                Success = true
            });
        }
    }
}
