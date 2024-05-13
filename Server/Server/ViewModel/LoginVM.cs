using System.ComponentModel.DataAnnotations;

namespace ProjectFunctionalTesting.Authentication
{
    public class LoginVM
    {
        [Required(ErrorMessage = "Email Name is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
