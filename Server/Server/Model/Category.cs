using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Model
{

    public class Category
    {
        [Key]
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; } = string.Empty;
    }
}
