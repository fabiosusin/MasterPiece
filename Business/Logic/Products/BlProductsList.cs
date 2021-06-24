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
    public class BlProductsList : BlAbstract<Product>
    {
        protected BlSaleProducts BlSaleProducts;
        public BlProductsList(IMasterPieceDatabaseSettings settings) : base(settings)
        {
            BlSaleProducts = new BlSaleProducts(settings);
        }

        private IMongoQuery QueryFilters(FiltersProducts filters)
        {
            var query = new List<IMongoQuery>();
            if (!string.IsNullOrEmpty(filters.Category))
                query.Add(Query<Product>.EQ(x => x.Category, filters.Category));

            if (filters.Price > 0)
                query.Add(Query<Product>.EQ(x => x.Price, filters.Price));

            if (!string.IsNullOrEmpty(filters.ProductName))
                query.Add(Query<Product>.EQ(x => x.Name, filters.ProductName));

            if (!query.Any())
                return Query.And(Query.Empty);

            return Query.And(query);
        }

        public List<Product> List(FiltersProducts filters)
        {
            var products = GetProducts(filters).ToList();
            if (!(products?.Any() ?? false))
                return null;

            products.ForEach(x => x.ImageUrl = x.Image?.GetImage(ListResolutionsSize.Url512, FileType.Jpeg));
            return products;
        }
        
        public IEnumerable<ProductCategoryOutput> GetProductCategories(FiltersProducts filters) => GetProducts(filters).GroupBy(x => x.Category).Select(x => new ProductCategoryOutput { Name = x.Key, ImageUrl = GetCategoryimage(x.ToList()), Products = x.Count(), QuantityProductSold = x.Sum(y => GetQuantitySoldItem(y.Id)) });

        private IEnumerable<Product> GetProducts(FiltersProducts filters) => filters.Limit > 0 ?  Collection.Find(QueryFilters(filters)).SetLimit(filters.Limit) : Collection.Find(QueryFilters(filters));

        private long GetQuantitySoldItem(string id) => BlSaleProducts.GetProducts(new FiltersSaleProducts { Id = id })?.Count ?? 0;

        private string GetCategoryimage(List<Product> products)
        {
            if (!(products?.Any() ?? false))
                return null;

            return products.FirstOrDefault(x => x.Image != null)?.Image.GetImage(ListResolutionsSize.Url512, FileType.Jpeg);
        }
    }
}