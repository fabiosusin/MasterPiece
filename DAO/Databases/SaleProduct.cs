﻿namespace DAO.Databases
{
    public class SaleProduct : Base
    {
        public string Name { get; set; }
        public string SaleId { get; set; }
        public string CategoryId { get; set; }
        public string ProductId{ get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}


