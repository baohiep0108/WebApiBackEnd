using Microsoft.AspNetCore.Identity;
using WebApi.Model;

namespace WebApi.Helper
{
    public class ApplicationUser : IdentityUser
    {

        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; } 
        public string? ImgProfile { get; set; }
        public virtual ICollection<Order>?Orders { get; set; }
    }
}
