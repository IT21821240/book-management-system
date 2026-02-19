using System;
using System.ComponentModel.DataAnnotations;

namespace BookApi.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Title must be 2-100 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Author is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Author must be 2-100 characters")]
        public string Author { get; set; }

        [Required(ErrorMessage = "ISBN is required")]
        [RegularExpression(@"^\d{10,13}$", ErrorMessage = "ISBN must be 10-13 digits")]
        public string Isbn { get; set; }

        [Required(ErrorMessage = "Publication date is required")]
        [DataType(DataType.Date)]
        public DateTime PublicationDate { get; set; }
    }
}
