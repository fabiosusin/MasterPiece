using DAO.Databases;
using Repository.Settings;
using System.Collections.Generic;
using DAO.Output;
using DAO.Input;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Text.RegularExpressions;
using Business.Services.Exceptions;
using Repository.Extensions;

namespace Business.Logic.Products
{
    public class BlCategories : BlAbstract<Category>
    {

        protected BlProductsList BlProductsList;
        protected BlSaleProducts BlSaleProducts;
        public BlCategories(IMasterPieceDatabaseSettings settings) : base(settings)
        {
            BlProductsList = new BlProductsList(settings);
            BlSaleProducts = new BlSaleProducts(settings);
        }

        public override void EntityValidation(Category category)
        {
            if (category == null)
                throw new ValidationResponseException("Ocorreu um erro ao enviar os dados para o Servidor!");

            if (string.IsNullOrEmpty(category.Name))
                throw new ValidationResponseException("Informe o nome da Categoria!");

            if(Collection.FindOne(Query.And(Query<Category>.EQ(x => x.Name, category.Name), Query<Category>.NE(x => x.Id, category.Id))) != null)
                throw new ValidationResponseException("Ja existe uma categoria com este nome");
        }

        public void CategoriesMigration(CategoryMigrationInput input)
        {
            if (string.IsNullOrEmpty(input?.NewCategoryId) || string.IsNullOrEmpty(input?.OldCategoryId))
                throw new ValidationResponseException("Ocorreu um erro ao enviar os dados para o Servidor!");

            var newCategory = Collection.FindById(input.NewCategoryId);
            if (newCategory == null)
                throw new ValidationResponseException("A categoria de destino não foi encontrada!");

            MongoDatabase.GetCollection<Product>().Update(Query<Product>.EQ(x => x.CategoryId, input.OldCategoryId), Update<Product>.Set(x => x.CategoryId, input.NewCategoryId));
            Collection.RemoveById(input.OldCategoryId);
        }

        public IEnumerable<Category> List(FiltersCategories filters) => Collection.Find(QueryFilters(filters));

        public IEnumerable<ProductCategoryOutput> GetCategories(FiltersCategories filters)
        {
            var result = List(filters)?.Select(x => new ProductCategoryOutput { Id = x.Id, Name = x.Name, ImageUrl = GetCategoryimage(x.Id), QuantityProductSold = GetQuantitySoldItem(x.Id), Products = BlProductsList.GetProducts(new FiltersProducts { CategoryId = x.Id }).Count() });

            if (filters?.MinItems.HasValue ?? false && filters.MinItems.Value > 0)
                result = result.Where(x => x.Products >= filters.MinItems.Value);

            if (filters?.MinSoldItems.HasValue ?? false && filters.MinSoldItems.Value > 0)
                result = result.Where(x => x.QuantityProductSold >= filters.MinSoldItems.Value);

            return result;
        }

        private string GetCategoryimage(string categoryId) => BlProductsList.GetProducts(new FiltersProducts { CategoryId = categoryId, HasPicture = true, Limit = 1 })?.FirstOrDefault()?.Image.GetImage(ListResolutionsSize.Url512, FileType.Jpeg);

        private long GetQuantitySoldItem(string id) => BlSaleProducts.GetProducts(new FiltersSaleProducts { CategoryId = id })?.Count ?? 0;

        private static IMongoQuery QueryFilters(FiltersCategories filters)
        {
            if (filters == null)
                return Query.And(Query.Empty);

            var list = new List<IMongoQuery>();
            if (!string.IsNullOrEmpty(filters.Id))
                return Query<Category>.EQ(x => x.Id, filters.Id);

            if (!string.IsNullOrEmpty(filters.Name))
                return Query<Category>.Matches(x => x.Name, $"(?i).*{string.Join(".*", Regex.Split(filters.Name, @"\s+").Select(x => Regex.Escape(x)))}.*");

            if (!list.Any())
                return Query.And(Query.Empty);

            return Query.And(list);
        }
    }

}

