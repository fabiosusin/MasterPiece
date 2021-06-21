namespace DAO.Input
{
    public class FiltersProducts
    {
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }

        // Ajuste de pesquisa, como limite de resultado e ordenações
        public int Limit { get; set; }
        public OrderBy OrderBy { get; set; }
    }

    public class OrderBy
    {
        public bool BestSeller { get; set; }
        public bool MostCategoryItems { get; set; }
    }
}
