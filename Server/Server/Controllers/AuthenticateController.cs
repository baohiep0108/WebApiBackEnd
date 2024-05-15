using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjectFunctionalTesting.Authentication;
using ProjectFunctionalTesting.ViewModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi.Helper;

namespace ProjectFunctionalTesting.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;


        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Authentication, user.Id)
                };
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }
        [AllowAnonymous]   
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterVM model)
        {
            var userExists = await userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Email already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

             if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));


            if (await roleManager.RoleExistsAsync(UserRoles.User))
            {
                await userManager.AddToRoleAsync(user, UserRoles.User);
            }
            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterVM model)
        {
            var userExists = await userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Email already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("get-Acc")]
        public async Task<IActionResult> GetAcc()
        {
            var allUsers = await userManager.Users.ToListAsync();

            if (allUsers == null || !allUsers.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(allUsers);
        }
        [HttpGet]
        [Route("get-user")]
        public async Task<IActionResult> GetUser(string user)
        {
            var userRoles = await userManager.GetUsersInRoleAsync(user);

            if (userRoles == null || !userRoles.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(userRoles);
        }
       
        [HttpGet]
        [Route("get-user/{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {   
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("No users found.");
            }
            return Ok(user);
        }
        // đang bị lỗi truyền dữ liệu bên phía frontend
        [HttpPut]
        [Route("update-user/{id}")]
        public async Task<IActionResult> UpdateUser(UserVM model, string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                user.UserName = model.UserName;
                user.Email = model.Email;
                user.Address = model.Address;
                user.PhoneNumber = model.PhoneNumber;

                // Only update the password if a new password is provided
                if (!string.IsNullOrEmpty(model.PasswordHash))
                {
                    var token = await userManager.GeneratePasswordResetTokenAsync(user);
                    var passwordChangeResult = await userManager.ResetPasswordAsync(user, token, model.PasswordHash);
                    if (!passwordChangeResult.Succeeded)
                    {
                        return BadRequest(passwordChangeResult.Errors);
                    }
                }

                var result = await userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update user: " + ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete-user/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return BadRequest();
            }
            await userManager.DeleteAsync(user);
            return Ok();
        }
    }

}
