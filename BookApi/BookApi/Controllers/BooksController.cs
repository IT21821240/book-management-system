using Microsoft.AspNetCore.Mvc;
using BookApi.Models;

namespace BookApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private static List<Book> books = new List<Book>();
        private static int nextId = 1;

        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return Ok(books);
        }

        [HttpPost]
        public ActionResult<Book> AddBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (book.PublicationDate > DateTime.Today)
                return BadRequest("Publication date cannot be in the future.");

            book.Id = nextId++;
            books.Add(book);
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (updatedBook.PublicationDate > DateTime.Today)
                return BadRequest("Publication date cannot be in the future.");

            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return NotFound();

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Isbn = updatedBook.Isbn;
            book.PublicationDate = updatedBook.PublicationDate;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = books.FirstOrDefault(b => b.Id == id);
            if (book == null)
                return NotFound();

            books.Remove(book);
            return NoContent();
        }
    }
}
