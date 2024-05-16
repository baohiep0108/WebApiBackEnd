using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Model;
using System.Security.Claims;
using WebApi.Helper;

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
        public IActionResult ShowCart()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();
            var cartItems = _context.CartItems
                .Include(c => c.Products) 
                .Where(c => c.UserEmailAddress == userEmail)
                .ToList();

           
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
                cartItem = new CartItem { UserEmailAddress = userEmail, ProductId = productid, Quantity = 1, Products = product };
                _context.CartItems.Add(cartItem);
            }
            _context.SaveChanges();
            return Ok(cartItem);
        }

            [HttpPut]
            [Route("Update-Cart")]
            public IActionResult UpdateCart(int productid, int quantity)
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

       
    }
}
