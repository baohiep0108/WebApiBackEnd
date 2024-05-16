using System.ComponentModel.DataAnnotations;
using WebApi.Model;

namespace Server.Model
{
    public class CartItem
    {
        [Key]
        public int? Id { get; set; }
        public string? UserEmailAddress { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public Product? Products { get; set; }
    }
}
