using DAO.Databases;
using Repository.Extensions;
using Repository.Settings;
using System;

namespace Business.Logic.Users
{
    public class BlUsers : BlAbstract<User>
    {
        public BlUsers(IMasterPieceDatabaseSettings settings) : base(settings)
        {

        }
    }
}
