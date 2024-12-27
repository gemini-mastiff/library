const table = document.querySelector("tbody");
let allRows;

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("fieldset");
const saveBtn = document.querySelector("#saveBtn");

const myLibrary = [];

function updateTable(){
    allRows = document.querySelectorAll("tr");
    allRows.forEach((row) => {
        row.remove();
    });
    for (book of myLibrary){
        const row = document.createElement("tr");
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

function clearDialog() {
    form.reset();
};

saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    read = readInput.value;
    clearDialog();
    addBookToLibrary(title, author, pages, read);
    updateTable();
    dialog.close()
});

addBookToLibrary("Meditations", "Marcus Aurelius", 304, false);
addBookToLibrary("Psycho-Cybernetics", "Dr Maxwell Maltz", 282, true);
addBookToLibrary("The Princess Bride", "William Goldman", 512, true);
updateTable()