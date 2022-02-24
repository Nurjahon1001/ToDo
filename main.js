let ToDo = JSON.parse(localStorage.getItem("ToDo")) || [
  { id: 1, title: "Create a button" },
  { id: 2, title: "Create a edit button" },
  { id: 3, title: "Create a delete button" },
  { id: 4, title: "Create a add button" },
];

 
let doingCardList = JSON.parse(localStorage.getItem("doingCardList")) || [];
let doneCardList = JSON.parse(localStorage.getItem("doneCardList")) || [];

let isEditMode = false;
let selectedElement = null;

// constants
const toDoCardForm = document.querySelector(".toDoCardForm"),
  doingCardForm = document.querySelector(".doingCardForm"),
  doneCardForm = document.querySelector(".doneCardForm"),
  toDoCardInput = document.querySelector(".toDoCardInput"),
  doingCardInput = document.querySelector(".doingCardInput"),
  doneCardInput = document.querySelector(".doneCardInput"),
  todoList = document.querySelector(".todoList"),
  doingList = document.querySelector(".doingList"),
  doneList = document.querySelector(".doneList");

const createTodo = () => {
  todoList.innerHTML = "";
  ToDo.map((todo, index) => {
    todoList.innerHTML += `<li id="drag1" ondragstart ="drag(event)" draggable="true">
        <span>${index + 1}. ${todo.title}</span>
        <span>
            <i onclick="EditToDo(${todo.id})" class="bi bi-pencil-square"></i>
            <i onclick="DeleteToDo(${todo.id})" class="bi bi-trash"></i>
        </span>
    </li>`;
  });


};
const createDoingList = () => {
  doingList.innerHTML = "";
  doingCardList.map((doingli, doingListIndex) => {
    doingList.innerHTML += `<li id="drag1" ondragstart ="drag(event)" draggable="true">
        <span>${doingListIndex + 1}. ${doingli.title}</span>
        <span>
            <i onclick="editDoingList(${doingli.id})" class="bi bi-pencil-square"></i>
            <i onclick="deleteDoingList(${doingli.id})" class="bi bi-trash"></i>
        </span>
    </li>`;
  });
};
const createDoneList = () => {
    doneList.innerHTML = "";
  doneCardList.map((doneLi, doneListIndex) => {
    doneList.innerHTML += `<li id="drag1" ondragstart ="drag(event)" draggable="true">
        <span>${doneListIndex + 1}. ${doneLi.title}</span>
        <span>
            <i onclick="editDoneList(${doneLi.id})" class="bi bi-pencil-square"></i>
            <i onclick="deleteDoneList(${doneLi.id})" class="bi bi-trash"></i>
        </span>
    </li>`;
  });
};

 toDoCardForm.onsubmit = (e) => {
  e.preventDefault();
  let newToDo = {
    id: Date.now(),
    title: e.target[0].value,
  };
  if (newToDo.title !== "") {
    if (!isEditMode) ToDo.push(newToDo);
    else {
      let newToDoList = [];
      ToDo.forEach((todo) => {
        if (todo.id === selectedElement) {
          todo.title = newToDo.title;
        }
        newToDoList.push(todo);
      });
      ToDo = newToDoList;
      isEditMode = false;
      selectedElement = null;
      toDoCardInput.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add';
    }
    createTodo();
     toDoCardForm.reset();
  } else alert("Fill the gap!");

  
  localStorage.setItem("newToDo", JSON.stringify(newToDo))

  
};

doingCardForm .onsubmit = (e) => {
  e.preventDefault();
  let newToDo = {
    id: Date.now(),
    title: e.target[0].value,
  };
  if (newToDo.title !== "") {
    if (!isEditMode) doingCardList.push(newToDo);
    else {
      let newToDoList = [];
      doingCardList.map((todo) => {
        if (todo.id === selectedElement) {
          todo.title = newToDo.title;
        }
        newToDoList.push(todo);
      });
      doingCardList = newToDoList;
      isEditMode = false;
      selectedElement = null;
      doingCardInput.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add';
    }
    createDoingList();
    doingCardForm .reset();
  } else alert("Fill the gap!");

  localStorage.setItem("newToDo", JSON.stringify(newToDo))
};

doneCardForm.onsubmit = (e) => {
  e.preventDefault();
  let newToDo = {
    id: Date.now(),
    title: e.target[0].value,
  };
  if (newToDo.title !== "") {
    if (!isEditMode) doneCardList.push(newToDo);
    else {
      let newToDoList = [];
      doneCardList.map((todo) => {
        if (todo.id === selectedElement) {
          todo.title = newToDo.title;
        }
        newToDoList.push(todo);
      });
      doneCardList = newToDoList;
      isEditMode = false;
      selectedElement = null;
      doneCardInput.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add';
    }
    createDoneList();
    doneCardForm.reset();
  } else alert("Fill the gap!");

  localStorage.setItem("newToDo", JSON.stringify(newToDo))
};

const DeleteToDo = (id) => {
  let confirmation = window.confirm("Are you sure to delete this todo?");
  if (confirmation) ToDo = ToDo.filter((todo) => todo.id !== id);
  createTodo();
};
const deleteDoingList = (id) => {
  let confirmation = window.confirm("Are you sure to delete this todo?");
  if (confirmation) doingCardList = doingCardList.filter((todo) => todo.id !== id);
  createDoingList();
};
const deleteDoneList = (id) => {
  let confirmation = window.confirm("Are you sure to delete this todo?");
  if (confirmation) doneCardList = doneCardList.filter((todo) => todo.id !== id);
  createDoneList();
};

const EditToDo = (id) => {
    isEditMode = true;
    selectedElement = id;
    ToDo.forEach((todo) => {
      if (todo.id === id) {
        toDoCardInput.value = todo.title;
      }
    });
    toDoCardInput.nextElementSibling.innerHTML =
      '<i class="bi bi-pencil-square"></i> Edit';

  // input.nextElementSibling.appendChild ('<i class="bi bi-pencil-square"></i> Edit')
};

const editDoingList = (id) => {
  isEditMode = true;
  selectedElement = id;
  doingCardList.map((todo) => {
    if (todo.id === id) {
        doingCardInput.value = todo.title;
    }
  });
  doingCardInput.nextElementSibling.innerHTML =
    '<i class="bi bi-pencil-square"></i> Edit';
};

const editDoneList = (id) => {
  isEditMode = true;
  selectedElement = id;
  doneCardList.map((todo) => {
    if (todo.id === id) {
        doneCardInput.value = todo.title;
    }
  });
  doneCardInput.nextElementSibling.innerHTML =
    '<i class="bi bi-pencil-square"></i> Edit';
};

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

(window.onload = () => createTodo()), createDoingList(), createDoneList();
