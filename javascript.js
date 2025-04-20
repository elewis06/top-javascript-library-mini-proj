const myLibrary = [];
const addBookButton = document.querySelector("#addBookButton");
const addBookModal = document.querySelector("#addBookModal");
const closeModalButton = document.querySelector("#closeModalButton");
const addBookForm = document.querySelector("#addBookForm");
const booksDisplay = document.querySelector("#booksContainer");

function Book(id, author, title, numPages, isRead) {
    if (!new.target) {
        console.log("This is an object constructor. Must use 'new' prior to call.");
    }
    this.id = id;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

function displayBooks() {
    const bookContainerElement = document.querySelector("#booksContainer");
    bookContainerElement.innerHTML = '';
    for (const book of myLibrary) {
        const bookTitleElement = document.createElement("p");
        bookTitleElement.textContent = book.title;

        const bookAuthorElement = document.createElement("p");
        bookAuthorElement.textContent = book.author;

        const bookNumPagesElement = document.createElement("p");
        bookNumPagesElement.textContent = book.numPages;

        const bookReadStatusElement = document.createElement("p");
        bookReadStatusElement.textContent = book.isRead ? "Read" : "Not Read";

        bookContainerElement.appendChild(bookTitleElement);
        bookContainerElement.appendChild(bookAuthorElement);
        bookContainerElement.appendChild(bookNumPagesElement);
        bookContainerElement.appendChild(bookReadStatusElement);
    }
}

function displayBooksTable() {
    const tableHeadAuthorCell = document.createElement("th");
    tableHeadAuthorCell.textContent = "Author";

    const tableHeadTitleCell = document.createElement("th");
    tableHeadTitleCell.textContent = "Title";

    const tableHeadPageCell = document.createElement("th");
    tableHeadPageCell.textContent = "Page Count";

    const tableHeadReadCell = document.createElement("th");
    tableHeadReadCell.textContent = "Have Read";

    const tableHeadActionCell = document.createElement("th");
    tableHeadActionCell.textContent = "Action";

    const tableHeadRow = document.createElement("tr");
    tableHeadRow.appendChild(tableHeadAuthorCell);
    tableHeadRow.appendChild(tableHeadTitleCell);
    tableHeadRow.appendChild(tableHeadPageCell);
    tableHeadRow.appendChild(tableHeadReadCell);
    tableHeadRow.appendChild(tableHeadActionCell);

    const tableElement = document.createElement("table");
    tableElement.appendChild(tableHeadRow);

    for (const book of myLibrary) {
        const bookTitleCell = document.createElement("td");
        bookTitleCell.textContent = book.title;

        const bookAuthorCell = document.createElement("td");
        bookAuthorCell.textContent = book.author;

        const bookNumPagesCell = document.createElement("td");
        bookNumPagesCell.textContent = book.numPages;

        const bookReadStatusCell = document.createElement("td");
        bookReadStatusCell.textContent = book.isRead ? "Yes" : "No";

        const deleteBookButton = document.createElement("button");
        deleteBookButton.textContent = "Delete";
        deleteBookButton.setAttribute("id", `deleteBook${book.id}`);
        deleteBookButton.addEventListener('click', (e) => {
            const buttonID = e.target.id;
            const bookID = buttonID.substring(10);
            // console.log(buttonID);
            // console.log(bookID);
            for (const [i, book] of myLibrary.entries()) {
                if (book.id === bookID) {
                    // console.log(`FOUND: ${book.id}`);
                    myLibrary.splice(i, 1);
                }
            }
            displayBooksTable();
        });
        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = book.isRead ? "Mark not read" : "Mark read";
        toggleReadButton.setAttribute("id", `markAsRead${book.id}`);
        toggleReadButton.addEventListener('click', (e) => {
            const buttonID = e.target.id;
            const bookID = buttonID.substring(10);
            // console.log(buttonID);
            // console.log(bookID);
            for (const [i, book] of myLibrary.entries()) {
                if (book.id === bookID) {
                    // console.log(`FOUND: ${book.id}`);
                    book.isRead = book.isRead === true ? false : true;
                    e.target.innerText = book.isRead === true ? "Mark not read" : "Mark read";
                }
            }
            displayBooksTable();
        });

        const actionButtonCell = document.createElement("td");
        actionButtonCell.appendChild(deleteBookButton);
        actionButtonCell.appendChild(toggleReadButton);
        

        const tableBodyRow = document.createElement("tr");
        tableBodyRow.appendChild(bookAuthorCell);
        tableBodyRow.appendChild(bookTitleCell);
        tableBodyRow.appendChild(bookNumPagesCell);
        tableBodyRow.appendChild(bookReadStatusCell);
        tableBodyRow.appendChild(actionButtonCell);

        tableElement.appendChild(tableBodyRow);
    }

    const bookContainerElement = document.querySelector("#booksContainer");
    bookContainerElement.innerHTML = ''; // Clear container.
    bookContainerElement.appendChild(tableElement);
}

function addBookToLibrary(author, title, numPages, isRead) {
    const randomUUID = crypto.randomUUID();
    const newBook = new Book(randomUUID, author, title, numPages, isRead);
    myLibrary.push(newBook);
    displayBooksTable();
    const addBookModal = document.querySelector("#addBookModal");
    addBookModal.close();
}

addBookButton.addEventListener("click", (e) => addBookModal.showModal());

closeModalButton.addEventListener("click", () => addBookModal.close());

addBookForm.addEventListener(type="submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addBookForm);
    // console.log(...formData);
    // for (const [key, value] of formData) {
    //     console.log(`${key}: ${value}\n`);
    // }

    const bookTitle = formData.get("book-title");
    const bookAuthor = formData.get("book-author");
    const bookPageCount = formData.get("book-page-count");
    const bookReadStatus = formData.get("book-read-status");
    const bookIsRead = bookReadStatus === "Yes" ? true : false;

    // console.log("!", bookTitle);

    addBookToLibrary(bookAuthor, bookTitle, bookPageCount, bookIsRead);
    addBookForm.reset();
});

addBookToLibrary("Aria Thornton", "The Clockmaker's Requiem", 382, true);
addBookToLibrary("Jasper Vane", "Ashes of the Sky", 417, false);
addBookToLibrary("Lina Moreau", "Whispers Beneath the Elm", 229, true);
addBookToLibrary("Theo Ashcroft", "The Prism Conspiracy", 511, false);
addBookToLibrary("Sera Lang", "Driftwood Saints", 348, true);
addBookToLibrary("Ronan Black", "Echoes of the Forgotten", 294, false);
addBookToLibrary("Vivienne Cross", "The Ninth Garden", 376, true);
addBookToLibrary("Harlan Greaves", "Frost in the Hourglass", 433, false);
addBookToLibrary("Elara Mendez", "Painted Shadows", 305, true);
addBookToLibrary("Cassian Rook", "The Hollow Creed", 496, false);
addBookToLibrary("Noelle Shard", "Tears of the Sunken", 268, true);
addBookToLibrary("Dorian Vale", "The Iron Lark", 389, true);
addBookToLibrary("Isolde Penrose", "Lanterns of Elysium", 521, false);
addBookToLibrary("Kai Fenwick", "The Archivist's Pact", 312, true);
addBookToLibrary("Rowan Quinn", "Crimson Lantern", 250, false);
addBookToLibrary("Tamsin Wilde", "The Starwoven Path", 459, true);
addBookToLibrary("Gideon Trace", "Cathedral of Smoke", 377, false);
addBookToLibrary("Nia Calder", "Veil of the Mariner", 287, true);
addBookToLibrary("Lucien Graves", "Thorns of the Oracle", 403, false);
addBookToLibrary("Ophelia Wren", "The Moon's Memory", 341, true);

displayBooksTable();