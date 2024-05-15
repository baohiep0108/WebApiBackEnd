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
        //[HttpGet]
        //[Route("Show-order")]
        //public IActionResult ShowOrder()
        //{
        //    var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
        //    if (userid == null)
        //        return Unauthorized();
        //    var order= _context.Orders.Include(x => x.User).Where(p=>p.UserId==userid).FirstOrDefault();
        //    if(order == null) return NotFound();
        //    var orderDetail= _context.OrderDetails.Where(p=>p.OrderId==order.OrderId).FirstOrDefault();
        //    if(orderDetail == null) return NotFound();
        //    var product= _context.Products.Where(p=>p.ProductId==orderDetail.ProductId).FirstOrDefault();
        //    if(product == null) return NotFound();

        //    var oderVM = new OrderVM { 
        //        ProductName = product.ProductName,
        //        OrderDate = order.OrderDate,
        //        Status=order.Status,
        //        ImageProductName= product.Img,
        //        Price= product.ProductPrice,
        //        Quantity= orderDetail.Quantity,
        //    };
        //    return Ok(oderVM);
        //}
        [HttpGet]
        [Route("Show-order")]
        public IActionResult ShowOrder()
        {
            var userid = User.FindFirst(ClaimTypes.Authentication)?.Value;
            if (userid == null)
                return Unauthorized();

            var orders = _context.Orders
                .Include(x => x.User)
                .Where(p => p.UserId == userid)
                .ToList();

            var orderVMs = new List<OrderVM>();
            foreach (var order in orders)
            {
                var orderDetails = _context.OrderDetails
                    .Include(od => od.Product)
                    .Where(od => od.OrderId == order.OrderId)
                    .ToList();

                foreach (var orderDetail in orderDetails)
                {
                    var orderVM = new OrderVM
                    {
                        OrderId = order.OrderId,
                        ProductId = orderDetail.ProductId,
                        ProductName = orderDetail.Product.ProductName,
                        OrderDate = order.OrderDate,
                        Status = order.Status,
                        ImageProductName = orderDetail.Product.Img,
                        Price = orderDetail.Product.ProductPrice,
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
        public IActionResult ShowAllOrders()
        {
            var orders = _context.Orders
                .Include(x => x.User)
                .ToList();

            var orderVMs = new List<OrderVM>();
            foreach (var order in orders)
            {
                var orderDetails = _context.OrderDetails
                    .Include(od => od.Product)
                    .Where(od => od.OrderId == order.OrderId)
                    .ToList();

                foreach (var orderDetail in orderDetails)
                {
                    var orderVM = new OrderVM
                    {
                        OrderId = order.OrderId,
                        ProductId = orderDetail.ProductId,
                        ProductName = orderDetail.Product.ProductName,
                        OrderDate = order.OrderDate,
                        Status = order.Status,
                        ImageProductName = orderDetail.Product.Img,
                        Price = orderDetail.Product.ProductPrice,
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
        [HttpPost]
        [Route("Order-Now")]
        public async Task<IActionResult> OrderNow(int productid)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
            {
                return Unauthorized();
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
            var product = await _context.Products.Where(c => c.ProductId == productid).FirstOrDefaultAsync();
            var orderDetail = new OrderDetail
            {
                Status = "Pending",
                ProductName = product.ProductName,
                Price = product.ProductPrice,
                Quantity = 1,
                OrderId = order.OrderId,
                ProductId = productid,
            };
            _context.OrderDetails.Add(orderDetail);
            _context.SaveChanges();
            return Ok("Đặt hàng thành công");
        }
        [HttpPut]
        [Route("Update-Order-Status")]
        [Authorize(Roles = "Admin")] 
        public IActionResult UpdateOrderStatus(int orderId, string status)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == orderId);
            if (order == null)
                return NotFound("Order not found");
            order.Status = status;
            _context.SaveChanges();
            return Ok("Order status updated successfully");
        }
        [HttpDelete]
        [Route("Delete-Order")]
        public async Task<IActionResult> DeleteOrder(int orderId, int productid)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            if (userEmail == null)
            {
                return Unauthorized();
            }
            var orderDetail = await _context.OrderDetails
                                            .FirstOrDefaultAsync(od => od.OrderId == orderId && od.ProductId == productid);
            if (orderDetail == null)
            {
                return NotFound("Order detail not found");
            }
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
