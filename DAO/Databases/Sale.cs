namespace DAO.Databases
{
    public class Sale : Base
    {
        public string UserId { get; set; }
        public decimal Total { get; set; }
        public Address Destination { get; set; }
    }
}


