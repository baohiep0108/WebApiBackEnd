using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Model
{

    public class Product
    {
        [Key]
        public int? ProductId { get; set; }
        public string? ProductName { get; set; }
        public int? ProductPrice { get; set; }
        public string? ProductDetails { get; set; }
        public string? Img { get; set; }
        public int? InventorNumber { get; set; }
        public string? Status { get; set; }
        public int? CategoryId { get; set; }
        public virtual Category? Category { get; set; }


    }
}
