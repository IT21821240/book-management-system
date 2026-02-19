import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { Book } from './models/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book Management App';
  books: Book[] = [];
  newBook: Book = { id: 0, title: '', author: '', isbn: '', publicationDate: new Date() };

  editingBookId: number | null = null;
  editedBook: Book = { id: 0, title: '', author: '', isbn: '', publicationDate: new Date() };

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error(err)
    });
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author || !this.newBook.isbn) return;
    if (new Date(this.newBook.publicationDate) > new Date()) {
      alert('Publication date cannot be in the future.');
      return;
    }

    this.newBook.title = this.newBook.title.trim();
    this.newBook.author = this.newBook.author.trim();
    this.newBook.isbn = this.newBook.isbn.trim();

    this.bookService.addBook(this.newBook).subscribe({
      next: (book) => {
        this.books.push(book);
        this.newBook = { id: 0, title: '', author: '', isbn: '', publicationDate: new Date() };
      },
      error: (err) => console.error(err)
    });
  }

  editBook(book: Book) {
    this.editingBookId = book.id;
    this.editedBook = { ...book };
  }

  saveBook() {
    if (!this.editedBook.title || !this.editedBook.author || !this.editedBook.isbn) return;
    if (new Date(this.editedBook.publicationDate) > new Date()) {
      alert('Publication date cannot be in the future.');
      return;
    }

    this.editedBook.title = this.editedBook.title.trim();
    this.editedBook.author = this.editedBook.author.trim();
    this.editedBook.isbn = this.editedBook.isbn.trim();

    if (this.editingBookId !== null) {
      this.bookService.updateBook(this.editingBookId, this.editedBook).subscribe({
        next: () => {
          const index = this.books.findIndex(b => b.id === this.editingBookId);
          if (index > -1) this.books[index] = { ...this.editedBook };
          this.cancelEdit();
        },
        error: (err) => console.error(err)
      });
    }
  }

  cancelEdit() {
    this.editingBookId = null;
    this.editedBook = { id: 0, title: '', author: '', isbn: '', publicationDate: new Date() };
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.books = this.books.filter(b => b.id !== id),
      error: (err) => console.error(err)
    });
  }
}
