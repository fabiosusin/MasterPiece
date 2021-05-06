using DAO.Databases;
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

            if (Validation.IsCpf(user.Cpf))
                throw new Exception("CPF inválido!");

            if (user.Address?.ZipCode > 0 && Validation.IsValidZipCode(user.Address.ZipCode))
                throw new Exception("CEP inválido!");

            if (!Validation.IsValidEmail(user.Email))
                throw new Exception("Email inválido!");
        }
    }
}
