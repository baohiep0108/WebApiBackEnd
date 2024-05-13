using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectFunctionalTesting.Service;
using ProjectFunctionalTesting.ViewModel;
using WebApi.Helper;
using WebApi.Model;
using WebApi.Repository.Interfaces;


namespace ProjectFunctionalTesting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
     
        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;       
        }
        [HttpPut]
        [Route("UpdateProfile/{id}")]
        public async Task<IActionResult> UpdateProfile(string id, ProfileUserVM model) 
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }
                user.UserName = model.UserName;
                user.Email = model.Email;
                user.Address = model.Address;
                user.Gender = model.Gender;
                user.DateOfBirth = model.DateOfBirth;
                user.PhoneNumber = model.PhoneNumber;
                user.PasswordHash = model.Password;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update category: " + ex.Message);

            }
        }
        [HttpPut]
        [Route("UpImg-Profile/{id}")]
        public async Task<IActionResult> UpImg(ImgUpProfileVM model) 
        {
            try
            {
                var user = await _userManager.FindByIdAsync(model.id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }
                string imagePath = await UploadImg.UploadImageAsync(model.Img, "Profile");
                user.ImgProfile = imagePath;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update category: " + ex.Message);

            }
        }
        [HttpGet]
        [Route("GetImage")]
        public IActionResult GetUser(string name)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Img", "Profile", name);
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }
            return PhysicalFile(imagePath, "image/jpeg");
        }
    }
}
