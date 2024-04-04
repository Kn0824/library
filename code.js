const addBook = document.getElementById("add");

const container = document.querySelector(".container");

let bookArray = [];

const sampleBook = new Book("Sample Book", "Author", 10, true);

bookArray.push(sampleBook);

updateLibrary();

function Book(title, author, pages, read) {
    this.title = title;
    this. author = author;
    this.pages = pages + " pages";
    this.read = read;
}

function changeReadStatus() {
    if(this.classList.contains("read")) {
        this.classList.add("unread");
        this.classList.remove("read");
        this.textContent = "Unread";
    }
    else{
        this.classList.add("read");
        this.classList.remove("unread");
        this.textContent = "Read";
    }
}

function deleteBook() {
    console.log(this);
    console.log(this.value);
    bookArray = bookArray.filter((book) => book.title !== this.value);

    console.log(bookArray);

    updateLibrary();
}

function showPopup() {
    let formPopup = document.getElementById("bookForm");

    formPopup.style.display = "flex";

    let buttons = container.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

}

function closePopup() {
    let formPopup = document.getElementById("bookForm");

    formPopup.style.display = "none";

    let buttons = container.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function bookFormat(bookObject) {
    let newBookObject = document.createElement("div");
    newBookObject.classList.add("book");

    let newBookTitle = document.createElement("div");
    newBookTitle.classList.add("title");
    newBookTitle.textContent = bookObject.title;
    newBookObject.appendChild(newBookTitle);

    let newBookAuthor = document.createElement("div");
    newBookAuthor.classList.add("author");
    newBookAuthor.textContent = bookObject.author;
    newBookObject.appendChild(newBookAuthor);

    let newBookPages = document.createElement("div");
    newBookPages.classList.add("pages");
    newBookPages.textContent = bookObject.pages;
    newBookObject.appendChild(newBookPages);

    let newBookRead = document.createElement("button");
    if(bookObject.read) {
        newBookRead.classList.add("read");
        newBookRead.textContent = "Read";
    }
    else {
        newBookRead.classList.add("unread");
        newBookRead.textContent = "Unread";
    }
    newBookRead.addEventListener("click", changeReadStatus);
    newBookObject.appendChild(newBookRead);

    let newBookDelete = document.createElement("button");
    newBookDelete.classList.add("delete");
    newBookDelete.textContent = "Delete";
    newBookDelete.value = bookObject.title;
    newBookDelete.addEventListener("click", deleteBook);
    newBookObject.appendChild(newBookDelete);


    return newBookObject;
}

function updateLibrary() {
    const library = document.querySelector(".books");

    let existingBooks = library.querySelectorAll(".book");

    for (let i = 0; i < existingBooks.length; i++) {
        library.removeChild(existingBooks[i]);
    }

    for (let j = 0; j < bookArray.length; j++) {
        library.appendChild(bookFormat(bookArray[j]));
    }
}

function createBook(event) {
    event.preventDefault();

    let newTitle = document.getElementById("bookTitle").value;
    let newAuthor = document.getElementById("bookAuthor").value;
    let newPages = document.getElementById("bookPages").value;
    let newRead = document.getElementById("bookRead").checked;

    let newBook = new Book(newTitle, newAuthor, newPages, newRead);

    bookArray.push(newBook);

    updateLibrary();

    myForm.reset();

    closePopup();

}

addBook.addEventListener("click", showPopup);

const myForm = document.getElementById("bookForm");

myForm.onsubmit = createBook;