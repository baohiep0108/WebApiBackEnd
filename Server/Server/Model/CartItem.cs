using WebApi.Model;

namespace Server.Model
{
    public class CartItem
    {
        public int Id { get; set; }
        public string UserEmailAddress { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public Product Product { get; set; }
    }
}
