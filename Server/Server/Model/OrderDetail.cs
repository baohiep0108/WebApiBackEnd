using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Model;

namespace WebApiShopCart.Model
{
    [Table("OrderDetail")]
    public class OrderDetail
    {
        public string? Status { get; set; }
        public string? ProductName { get; set; }
        public int? Price { get; set; }
        public int? Quantity { get; set; }
        public int? OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order? Order { get; set; }
        public int? ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Products { get; set; }

    }

}
