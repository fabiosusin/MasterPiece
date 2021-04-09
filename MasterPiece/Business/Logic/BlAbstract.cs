using MongoDB.Driver;
using Repository.DbConnection;
using Repository.Settings;

namespace Business.Logic
{
    public class BlAbstract
    {
        public MongoDatabase MongoDatabase;
        public BlAbstract(IMasterPieceDatabaseSettings settings)
        {
            MongoDatabase = new DbAccess(settings).MongoDatabase;
        }
    }
}
