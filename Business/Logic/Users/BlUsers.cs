using Business.Services;
using DAO.Databases;
using DAO.Input;
using DAO.Output;
using MongoDB.Driver.Builders;
using Repository.Extensions;
using Repository.Settings;
using System;
using Utils.Extensions.Validations;

namespace Business.Logic.Users
{
    public class BlUsers : BlAbstract<User>
    {
        public BlUsers(IMasterPieceDatabaseSettings settings) : base(settings) { }

        public override void EntityValidation(User user)
        {
            if (user.Password != user.ConfirmPassword)
                throw new Exception("Senhas não coincidem!");

            if (StringExtension.IsCpf(user.Cpf))
                throw new Exception("CPF inválido!");

            if (user.Address?.ZipCode > 0 && StringExtension.IsValidZipCode(user.Address.ZipCode))
                throw new Exception("CEP inválido!");

            if (!StringExtension.IsValidEmail(user.Email))
                throw new Exception("Email inválido!");
        }

        public SaveUserOutput Login(LoginInput login)
        {
            if (string.IsNullOrEmpty(login?.Email) || string.IsNullOrEmpty(login?.Password))
                return null;

            var user = MongoDatabase.GetCollection<User>().FindOne(Query.And(
                Query<User>.EQ(x => x.Email, login.Email),
                Query<User>.EQ(x => x.Password, login.Password)));
            if (user == null)
                return null;


            return new SaveUserOutput
            {
                User = user,
                Token = TokenService.GenerateToken(user)
            };
        }
    }
}
