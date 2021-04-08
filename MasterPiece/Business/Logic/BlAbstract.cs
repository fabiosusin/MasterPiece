using MongoDB.Driver;
using Repository.DbConnection;
using Repository.Extensions;
using Repository.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
