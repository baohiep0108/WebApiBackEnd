using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using ProjectFunctionalTesting.ViewModel;
using WebApi.Helper;
using WebApi.Model;
using WebApiShopCart.Model;

namespace ProjectFunctionalTesting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public CartController(ApplicationDBContext context)
        {
           
            _context = context;
        }

        public const string CARTKEY = "cart";

        List<CartItem> GetCartItems()
        {
            var session = HttpContext.Session;
            string jsoncart = session.GetString(CARTKEY);
            if (jsoncart != null)
            {
                return JsonConvert.DeserializeObject<List<CartItem>>(jsoncart);
            }
            return new List<CartItem>();
        }

        void ClearCart()
        {
            var session = HttpContext.Session;
            session.Remove(CARTKEY);
        }
        void SaveCartSession(List<CartItem> ls)
        {
            var session = HttpContext.Session;
            string jsoncart = JsonConvert.SerializeObject(ls);
            session.SetString(CARTKEY, jsoncart);
        }

        [HttpPost]
        [Route("Add-Cart/{productid}")] 
        public IActionResult AddToCart(int productid)
        {
            var product = _context.Products
                .FirstOrDefault(p => p.ProductId == productid);

            if (product == null)
                return NotFound("Không có sản phẩm");

            var cart = GetCartItems();
            var cartitem = cart.Find(p => p.Products.ProductId == productid);
            if (cartitem != null)
            {
                cartitem.quantity++;
            }
            else
            {
                cart.Add(new CartItem() { quantity = 1, Products = product });
            }
            SaveCartSession(cart);
            return Ok(cart);
        }
        [HttpPut]
        [Route("up-to-cart")]
        public IActionResult UpdateCart([FromForm] int productid, [FromForm] int quantity)
        {
            var cart = GetCartItems();
            var cartitem = cart.Find(p => p.Products.ProductId == productid);
            if (cartitem != null)
            {
                cartitem.quantity = quantity;
            }
            SaveCartSession(cart);
            return Ok(cart);
        }
        [HttpDelete]
        [Route("Delete-cart/{productid}")]
        public IActionResult RemoveCart(int productid)
        {
            var cart = GetCartItems();
            var cartitem = cart.Find(p => p.Products.ProductId == productid);
            if (cartitem != null)
            {
                cart.Remove(cartitem);
            }
            SaveCartSession(cart);
            return Ok(cart); 
        }
        [HttpDelete]
        [Route("Delete-all-cart")]
        public IActionResult RemoveAllCart()
        {
            HttpContext.Session.Remove(CARTKEY); 
            return NoContent(); 
        }
        [HttpPost]
        [Route("Place-Order")]
        public IActionResult PlaceOrder(string userId)
        {
            try
            {
                var cartItems = GetCartItems();

                if (cartItems.Count == 0)
                {
                    return BadRequest("Giỏ hàng đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
                }

                var order = new Order
                {
                    //OrderDate= DateTime.Now,
                    Status = "Pending",
                    UserId = userId,
                };
                _context.Orders.Add(order);
                _context.SaveChanges();

                foreach (var cartItem in cartItems)
                {
                    var existingOrderDetail = _context.OrderDetails
                        .FirstOrDefault(od => od.OrderId == order.OrderId && od.ProductId == cartItem.Products.ProductId);

                    if (existingOrderDetail != null)
                    {
                        existingOrderDetail.Quantity += cartItem.quantity;
                    }
                    else
                    {
                        var orderDetail = new OrderDetail
                        {
                            Status = "Pending",
                            ProductName = cartItem.Products.ProductName,
                            Price = cartItem.Products.ProductPrice,
                            Quantity = cartItem.quantity,
                            OrderId = order.OrderId,
                            ProductId = (int)cartItem.Products.ProductId,
                        };

                        _context.OrderDetails.Add(orderDetail);
                    }
                }
                _context.SaveChanges();
                ClearCart();
                return Ok("Đặt hàng thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Đặt hàng không thành công: " + ex.Message);
            }
        }





    }
}
