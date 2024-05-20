using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectFunctionalTesting.ViewModel;
using System.Security.Claims;
using WebApi.Helper;
using WebApi.Model;
using WebApiShopCart.Model;

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public OrderController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Show-order")]
        public async Task<IActionResult> ShowOrder()
        {
            var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
            if (userid == null)
                return Unauthorized();

            var orders = await _context.Orders
                .Include(o => o.User)
                .Where(o => o.UserId == userid)
                .ToListAsync();

            var orderVMs = new List<OrderVM>();
            foreach (var order in orders)
            {
                var orderDetails = await _context.OrderDetails
                    .Include(od => od.Products)
                    .Where(od => od.OrderId == order.OrderId)
                    .ToListAsync();

                foreach (var orderDetail in orderDetails)
                {
                    var orderVM = new OrderVM
                    {
                        OrderId = order.OrderId,
                        UserEmail= order.User.UserName,
                        ProductId = orderDetail.ProductId,
                        ProductName = orderDetail.Products.ProductName,
                        OrderDate = order.OrderDate.ToString(),
                        Status = order.Status,
                        ImageProductName = orderDetail.Products.Img,
                        Price = orderDetail.Products.ProductPrice,
                        Quantity = orderDetail.Quantity
                    };
                    orderVMs.Add(orderVM);
                }
            }

            return Ok(orderVMs);
        }

        [HttpGet]
        [Route("Show-all-orders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShowAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .ToListAsync();

            var orderVMs = new List<OrderVM>();
            foreach (var order in orders)
            {
                var orderDetails = await _context.OrderDetails
                    .Include(od => od.Products)
                    .Where(od => od.OrderId == order.OrderId)
                    .ToListAsync();

                foreach (var orderDetail in orderDetails)
                {
                    var orderVM = new OrderVM
                    {
                        OrderId = order.OrderId,
                        UserEmail= order.User.Email,
                        ProductId = orderDetail.ProductId,
                        ProductName = orderDetail.Products.ProductName,
                        OrderDate = order.OrderDate,
                        Status = order.Status,
                        ImageProductName = orderDetail.Products.Img,
                        Price = orderDetail.Products.ProductPrice,
                        Quantity = orderDetail.Quantity
                    };
                    orderVMs.Add(orderVM);
                }
            }

            return Ok(orderVMs);
        }
       

        [HttpPost]
        [Route("Place-Order")]
        public async Task<IActionResult> PlaceOrder()
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var cartItems = await _context.CartItems
                .Where(c => c.UserEmailAddress == userEmail)
                .ToListAsync();

            if (!cartItems.Any())
                return BadRequest("Giỏ hàng đang trống. Thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");

            var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
            var order = new Order
            {
                Status = "Pending",
                OrderDate = DateTime.Now.ToString(),
                UserId = userid
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var cartItem in cartItems)
            {
                var product = await _context.Products.FindAsync(cartItem.ProductId);
                var orderDetail = new OrderDetail
                {
                    Status = "Pending",
                    ProductName = product.ProductName,
                    Price = product.ProductPrice,
                    Quantity = cartItem.Quantity,
                    OrderId = order.OrderId,
                    ProductId = cartItem.ProductId
                };
                _context.OrderDetails.Add(orderDetail);
                _context.CartItems.Remove(cartItem);
            }

            await _context.SaveChangesAsync();
            return Ok("Đặt hàng thành công");
        }

        [HttpPost]
        [Route("Order-Now")]
        public async Task<IActionResult> OrderNow(int productid)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
            var order = new Order
            {
                Status = "Pending",
                OrderDate = DateTime.Now.ToString(),
                UserId = userid
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var product = await _context.Products.FindAsync(productid);
            var orderDetail = new OrderDetail
            {
                Status = "Pending",
                ProductName = product.ProductName,
                Price = product.ProductPrice,
                Quantity = 1,
                OrderId = order.OrderId,
                ProductId = productid
            };
            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();

            return Ok("Order Success");
        }

        [HttpPut]
        [Route("Update-Order-Status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, string status)
        {
            if(status == null)
            {
                return NotFound();
            };
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                return NotFound("Order not found");

            order.Status = status;
            await _context.SaveChangesAsync();
            return Ok("Order status updated successfully");
        }
        [HttpDelete]
        [Route("Delete-Order")]
        public async Task<IActionResult> DeleteOrder(int orderId, int productid)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();

            var orderDetail = await _context.OrderDetails
                .FirstOrDefaultAsync(od => od.OrderId == orderId && od.ProductId == productid);

            if (orderDetail == null)
                return NotFound("Order detail not found");

            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();

            var remainingOrderDetails = await _context.OrderDetails
                .AnyAsync(od => od.OrderId == orderId);

            if (!remainingOrderDetails)
            {
                var order = await _context.Orders.FindAsync(orderId);
                if (order != null)
                {
                    _context.Orders.Remove(order);
                    await _context.SaveChangesAsync();
                }
            }

            return Ok("Order deleted successfully");
        }
    }
}
