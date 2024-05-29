using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectFunctionalTesting.ViewModel;
using Server.ViewModel;
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

            if (orders == null)
                return Unauthorized();

            var orderVMs = new List<OrderVM>();
            foreach (var order in orders)
            {
                var orderDetails = await _context.OrderDetails
                    .Where(o => o.OrderId == order.OrderId)
                    .ToListAsync();

                var totalPrice = orderDetails.Sum(od => od.Price); 

                var orderVM = new OrderVM
                {
                    OrderId = order.OrderId,
                    UserEmail = order.User.UserName,
                    OrderDate = order.OrderDate.ToString(),
                    Status = order.Status,
                    Price = totalPrice 
                };

                orderVMs.Add(orderVM);
            }
            return Ok(orderVMs);
        }
        [HttpGet]
        [Route("Show-Order-Details/{id}")]
        public async Task<IActionResult> ShowOrdersDetails(int id)
        {

            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();
            var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
            if (userid == null)
                return Unauthorized();

            var order = await _context.Orders
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.UserId == userid && o.OrderId == id);

            if (order == null)
                return Unauthorized();

            var orderDetails = await _context.OrderDetails
                .Include(od => od.Products)
                .Where(od => od.OrderId == id)
                .ToListAsync();

            if (orderDetails == null || !orderDetails.Any())
                return NotFound();

            var orderDetailsList = new List<OrderDetailVM>();

            foreach (var orderDetail in orderDetails)
            {
                var orderDetailVM = new OrderDetailVM
                {
                    OrderId = orderDetail.OrderId,
                    Status = orderDetail.Status,
                    Price = orderDetail.Price,
                    ProductId = orderDetail.ProductId,
                    ProductName = orderDetail.Products?.ProductName,
                    OrderDate = order.OrderDate,
                    ImgProduct = orderDetail.Products?.Img,
                    Quantity = orderDetail.Quantity,
                    Email= userEmail
                };

                orderDetailsList.Add(orderDetailVM);
            }
            return Ok(orderDetailsList);
        }
        [HttpGet]
        [Route("Show-all-orders")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ShowAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .ToListAsync();
            if (orders == null || !orders.Any())
                return NotFound();
            var allOrdersList = new List<OrderVM>();
            foreach (var order in orders)
            {
                var orderDetails = await _context.OrderDetails
                    .Where(od => od.OrderId == order.OrderId)
                    .ToListAsync();
                var totalPrice = orderDetails.Sum(od => od.Price);
                var orderVM = new OrderVM
                {
                    OrderId = order.OrderId,
                    UserEmail = order.User.Email,
                    OrderDate = order.OrderDate,
                    Status = order.Status,
                    Price = totalPrice
                };
                allOrdersList.Add(orderVM);
            }

            return Ok(allOrdersList);
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
        [Route("Delete-Order/{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
                return Unauthorized();
            var orderDetails = await _context.OrderDetails
                .Where(od => od.OrderId == id)
                .ToListAsync();
            if (!orderDetails.Any())
                return NotFound("Order details not found");        
            _context.OrderDetails.RemoveRange(orderDetails);
            await _context.SaveChangesAsync();
            var remainingOrderDetails = await _context.OrderDetails
                .AnyAsync(od => od.OrderId == id);
            if (!remainingOrderDetails)
            {
                var order = await _context.Orders.FindAsync(id);
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
