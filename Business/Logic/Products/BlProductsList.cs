using DAO.Databases;
using DAO.Input;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Repository.Settings;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

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
            if (!string.IsNullOrEmpty(filters.CategoryId))
                query.Add(Query<Product>.EQ(x => x.CategoryId, filters.CategoryId));

            if (filters.HasPicture)
                query.Add(Query<Product>.NE(x => x.Image, null));

            if (filters.Price > 0)
                query.Add(Query<Product>.EQ(x => x.Price, filters.Price));

            if (!string.IsNullOrEmpty(filters.ProductName))
                query.Add(Query<Product>.Matches(x => x.Name, $"(?i).*{string.Join(".*", Regex.Split(filters.ProductName, @"\s+").Select(x => Regex.Escape(x)))}.*"));

            if (!query.Any())
                return Query.And(Query.Empty);

            return Query.And(query);
        }

        public List<Product> List(FiltersProducts filters)
        {
            var products = GetProducts(filters).ToList();
            if (!(products?.Any() ?? false))
                return null;

            products.ForEach(x => x.AuxiliaryProperties.ImageUrl = x.Image?.GetImage(ListResolutionsSize.Url512, FileType.Jpeg));
            return products;
        }

        public IEnumerable<Product> GetProducts(FiltersProducts filters) => filters.Limit > 0 ?  Collection.Find(QueryFilters(filters)).SetLimit(filters.Limit) : Collection.Find(QueryFilters(filters));

        
    }
}
