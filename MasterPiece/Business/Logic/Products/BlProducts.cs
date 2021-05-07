using DAO.Databases;
using Repository.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Utils.Extensions.Validations;

namespace Business.Logic.Products
{
    public class BlProducts : BlAbstract<Product>
    {
        public BlProducts(IMasterPieceDatabaseSettings settings) : base(settings) { }

        public override void EntityValidation(Product product)
        {
            if (product.Name.Trim().Length == 0)
                 throw new Exception ("Nome requerido!");
            
            if (product.Description.Trim().Length == 0)
                throw new Exception("Descrição é requerida!");
        }

        public override void EntitySanitize(Product entity)
        {
            entity.NameWithoutAccents = entity.Name.RemoveCharactersWithAccent();
        }
    }

}

