
using Business.Logic.Products;
using DAO.Input;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Repository.Settings;
using System;
using System.Collections.ObjectModel;

namespace MasterPiece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly BlProductsList _blProductsList;
        public ProductsController(IMasterPieceDatabaseSettings settings)
        {
            _blProductsList = new BlProductsList(settings);
        }

        [HttpPost, Route("List")]
        public IActionResult List([FromBody] FiltersProducts filtersproduct)
        {
            var products = _blProductsList.GetProducts(filtersproduct);
            return Ok(products);
        }
    }
}
