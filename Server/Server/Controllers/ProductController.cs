using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectFunctionalTesting.Service;
using WebApi.Data;
using WebApi.Model;
using WebApi.Repository.Interfaces;

namespace ProjectFunctionalTesting.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBaseRepository<Product> _productRepository;
        private readonly IBaseRepository<Category> _categoryRepository;

        public ProductController(IBaseRepository<Product> productRepository, IMapper mapper, IBaseRepository<Category> categoryRepository)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }
        [HttpGet]
        [Route("Index")]
        public async Task<IActionResult> GetAllProduct()
        {
            var allProducts = await _productRepository.FindAllAsync()
                .Include(p => p.Category)
                .ToListAsync();

            if (allProducts == null || !allProducts.Any())
                return NotFound("No products found.");
            var productDTOs = allProducts.Select(p => new
            {
                p.ProductId,
                p.ProductName,
                p.ProductPrice,
                p.ProductDetails,
                p.Img,
                p.InventorNumber,
                CategoryName = p.Category?.CategoryName ?? "Unknown"
            });
            return Ok(productDTOs);
        }
        [HttpGet]
        [Route("GetProduct-By-Category/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var allProducts = await _productRepository.FindAllAsync()
            .Where(p => p.CategoryId == id)
            .Select(p => p)
            .Take(10)
            .ToListAsync();
            return Ok(allProducts);
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productRepository.FindByIdAsync(p => p.ProductId == id).FirstOrDefault();

            if (product == null)
            {
                return NotFound("Product not found.");
            }
            return Ok(product);
        }
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateProduct(ProductVM products)
        {
            try
            {
                var productCheck = await _productRepository.FindByIdAsync(p => p.ProductName == products.ProductName).FirstOrDefaultAsync();
                if (productCheck != null)
                {
                    return BadRequest("Product already exists.");
                }

                var category = await _categoryRepository.FindByIdAsync(c => c.CategoryId == products.CategoryId).FirstOrDefaultAsync();
                if (category == null)
                {
                    return BadRequest("Category does not exist.");
                }

                string imagePath = await UploadImg.UploadImageAsync(products.Img, "Product");
                var productNew = _mapper.Map<Product>(products);
                productNew.CategoryId = category.CategoryId;
                productNew.Img = imagePath;
                await _productRepository.CreateAsync(productNew);

                return Ok(productNew);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to create product: " + ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("GetImage")]
        public IActionResult GetProduct(string name)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Img", "Product", name);
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }
            return PhysicalFile(imagePath, "image/jpeg");
        }
       
        [HttpPut]
        [Route("Update/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductVM product)
        {
            try
            {
                var productcheck = await _productRepository.FindByIdAsync(p => p.ProductId == id).FirstOrDefaultAsync();

                if (productcheck == null)
                {
                    return BadRequest("Product not found with the given id: " + id);
                }
                var category = await _categoryRepository.FindByIdAsync(c => c.CategoryId == product.CategoryId).FirstOrDefaultAsync();
                if (category == null)
                {
                    return BadRequest("Category does not exist.");
                }
                var productNew = _mapper.Map<Product>(product);
                if (product.Img !=null)
                {
                    string imagePath = await UploadImg.UploadImageAsync(product.Img, "Product");
                    productNew.Img = imagePath;
                }
                else
                {
                    productNew.Img = productcheck.Img;
                }
                productNew.CategoryId = product.CategoryId;           
                await _productRepository.UpAsync(productNew);
                return Ok(productNew);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update product: " + ex.Message);
            }

        }
        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var product = await _productRepository.FindByIdAsync(p => p.ProductId == id).FirstOrDefaultAsync();
                if (product == null)
                {
                    return NotFound("Product not found.");
                }

                await _productRepository.DeleteAsync(product);

                return Ok("Product deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to delete product: " + ex.Message);
            }
        }
    }
}
