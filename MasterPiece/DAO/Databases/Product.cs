using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAO.Databases
{
    public class Product : Base
    {
        public Product ProductName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public double TotalValue { get; set; }
        public double UnityValue { get; set; }
        public double Balance { get; set; }
    }
}


