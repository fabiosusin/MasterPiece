using DAO.Databases;
using Repository.Settings;

namespace Business.Logic.Users
{
    public class BlUsers : BlAbstract<User>
    {
        public BlUsers(IMasterPieceDatabaseSettings settings) : base (settings)
        {

        }
    }
}
