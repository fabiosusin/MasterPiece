using DAO.Input;
using MongoDB.Bson.Serialization.Attributes;

namespace DAO.Databases
{
    public class Product : Base
    {
        public string Name { get; set; }
        public string NameWithoutAccents { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public ImageFormat Image { get; set; }
        public decimal Price { get; set; }
        public decimal Balance { get; set; }
        public ProductType Type { get; set; }

        [BsonIgnore]
        public string ImageUrl { get; set; }
        [BsonIgnore]
        public string PictureBase64 { get; set; }
    }

    public class Image
    {
        public string Webp{ get; set; }
    }

    public enum ProductType
    {
        Default,
        Donation,
        ForSale
    }
}


