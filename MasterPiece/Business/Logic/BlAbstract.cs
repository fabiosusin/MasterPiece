using DAO.Databases;
using MongoDB.Driver;
using Repository.DbConnection;
using Repository.Settings;

namespace Business.Logic
{
    public class BlAbstract<TEntity>
        where TEntity : IBase
    {
        public MongoDatabase MongoDatabase;
        protected MongoCollection<TEntity> Collection { get; }
        public BlAbstract(IMasterPieceDatabaseSettings settings)
        {
            MongoDatabase = new DbAccess(settings).MongoDatabase;
            Collection = MongoDatabase.GetCollection<TEntity>();
        }

        public virtual void EntityValidation(TEntity entity) { }

        public virtual void Add(TEntity entity)
        {
            MongoDatabase.GetCollection<TEntity>().Add(entity);
        }
    }
}
