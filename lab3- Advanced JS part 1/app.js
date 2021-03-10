class Note {
  constructor(title) {
    this.title = title;
    // HINT🤩 this.element = this.createElement(title);
    this.element = this.createElement(title);
  }

  createElement(title) {
    let newNote = document.createElement("li");
    newNote.innerHTML = title;
    // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));
    newNote.addEventListener('click', this.remove.bind(newNote));
    return newNote;
  }

  add() {
    // HINT🤩
    // this function should append the note to the screen somehow
    document.querySelector("#taskList").appendChild(this.element);
  }

  saveToStorage() {
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    let notes = JSON.parse(localStorage.getItem('notes'));
    if(notes == null) notes = [];
    notes.push(this.title);
    localStorage.setItem("notes", JSON.stringify(notes));
    //localStorage.setItem("note", this.title);
    //console.log(localStorage.getItem("note"));
  }

  remove() {
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    // .removeChild(this)
    // remove the item from screen and from localstorage

    document.querySelector('#taskList').removeChild(this);
    let note = this.innerHTML;

    let notes = localStorage.getItem('notes');
    notes = JSON.parse(notes) || [];
    let index = notes.indexOf(note);
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");

    // HINT🤩
    // pressing the enter key in the text field triggers the createNote function
    // this.txtTodo = ???
    // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    // read up on .bind() -> we need to pass the current meaning of this to the eventListener
    // when the app loads, we can show previously saved noted from localstorage
    // this.loadNotesFromStorage();
    this.txtTodo = document.querySelector("#taskInput");
    this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
    this.loadNotesFromStorage();
  }

  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
  }

  createNote(e) {
    // this function should create a new note by using the Note() class
    // HINT🤩
    // note.add();
    // note.saveToStorage();
    // clear the text field with .reset in this class
    // if (e.key === "Enter")
    if (e.key === "Enter") {
      e.preventDefault();
      let note = new Note(this.txtTodo.value);  //neem de value van je inputveld
      note.add();
      note.saveToStorage();
    }
  }

  reset() {
    // this function should reset the form / clear the text field
  }
}

let app = new App();
