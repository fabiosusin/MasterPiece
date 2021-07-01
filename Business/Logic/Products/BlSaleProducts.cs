using Business.Logic.Sales;
using DAO.Databases;
using DAO.Input;
using DAO.Output;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Repository.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Logic.Products
{
    public class BlSaleProducts : BlAbstract<SaleProduct>
    {
        protected BlSales BlSales;
        protected BlProductsList BlProductsList;
        public BlSaleProducts(IMasterPieceDatabaseSettings settings) : base(settings)
        {
            BlProductsList = new BlProductsList(settings);
            BlSales = new BlSales(settings);
        }

        private IMongoQuery QueryFilters(FiltersSaleProducts filters)
        {
            var query = new List<IMongoQuery>();

            if (!string.IsNullOrEmpty(filters.Price.ToString()))
                query.Add(Query<SaleProduct>.EQ(x => x.Price, filters.Price));

            if (!string.IsNullOrEmpty(filters.Name))
                query.Add(Query<SaleProduct>.EQ(x => x.Name, filters.Name));

            if (!string.IsNullOrEmpty(filters.SaleId))
                query.Add(Query<SaleProduct>.EQ(x => x.SaleId, filters.SaleId));

            if (!string.IsNullOrEmpty(filters.Id))
                query.Add(Query<SaleProduct>.EQ(x => x.ProductId, filters.Id));

            return Query.And(query);
        }

        public List<SaleProduct> GetProducts(FiltersSaleProducts filters) => Collection.Find(QueryFilters(filters)).ToList();

        public void SaveProducts(SaveSaleProductsInput input)
        {
            if (string.IsNullOrEmpty(input?.SaleId))
                return;

            var products = BlProductsList.GetProducts(new FiltersProducts { Ids = input.ProductsId });
            if(!(products?.Any()??false))
            {
                BlSales.Delete(BlSales.GetById(input.SaleId));
                return;
            }

            foreach(var product in products)
            {
                product.Status = ProductStatus.Sold;
                BlProductsList.Save(product);

                Save(new SaleProduct
                {
                    CategoryId = product.CategoryId,
                    Name = product.Name,
                    Price = product.Price,
                    Balance = product.Balance,
                    ProductId = product.Id,
                    SaleId = input.SaleId
                });
            }
        }

        public class SaveSaleProductsInput
        {
            public string SaleId { get; set; }
            public List<string> ProductsId { get; set; }
        }
    }
}
