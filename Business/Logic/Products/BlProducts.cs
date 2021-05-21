using DAO.Databases;
using Repository.Settings;
using System;
using Utils.Extensions.StringExtensions;

namespace Business.Logic.Products
{
    public class BlProducts : BlAbstract<Product>
    {
        public BlProducts(IMasterPieceDatabaseSettings settings) : base(settings) { }

        public override void EntityValidation(Product product)
        {
            if (string.IsNullOrEmpty(product.Name))
                 throw new Exception ("Informe o Nome do Produto!");

            if(product.Type == ProductType.Default)
                throw new Exception("Informe o Tipo do Produto!");

            if (product.Type == ProductType.Donation)
                return;

            if(product.Price == 0)
                throw new Exception("Informe o Preço do Produto!");
        }

        public override void EntitySanitize(Product entity)
        {
            entity.NameWithoutAccents = entity.Name.RemoveCharactersWithAccent();
        }
    }

}

