let ToDo = [
  { id: 1, status: 1, title: "Create a button" },
  { id: 2, status: 1, title: "Create a edit button" },
  { id: 3, status: 2, title: "Create a delete button" },
  { id: 4, status: 3, title: "Create a add button" },
];
// status
// 1 = create
// 2 = doing
// 3 = done

if (localStorage.getItem("ToDo")) {
  ToDo = JSON.parse(localStorage.getItem("ToDo"));
} else {
  localStorage.setItem("ToDo", JSON.stringify(ToDo));
}

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
  doingList.innerHTML = "";
  doneList.innerHTML = "";
  let count1 = 1;
  let count2 = 1;
  let count3 = 1;
  ToDo.map((todo) => {
    if (todo.status == 1) {
      todoList.innerHTML += `<li data-id='${todo.id}'>
            <span>${count1}. ${todo.title}</span>
            <input type="text" id='todo_${todo.id}' value="${todo.title}" style="display:none;" />
            <span>
                <i onclick="EditToDo(${todo.id})" class="bi bi-pencil-square" id='editIcon_${todo.id}'></i>
                <i onclick="EndOfToDo(${todo.id})" class="bi bi-check" style='display: none;'></i>
                <i onclick="DeleteToDo(${todo.id})" class="bi bi-trash"></i>
            </span>
        </li>`;
      count1++;
    } else if (todo.status == 2) {
      doingList.innerHTML += `<li data-id='${todo.id}'>
            <span>${count2}. ${todo.title}</span>
            <input type="text" id='todo_${todo.id}' value="${todo.title}" style="display:none;" />
            <span>
                <i onclick="EditToDo(${todo.id})" class="bi bi-pencil-square" id='editIcon_${todo.id}'></i>
                <i onclick="EndOfToDo(${todo.id})" class="bi bi-check" style='display: none;'></i>
                <i onclick="DeleteToDo(${todo.id})" class="bi bi-trash"></i>
            </span>
        </li>`;
      count2++;
    } else if (todo.status == 3) {
      doneList.innerHTML += `<li data-id='${todo.id}'>
            <span>${count3}. ${todo.title}</span>
            <input type="text" id='todo_${todo.id}' value="${todo.title}" style="display:none;" />
            <span>
                <i onclick="EditToDo(${todo.id})" class="bi bi-pencil-square" id='editIcon_${todo.id}'></i>
                <i onclick="EndOfToDo(${todo.id})" class="bi bi-check" style='display: none;'></i>
                <i onclick="DeleteToDo(${todo.id})" class="bi bi-trash"></i>
            </span>
        </li>`;
      count3++;
    }
  });
};

toDoCardForm.onsubmit = (e) => {
  e.preventDefault();
  let newToDo = {
    id: Date.now(),
    status: 1,
    title: e.target[0].value,
  };
  if (newToDo.title !== "") {
    if (!isEditMode) {
      ToDo.push(newToDo);
      localStorage.setItem("ToDo", JSON.stringify(ToDo));
    } else {
      let newToDoList = [];
      ToDo.forEach((todo) => {
        if (todo.id === selectedElement) {
          todo.title = newToDo.title;
        }
        newToDoList.push(todo);
      });
      ToDo = newToDoList;
      localStorage.setItem("ToDo", JSON.stringify(ToDo));
      isEditMode = false;
      selectedElement = null;
      // toDoCardInput.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add';
    }
    createTodo();
    toDoCardForm.reset();
  } else alert("Fill the gap!");
};

doingCardForm.onsubmit = (e) => {
  e.preventDefault();
  let newToDo = {
    id: Date.now(),
    status: 2,
    title: e.target[0].value,
  };
  if (newToDo.title !== "") {
    if (!isEditMode) {
      ToDo.push(newToDo);
      localStorage.setItem("ToDo", JSON.stringify(ToDo));
    } else {
      let newToDoList = [];
      ToDo.forEach((todo) => {
        if (todo.id === selectedElement) {
          todo.title = newToDo.title;
        }
        newToDoList.push(todo);
      });
      ToDo = newToDoList;
      localStorage.setItem("ToDo", JSON.stringify(ToDo));
      isEditMode = false;
      selectedElement = null;
      // toDoCardInput.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add';
    }
    createTodo();
    doingCardForm.reset();
  } else alert("Fill the gap!");
};

doneCardForm.onsubmit = (e) => {
  e.preventDefault();
  let newToDo = {
    id: Date.now(),
    status: 3,
    title: e.target[0].value,
  };
  if (newToDo.title !== "") {
    if (!isEditMode) {
      ToDo.push(newToDo);
      localStorage.setItem("ToDo", JSON.stringify(ToDo));
    } else {
      let newToDoList = [];
      ToDo.forEach((todo) => {
        if (todo.id === selectedElement) {
          todo.title = newToDo.title;
        }
        newToDoList.push(todo);
      });
      ToDo = newToDoList;
      localStorage.setItem("ToDo", JSON.stringify(ToDo));
      isEditMode = false;
      selectedElement = null;
      // toDoCardInput.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add';
    }
    createTodo();
    doneCardForm.reset();
  } else alert("Fill the gap!");
};

const DeleteToDo = (id) => {
  let confirmation = window.confirm("Are you sure to delete this todo?");
  if (confirmation) ToDo = ToDo.filter((todo) => todo.id !== id);
  localStorage.setItem("ToDo", JSON.stringify(ToDo));
  createTodo();
};

const EditToDo = (id) => {
  isEditMode = true;
  selectedElement = id;
  ToDo.map((todo) => {
    const inp = document.querySelector(`#todo_${todo.id}`);
    const editIcon = document.querySelector(`#editIcon_${todo.id}`);
    if (todo.id == id) {
      inp.style.display = "block";
      inp.previousElementSibling.style.display = "none";
      editIcon.style.display = "none";
      editIcon.nextElementSibling.style.display = "inline";
    } else {
      editIcon.style.display = "inline";
      editIcon.nextElementSibling.style.display = "none";
      inp.style.display = "none";
      inp.previousElementSibling.style.display = "block";
    }
  });
};

const EndOfToDo = (id) => {
  const inp = document.querySelector(`#todo_${id}`);
  ToDo = ToDo.map((todo) => {
    if (todo.id == id) {
      todo.title = inp.value;
    }
    return todo;
  });
  localStorage.setItem("ToDo", JSON.stringify(ToDo));
  createTodo();
};

function init() {
  dragula([todoList, doingList, doneList]).on("drop", function (el) {
    ToDo = ToDo.map((todo) => {
      if (todo.id == el.attributes["data-id"].value) {
        if (el.parentElement.attributes["class"].value === "todoList") {
          todo.status = 1;
        } else if (el.parentElement.attributes["class"].value === "doingList") {
          todo.status = 2;
        } else if (el.parentElement.attributes["class"].value === "doneList") {
          todo.status = 3;
        }
      }
      return todo;
    });
    writeTodo();
    localStorage.setItem("ToDo", JSON.stringify(ToDo));
  });
}

window.onload = () => {
  writeTodo();
  init();
};
