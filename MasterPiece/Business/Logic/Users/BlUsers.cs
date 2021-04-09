using DAO.Databases;
using MongoDB.Driver.Builders;
using Repository.Extensions;
using Repository.Settings;
using System;

namespace Business.Logic.Users
{
    public class BlUsers : BlAbstract
    {
        public BlUsers(IMasterPieceDatabaseSettings settings) : base(settings)
        {

        }

        private void Validate(User user)
        {
            if (user == null)
                throw new Exception("Não foi possível salvar os dados");

            if (string.IsNullOrEmpty(user.Email))
                throw new Exception("Informe o Email");

            if (string.IsNullOrEmpty(user.Password))
                throw new Exception("Informe a Senha");

            if (string.IsNullOrEmpty(user.Cpf))
                throw new Exception("Informe o CPF");

            if (MongoDatabase.GetCollection<User>().FindOne(Query<User>.EQ(x => x.Email, user.Email)) != null)
                throw new Exception("Email em uso");
        }

        public void Add(User user)
        {
            Validate(user);
            MongoDatabase.GetCollection<User>().Add(user);
        }
    }
}
