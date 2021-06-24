using DAO.Databases;
using Repository.Settings;
using System;
using Utils.Extensions.StringExtensions;
using Microsoft.AspNetCore.Hosting;
using Utils.Extensions.Files.Images;
using Business.Services.Exceptions;

namespace Business.Logic.Products
{
    public class BlProducts : BlAbstract<Product>
    {

        public BlProducts(IMasterPieceDatabaseSettings settings) : base(settings) { }

        public override void EntityValidation(Product product)
        {
            if (product == null)
                throw new ValidationResponseException("Ocorreu um erro ao enviar os dados para o servidor!");

            if (string.IsNullOrEmpty(product.Name))
                throw new ValidationResponseException("Informe o Nome do Produto!");

            if (product.Type == ProductType.Default)
                throw new ValidationResponseException("Informe o Tipo do Produto!");

            if (product.Type == ProductType.Donation)
                return;

            if (product.Price == 0)
                throw new ValidationResponseException("Informe o Preço do Produto!");
        }

        public override void EntitySanitize(Product entity)
        {
            entity.Image = SaveImage.SaveListResolutions(entity.PictureBase64);
            entity.NameWithoutAccents = entity.Name.RemoveCharactersWithAccent();
        }

    }

}

