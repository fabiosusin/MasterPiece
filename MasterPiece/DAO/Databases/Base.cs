using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DAO.Databases
{
    public class Base
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id{ get; set; }
    }
}
