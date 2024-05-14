using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model;
using System.Security.Claims;
using WebApi.Helper;
using WebApi.Model;
using WebApiShopCart.Model;

namespace ProjectFunctionalTesting.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDBContext _context;


        public CartController(ApplicationDBContext context)
        {

            _context = context;
          
        }
        [HttpGet]
        [Route("Show-cart")]
        public async Task<IActionResult> ShowCart()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var cartItems = await _context.CartItems.Where(p => p.UserEmailAddress == userEmail).ToListAsync();
            return Ok(cartItems);
        }


        [HttpPost]
        [Route("Add-Cart/{productid}")]
        public IActionResult AddToCart(int productid)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var product = _context.Products.FirstOrDefault(p => p.ProductId == productid);
            if (product == null)
                return NotFound("Không có sản phẩm");
            var cartItem = _context.CartItems.FirstOrDefault(c => c.UserEmailAddress == userEmail && c.ProductId == productid);
            if (cartItem != null)
            {
                cartItem.Quantity++;
            }
            else
            {
                cartItem = new CartItem { UserEmailAddress = userEmail, ProductId = productid, Quantity = 1, Product = product };
                _context.CartItems.Add(cartItem);
            }
            _context.SaveChanges();
            return Ok(cartItem);
        }

        [HttpPut]
        [Route("Update-Cart")]
        public IActionResult UpdateCart([FromForm] int productid, [FromForm] int quantity)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var cartItem = _context.CartItems.FirstOrDefault(c => c.UserEmailAddress == userEmail && c.ProductId == productid);
            if (cartItem != null)
            {
                cartItem.Quantity = quantity;
                _context.SaveChanges();
                return Ok(cartItem);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("Delete-Cart/{productid}")]
        public IActionResult RemoveCart(int productid)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var cartItem = _context.CartItems.FirstOrDefault(c => c.UserEmailAddress == userEmail && c.ProductId == productid);
            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("Delete-All-Cart")]
        public IActionResult RemoveAllCart()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var cartItems = _context.CartItems.Where(c => c.UserEmailAddress == userEmail).ToList();
            _context.CartItems.RemoveRange(cartItems);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPost]
        [Route("Place-Order")]
        public async Task<IActionResult> PlaceOrder()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var cartItems = _context.CartItems.Where(c => c.UserEmailAddress == userEmail).ToList();
            if (cartItems.Count == 0)
            {
                return BadRequest("Giỏ hàng đang trống. Thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
            }
            var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
            var order = new Order
            {
                Status = "Pending",
                OrderDate = DateTime.Now.ToString(),
                UserId = userid,
               
            };
            _context.Orders.Add(order);
            _context.SaveChanges();


            foreach (var cartItem in cartItems)
            {
                var product = await _context.Products.Where(c => c.ProductId == cartItem.ProductId).FirstOrDefaultAsync();
                var orderDetail = new OrderDetail
                {
                    Status = "Pending",
                    ProductName = product.ProductName,
                    Price = cartItem.Product.ProductPrice,
                    Quantity = cartItem.Quantity,
                    OrderId = order.OrderId,
                    ProductId = cartItem.ProductId,
                };
                _context.OrderDetails.Add(orderDetail);
                _context.CartItems.Remove(cartItem);
            }
            _context.SaveChanges();
            return Ok("Đặt hàng thành công");
        }
    }
}
