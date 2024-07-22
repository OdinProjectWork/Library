let myLibrary = [];

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const confirmButton = document.querySelector("#submit-button");
const getAuthor = document.getElementById("author");
const getPages = document.getElementById("pages");
const getTitle = document.getElementById("title");
const isRead = document.getElementById("read");
const getRead = document.getElementsByName("yes_no")
const library = document.getElementsByClassName("Library")[0];


showButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})


function Book(author, title, pages, read) {
  this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read,
    this.id = myLibrary.length

}

confirmButton.addEventListener("click", (event) => {
  event.preventDefault()
  if (getAuthor.value != "" && getTitle.value != "" && getPages.value != "") {
    let seen = true;
    if(getRead[1].checked){
      seen = false;
    }
    let book = new Book(getAuthor.value, getTitle.value, Number(getPages.value), seen);
    myLibrary.push(book);
    updateLibrary();
    dialog.close()
  }
})

function removeBook(id) {
  myLibrary = myLibrary.filter(function (book) {
    if (book.id !== id) {
      return book;
    }
  })
  myLibrary.forEach(function (book, index) {
    book.id = index;
  });
  updateLibrary();
}

//function to create the card for a book.z
function createCard(book) {
  let deleteButton = document.createElement("button");
  let readButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-button");
  readButton.setAttribute("class", "read-button")
  let card = document.createElement("div");
  card.setAttribute("id", `book-${book.id.toString()}`)
  card.className = "book-card";

  let author = document.createElement("p");
  let textNode = document.createTextNode(`Author: ${book.author}`);
  author.appendChild(textNode);
  card.appendChild(author);

  let title = document.createElement("p");
  textNode = document.createTextNode(`Title: ${book.title}`);
  title.appendChild(textNode);
  card.appendChild(title)

  let pages = document.createElement("p");
  textNode = document.createTextNode(`Pages: ${book.pages.toString()}`);
  pages.appendChild(textNode)
  card.appendChild(pages);

  let read = document.createElement("p");
  read.setAttribute("id", `book-${book.id.toString()}-read`)
  textNode = document.createTextNode(`Read?: ${book.read.toString()}`);
  read.appendChild(textNode)
  card.appendChild(read);
  textNode = document.createTextNode("Change Read");
  readButton.appendChild(textNode);
  card.appendChild(readButton);

  textNode = document.createTextNode("DELETE");
  deleteButton.appendChild(textNode);
  card.appendChild(deleteButton);

  library.appendChild(card);

  deleteButton.addEventListener("click", (event) => {
    removeBook(book.id);
  })

  readButton.addEventListener("click", (event) => {
    if (book.read) {
      book.read = false;
      document.getElementById(`book-${book.id.toString()}-read`).innerText = `Read?: ${book.read.toString()}`;
    } else {
      book.read = true;
      document.getElementById(`book-${book.id.toString()}-read`).innerText = `Read?: ${book.read.toString()}`;

    }
  })
}

function updateLibrary() {
  library.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    createCard(myLibrary[i]);
  }
}