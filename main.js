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
                isbn:10,
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
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete ">X</a></td>

        `;

        list.appendChild(row);
    }

    static deleteBook (el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        
        document.querySelector('title').value= '';
        document.querySelector('author').value= '';
        document.querySelector('isbn').value= '';
    }
}
// Store Class: Handles Storage

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn  = document.querySelector('#isbn').value;

    // Instatiate book
    const book = new Book(title,author,isbn);

    // Add book to UI
    UI.addBookToList(book);

    UI.clearFields();
});
// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {

UI.deleteBook(e.target);

});


