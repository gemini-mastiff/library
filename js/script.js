const table = document.querySelector("table");

const myLibrary = [];

function updateTable(){
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
    myLibrary.push(newBook)
}

addBookToLibrary("Meditations", "Marcus Aurelius", 304, false);
addBookToLibrary("Psycho-Cybernetics", "Dr Maxwell Maltz", 282, true);
addBookToLibrary("The Princess Bride", "William Goldman", 512, true);
updateTable()