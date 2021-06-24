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
    public class BlSaleProducts: BlAbstract<SaleProduct>
    {
        public BlSaleProducts(IMasterPieceDatabaseSettings settings) : base(settings) { }

        private IMongoQuery QueryFilters(FiltersSaleProducts filters)
        {
            var query = new List<IMongoQuery>();

            if (!string.IsNullOrEmpty(filters.Price.ToString()))
                query.Add(Query<SaleProduct>.EQ(x => x.UnitPrice, filters.Price));

            if (!string.IsNullOrEmpty(filters.Name))
                query.Add(Query<SaleProduct>.EQ(x => x.Name, filters.Name));

            if(!string.IsNullOrEmpty(filters.SaleId))
                query.Add(Query<SaleProduct>.EQ(x => x.SaleId, filters.SaleId));

            return Query.And(query);
        }

        public List<SaleProduct> GetProducts(FiltersSaleProducts filters) => Collection.Find(QueryFilters(filters)).ToList();

    }
}
