const table = document.querySelector("tbody");
let allRows;

const newBtn = document.querySelector("#showDialog");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("select");
const saveBtn = document.querySelector("#saveBtn");

const myLibrary = [];

function updateTable(){
    // Clears the existing table to avoid repeating when updateTable() is called
    allRows = document.querySelectorAll(".row");
    allRows.forEach((row) => {
        row.remove();
    });
    for (book of myLibrary){
        const row = document.createElement("tr");
        row.classList.add("row")
        for (property in book){
            if (property === "title"){
                const header = document.createElement("th");
                header.textContent = book[property];
                header.setAttribute("scope", "row")
                row.appendChild(header)
            } else { 
                const info = document.createElement("td");
                info.textContent = book[property];
                row.appendChild(info);
            }
        }
        table.appendChild(row);
    }
   }

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    read = readInput.value;
    addBookToLibrary(title, author, pages, read);
    updateTable();
    form.reset();
    dialog.close()
});

addBookToLibrary("Meditations", "Marcus Aurelius", 304, "unread");
addBookToLibrary("Psycho-Cybernetics", "Dr Maxwell Maltz", 282, "reading");
addBookToLibrary("The Princess Bride", "William Goldman", 512, "finished");
updateTable()