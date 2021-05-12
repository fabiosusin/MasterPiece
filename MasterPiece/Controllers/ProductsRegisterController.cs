using Business.Logic.Products;
using DAO.Databases;
using DAO.Output;
using MasterPiece.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterPiece.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsRegisterController : ControllerBase
    {
        private readonly BlProducts _blProducts;
        public ProductsRegisterController(IMasterPieceDatabaseSettings settings)
        {
            _blProducts = new BlProducts(settings);
        }
       
        [HttpPost, Route("Create")]
        public IActionResult Create([FromBody] Product product)
        {
            _blProducts.Add(product);
            
            return Ok(product);
            
        }
    }
}

