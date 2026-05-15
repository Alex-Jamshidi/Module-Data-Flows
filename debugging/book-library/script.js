let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function addBook() {
  if (
    titleInput.value.trim() == "" ||
    pagesInput.value.trim() == "" ||
    Number(pagesInput.value) < 1
  ) {
    alert("Please fill all fields!");
    return false;
  }
  const book = new Book(
    titleInput.value.trim(),
    authorInput.value.trim(),
    Number(pagesInput.value),
    checkInput.checked
  );
  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const tableBody = document.querySelector("#display tbody");

  //delete old table
  tableBody.innerHTML = "";

  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeButton = document.createElement("button");
    changeButton.id = i;
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    changeButton.innerText = myLibrary[i].check ? "Yes" : "No";

    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delBut = document.createElement("button");
    deleteCell.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      alert(`You've deleted title: ${deletedTitle}`);
      render();
    });
  }
}

document.getElementById("add-book-btn").addEventListener("click", addBook);
