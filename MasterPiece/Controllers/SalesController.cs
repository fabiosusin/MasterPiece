using Business.Logic.Sales;
using Business.Logic.Users;
using Business.Services;
using DAO.Databases;
using DAO.Input;
using DAO.Input.Filters;
using DAO.Output;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Settings;

namespace MasterPiece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {

        private readonly BlSales _blSales;
        public SalesController(IMasterPieceDatabaseSettings settings)
        {
            _blSales = new BlSales(settings);
        }

        //[HttpPost, Route("create")]
        //public IActionResult Create([FromBody] SaleInput input) => Ok(_blSales.Create(input));
    }
}
