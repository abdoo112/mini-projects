const library = [];

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    library.push(newBook);
}

const container = document.querySelector('.container');

function render(){
    container.innerHTML = '';
    
    library.forEach(book => {
        const bookCard = document .createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.id = book.id;
        
        bookCard.innerHTML = `
            <div class="name">
                <p><b>NAME:</b> ${book.title}</p>
            </div>
            <div class="author">
                <p><b>AUTHOR:</b> ${book.author}</p>
            </div>
            <div class="pages">
                <p><b>PAGES:</b> ${book.pages}</p>
            </div>
            <div class="status">
                <p><b>STATUS:</b> ${book.status}</p>
            </div>
            <div class = 'buttons'>
                <button class="delete-button">Delete</button>
                <button class="toggle-status-button">Toggle Status</button>
            </div>
        `;

        container.appendChild(bookCard);
    });
}

Book.prototype.toggleStatus = function () {
  this.status = this.status === "read" ? "unread" : "read";
};

container.addEventListener('click', (event) => {
  const card = event.target.closest('.book-card');
  if (!card) return;

  const id = card.dataset.id;

  const index = library.findIndex(b => b.id === id);

  if (event.target.classList.contains('delete-button')) {
    library.splice(index, 1);
    render();
  }
  if (event.target.classList.contains('toggle-status-button')) {
    library[index].toggleStatus();
    render();
  }
});

const dialog = document.getElementById('add-book-dialog');
const addBookBtn = document.querySelector('.add-book-btn');

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});
const form = document.getElementById('add-book-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = Number(document.getElementById('book-pages').value);
    const status = document.getElementById('book-status').value;

    addBookToLibrary(title, author, pages, status);
    render();

    form.reset();
    dialog.close();
});

// Sample books to demonstrate functionality
addBookToLibrary("1984", "George Orwell", 328, "read");
addBookToLibrary("Animal Farm", "George Orwell", 112, "unread");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "read");
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, "unread");
addBookToLibrary("Dune", "Frank Herbert", 412, "read");
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, "unread");
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 194, "read");
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, "unread");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "read");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "unread");
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, "read");
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, "unread");
addBookToLibrary("Brave New World", "Aldous Huxley", 311, "read");
addBookToLibrary("The Book Thief", "Markus Zusak", 560, "unread");
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, "read");
addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, "unread");
addBookToLibrary("Slaughterhouse-Five", "Kurt Vonnegut", 275, "read");
addBookToLibrary("The Road", "Cormac McCarthy", 287, "unread");
addBookToLibrary("Frankenstein", "Mary Shelley", 280, "read");
addBookToLibrary("Moby-Dick", "Herman Melville", 635, "unread");
render();
render();