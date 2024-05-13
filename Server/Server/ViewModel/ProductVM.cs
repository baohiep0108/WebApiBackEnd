namespace WebApi.Data
{
    public class ProductVM
    {
        public string? ProductName { get; set; }
        public int? ProductPrice { get; set; }
        public string? ProductDetails { get; set; }
        public IFormFile? Img { get; set; }
        public int? InventorNumber { get; set; }
        public int? CategoryId { get; set; }
    }
}
