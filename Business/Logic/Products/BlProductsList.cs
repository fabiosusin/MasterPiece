﻿using DAO.Databases;
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

            if (!string.IsNullOrEmpty(filters.ProductName))
                query.Add(Query<Product>.Matches(x => x.NameWithoutAccents, string.Format("(?i).*{0}.*", filters.ProductName)));


            return query.Any() ? Query.And(query) : null;
        }

        public List<Product> GetProducts(FiltersProducts filters)
        {
            var query = QueryFilters(filters);
            return query == null ? Collection.FindAll().ToList() : Collection.Find(query).ToList();
        }
    }
}
