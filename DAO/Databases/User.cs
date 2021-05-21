using MongoDB.Bson.Serialization.Attributes;

namespace DAO.Databases
{
    public class User : Base
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public Address Address { get; set; }

        [BsonIgnore]
        public string ConfirmPassword { get; set; }
    }

    public class Address
    {
        public string ZipCode { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Neighborhood { get; set; }
        public string Number { get; set; }
        public string Street { get; set; }
    }
}
