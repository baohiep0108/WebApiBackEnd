using System.ComponentModel.DataAnnotations;
using WebApi.Helper;
using WebApiShopCart.Model;

namespace WebApi.Model
{

    public class Order
    {

        [Key]
        public int OrderId { get; set; } 
        public string? OrderDate { get; set; }
        public string? Status { get; set; }
        public string? UserId { get; set; }
        public virtual ApplicationUser? User { get; set; }
    }
}
