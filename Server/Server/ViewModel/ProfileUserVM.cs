using System.ComponentModel.DataAnnotations;

namespace ProjectFunctionalTesting.ViewModel
{
    public class ProfileUserVM
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? UserName { get; set; }
        [Required(ErrorMessage = "Email Name is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Gender is required")]
        public string? Gender { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string? Address { get; set; }
        [Required(ErrorMessage = "Date of Birth is required")]
        public string? DateOfBirth { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? PhoneNumber { get; set; }
    }
}
