// Book class: Represents a Book
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author=author;
      this.isbn=isbn;   
    }
}
// UI Class: Handle UI Taskas
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book 1' ,
                author: 'Baki',
                isbn: 10 ,

            },
            {
                title: 'Book 2',
                author:'Isidorakis',
                isbn:'10',
            }
        ]
        const books = StoredBooks;

        books.forEach((book)=> UI.addBookToList(book));

    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        
        <td>${book.title}</td>
        <td>${book.title}</td>
        <td>${book.title}</td>
        <td><a href="#" class=:btn btn-danger btn-sm delete">X</a></td>

        `;

        list.appendChild(row);
    }
}
// Store Class: Handles Storage

// Event: Display books
document.addEventListener("DOMContentLoaded", UI.deisplayBooks);

// Event: Add a book
document.querySelector('book-form').addEventListener('submit', (e)=> {
    // Get form values
    const title = document.querySelector('title').value;
    const author = document.querySelector('author').value;
    const isbn  = document.querySelector('isbn').value;

    // Instatiate book
    cnost book = new Book(title,author,isbn);

    // Add book to UI
    UI.addBookToList(book);
});
// Event: Remove a book
