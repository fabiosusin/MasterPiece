using Business.Logic.Products;
using Business.Services.Exceptions;
using DAO.Databases;
using DAO.Input;
using Repository.Settings;
using System.Collections.Generic;
using System.Linq;
using static Business.Logic.Products.BlSaleProducts;

namespace Business.Logic.Sales
{
    public class BlSales : BlAbstract<Sale>
    {
        protected BlProductsList BlProductsList;
        protected BlSaleProducts BlSaleProducts;
        public BlSales(IMasterPieceDatabaseSettings settings) : base(settings)
        {
            BlProductsList = new BlProductsList(settings);
            BlSaleProducts = new BlSaleProducts(settings);
        }

        public void SaveSaleValidation(SaleInput sale)
        {
            if (sale == null)
                throw new ValidationResponseException("Ocorreu um erro ao enviar os dados pro Servidor!");

            if (sale.InvalidAddress())
                throw new ValidationResponseException("Ajuste seus dados de endereço");

            var invalidProducts = BlProductsList.GetProducts(new FiltersProducts { Ids = sale.ProductsId, InvalidStatus = new List<ProductStatus> { ProductStatus.Invalid, ProductStatus.Sold } });
            if (invalidProducts?.Any() ?? false)
                throw new ValidationResponseException($"Os produtos {string.Join(',', invalidProducts.Select(x => x.Name))} se encontram inválidos para venda");

        }

        public decimal GetSaleTotal(List<string> ids)
        {
            var products = BlProductsList.GetProducts(new FiltersProducts { Ids = ids });
            return !(products?.Any() ?? false) ? 0 : products.Sum(x => x.Price);
        }

        public void Create(SaleInput input)
        {
            SaveSaleValidation(input);
            var sale = Save(new Sale { Destination = input.Destination, UserId = input.UserId, Total = GetSaleTotal(input.ProductsId) });
            BlSaleProducts.SaveProducts(new SaveSaleProductsInput { SaleId = sale.Id, ProductsId = input.ProductsId });
        }
    }
}
