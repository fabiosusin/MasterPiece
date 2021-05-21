using DAO.Databases;
using DAO.Input;
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
        public BlProductsList(IMasterPieceDatabaseSettings settings) : base(settings) { }

        private IMongoQuery QueryFilters(FiltersProducts filters)
        {
            var query = new List<IMongoQuery>();
            if (!string.IsNullOrEmpty(filters.Category))
                query.Add(Query<Product>.EQ(x => x.Category, filters.Category));

            if (!string.IsNullOrEmpty(filters.Price.ToString()))
                query.Add(Query<Product>.EQ(x => x.Price, filters.Price));

            if (!string.IsNullOrEmpty(filters.ProductName))
                query.Add(Query<Product>.EQ(x => x.Name, filters.ProductName));


            return Query.And(query);
        }

        public List<Product> GetProducts(FiltersProducts filters) => Collection.Find(QueryFilters(filters)).ToList();
    }
}
