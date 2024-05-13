using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Model;
using WebApi.Repository.Interfaces;
namespace WebApi.Controllers
{

    [Route("api/[controller]")]
        [ApiController]
        public class CategoryController : ControllerBase
        {
            private readonly IBaseRepository<Category> _categoryRepository;

            public CategoryController(IBaseRepository<Category> categoryRepository)
            {
                _categoryRepository = categoryRepository;
            }
       
        [HttpGet]
        [Route("Index")]
        public async Task<IActionResult> GetAllCateroryAsync()
        {
            var allCategories = await _categoryRepository.FindAllAsync().ToListAsync();
            if (allCategories == null || !allCategories.Any())
            {
                return NotFound("No categories found.");
            }
            
            return Ok(allCategories);
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _categoryRepository.FindByIdAsync(c => c.CategoryId == id).FirstOrDefaultAsync();
            if (category == null)
            {
                return NotFound("Category not found.");
            }


            return Ok(category);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            var categoryCheck = await _categoryRepository.FindByIdAsync(c => c.CategoryName == category.CategoryName).FirstOrDefaultAsync();

            if (categoryCheck != null)
            {
                return BadRequest("Category already exists");
            }
            else
            {
                var newCategory = new Category { CategoryName = category.CategoryName };
                await _categoryRepository.CreateAsync(newCategory);
                return Ok(newCategory);
            }
        }


        [HttpPut("Edit/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            try
            {
                var categoryToUpdate = await _categoryRepository.FindByIdAsync(c => c.CategoryId == id).FirstOrDefaultAsync();
                if (categoryToUpdate == null)
                {
                    return NotFound("Category not found.");
                }

                categoryToUpdate.CategoryName = category.CategoryName; 

                await _categoryRepository.UpAsync(categoryToUpdate); 

                return Ok(); 
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update category: " + ex.Message); 
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
           
                var categoryToDelete = await _categoryRepository.FindByIdAsync(c => c.CategoryId == id).FirstOrDefaultAsync();
                if (categoryToDelete == null)
                {
                    return NotFound("Category not found.");
                }
                await _categoryRepository.DeleteAsync(categoryToDelete);
                return Ok();
        }
    }

}
