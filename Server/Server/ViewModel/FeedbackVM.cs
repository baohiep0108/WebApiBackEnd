using System.ComponentModel.DataAnnotations;
using WebApi.Model;

namespace Server.ViewModel
{
    public class FeedbackVM
    {   
        [Required(ErrorMessage = "Start is required")]
        [Range(1, 5, ErrorMessage = "Start must be between 1 and 5.")]
        public int? Start { get; set; }
        [Required(ErrorMessage = "Comment is required")]
        [StringLength(500, ErrorMessage = "Comment must not exceed 500 characters.")]
        public string? Comment { get; set; }
    }
}

