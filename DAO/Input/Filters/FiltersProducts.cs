namespace DAO.Input
{
    public class FiltersProducts
    {
        public string ProductName { get; set; }
        public string UserId { get; set; }
        public string ProductId { get; set; }
        public bool HasPicture { get; set; }
        public decimal Price { get; set; }
        public string CategoryId { get; set; }

        // Ajuste de pesquisa, como limite de resultado e ordenações
        public int Limit { get; set; }
        public int Page { get; set; }
        public OrderBy OrderBy { get; set; }
    }

    public class OrderBy
    {
        public bool BestSeller { get; set; }
        public bool MostCategoryItems { get; set; }
    }
}
