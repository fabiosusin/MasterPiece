using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO.Databases
{
    public class Product : Base
    {
        public string Name { get; set; }
        public string NameWithoutAccents { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public decimal Balance { get; set; }
        public ProductType Type { get; set; }
    }
    public enum ProductType
    {
        Default,
        Donation,
        ForSale
    }
}


