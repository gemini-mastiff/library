const table = document.querySelector("tbody");

const newBtn = document.querySelector("#showDialog");
const closeBtn = document.querySelector("#closeBtn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const saveBtn = document.querySelector("#saveBtn");

const myLibrary = [];

function generateTable() {
    for (book of myLibrary){
        const index = myLibrary.indexOf(book);
        const row = document.createElement("tr");
        row.classList.add("row");
        row.setAttribute("data-index", index);
        for (property in book){
            if (property === "title"){
                const header = document.createElement("th");
                header.textContent = book[property];
                header.setAttribute("scope", "row");
                row.appendChild(header);
            } else { 
                const info = document.createElement("td");
                if (property === "read") {
                    const readBox = document.createElement("input");
                    readBox.setAttribute("type", "checkbox");
                    readBox.classList.add("readBox");
                    if (book.read === true) {
                        readBox.setAttribute("checked", true);
                    }
                    info.appendChild(readBox);
                } else {
                    info.textContent = book[property];
                }
                row.appendChild(info);
            }
        }
        const delCell = document.createElement("td");
        const delBtn = document.createElement("img");
        delBtn.classList.add("delBtn");
        delBtn.setAttribute("src", "svg/window-close.svg");
        delBtn.setAttribute("alt", "Delete Button");
        delCell.appendChild(delBtn);
        row.appendChild(delCell);
        table.appendChild(row);
    };
};

function updateTable(){
    // Clears the existing table to avoid repeating when updateTable() is called
    const allPrevRows = document.querySelectorAll(".row");
    allPrevRows.forEach((row) => {
        row.remove();
    });
    generateTable()

    // Everytime the table is updated, the rows must be updated too
    const allBooks = document.querySelectorAll(".row");
    allBooks.forEach((bookRow) => {
        const index = bookRow.dataset.index;
        const readBox = bookRow.querySelector(".readBox");
        const delBtn = bookRow.querySelector(".delBtn");
    
        readBox.addEventListener("change", () => {
            const read = readBox.checked ? true : false;
            myLibrary[index].toggleRead(read); 
        });
    
        delBtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            updateTable();
        });
    });
};

class Book {
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead(value){
        this.read = value;
    }
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

addBookToLibrary("Meditations", "Marcus Aurelius", 304, false);
addBookToLibrary("Psycho-Cybernetics", "Dr Maxwell Maltz", 282, true);
addBookToLibrary("The Princess Bride", "William Goldman", 512, true);
updateTable();

newBtn.addEventListener("click", () => {
    dialog.show();
});

closeBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
})

saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    read = readInput.checked ? true : false;
    addBookToLibrary(title, author, pages, read);
    updateTable();
    form.reset();
    dialog.close();
});