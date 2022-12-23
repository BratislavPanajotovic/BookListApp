// Book class: Represents a Book
class Book {
    constructor(title, author, isbn) {  // Sta je constructor, sta radi this. ?
      this.title = title;
      this.author = author;
      this.isbn = isbn;   
    }
}
// UI Class: Handle UI Tasks
class UI {
    static displayBooks() { // Sta je static , sta je => ?
       
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) { // UI kreacija knjige

        const list = document.querySelector('#book-list'); // Konstanta 'list' i selektovali smo listu sa id-em 'book-list' ;

        const row = document.createElement('tr'); // Zasto smo kreirali 'tr' ?

                                                         /* Pretpostavljam da u red dodajemo ono sto iscitavamo iz innerHTML-a , preko 
                                                         book.title(author,isbn) => sto ne znam sta predstavlja?*/
        row.innerHTML = `    
        
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete ">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {  /* Ako elemenat iz classList(?) sadrzi 'delete' izbrisi parent elemenat parent elementa*/ 
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`; /*Sta radi ovaj dolar fckn? */
        div.appendChild(document.createTextNode(message)); /*Div-u dodeljujemo message kao child */
        const container = document.querySelector('.container'); 
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 3 sec
        setTimeout(()=> document.querySelector('.alert').remove(),3000);
    }

    static clearFields(){
        
        document.querySelector('#title').value= '';
        document.querySelector('#author').value= '';
        document.querySelector('#isbn').value= '';
    }
}
// Store Class: Handles Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }


    static removeBook(isbn){
        const out = isbn.toLocalString();
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn == isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn  = document.querySelector('#isbn').value;

    // Validate
if(title == '' || author=='' || isbn=='' ){
    UI.showAlert("Please fill in all fields",'danger');
} else {
    // Instatiate book
    const book = new Book(title,author,isbn);

    // Add book to UI
    UI.addBookToList(book);
    // Add book to store
    Store.addBook(book);
    // Show succes message
    UI.showAlert('Book Added', 'success');
    // Clear fields
    UI.clearFields();
}

});
// Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {

UI.deleteBook(e.target);

Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

// Show success message
UI.showAlert('Book Removed', 'danger');

});


