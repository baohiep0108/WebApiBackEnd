using System.ComponentModel.DataAnnotations;
using WebApi.Model;

namespace Server.Model
{
    public class Feedback
    {
        [Key]   
        public int? FeedBackId { get; set; }
        public string? userName { get; set; }
        public int? Start {  get; set; }
        public string? Comment { get; set; }
        public int? ProductId { get; set; }
        public virtual Product Product { get; set; }
    }
}
