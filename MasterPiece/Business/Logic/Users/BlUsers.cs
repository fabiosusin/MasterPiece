using DAO.Databases;
using Repository.Extensions;
using Repository.Settings;

namespace Business.Logic.Users
{
    public class BlUsers : BlAbstract
    {
        public BlUsers(IMasterPieceDatabaseSettings settings) : base (settings)
        {

        }

        public void Add(User user)
        {
            MongoDatabase.GetCollection<User>().Add(user);
        }
    }
}
