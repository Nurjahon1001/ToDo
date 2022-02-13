let ToDo = [
    { id: 1, title: "Create a button" },
    { id: 2, title: "Create a edit button" },
    { id: 3, title: "Create a delete button" },
    { id: 4, title: "Create a add button" }
]

let ndCardList = [];
let rdCardList = [];

let isEdit = false;
let whichEl = null;

// constants
const form = document.querySelector(".form"),
    form2 = document.querySelector(".form2"),
    form3 = document.querySelector(".form3"),
    input = document.querySelector(".input"),
    input2 = document.querySelector(".input2"),
    input3 = document.querySelector(".input3"),
    todos_ul = document.querySelector(".stCard"),
    ndCard = document.getElementById("ndCard"),
    rdCard = document.getElementById("rdCard");

const WriteTodos = () => {
    todos_ul.innerHTML = "";
    ToDo.map((todo, index) => {
        todos_ul.innerHTML += `<li class="todo" draggable="true">
        <span>${index+1}. ${todo.title}</span>
        <span>
            <i onclick="EditToDo(${todo.id})" class="bi bi-pencil-square"></i>
            <i onclick="DeleteToDo(${todo.id})" class="bi bi-trash"></i>
        </span>
    </li>`
    })
}
const WriteTodos2 = () => {
    ndCard.innerHTML = "";
    ndCardList.map((todo2, index2) => {
        ndCard.innerHTML += `<li class="todo" draggable="true">
        <span>${index2+1}. ${todo2.title}</span>
        <span>
            <i onclick="EditToDo2(${todo2.id})" class="bi bi-pencil-square"></i>
            <i onclick="DeleteToDo2(${todo2.id})" class="bi bi-trash"></i>
        </span>
    </li>`
    })
}
const WriteTodos3 = () => {
    rdCard.innerHTML = "";
    rdCardList.map((todo3, index3) => {
        rdCard.innerHTML += `<li class="todo" draggable="true">
        <span>${index3+1}. ${todo3.title}</span>
        <span>
            <i onclick="EditToDo3(${todo3.id})" class="bi bi-pencil-square"></i>
            <i onclick="DeleteToDo3(${todo3.id})" class="bi bi-trash"></i>
        </span>
    </li>`
    })
}

form.onsubmit = (e) => {
    e.preventDefault();
    let newToDo = {
        id: Date.now(),
        title: e.target[0].value
    };
    if (newToDo.title !== "") {
        if(!isEdit) ToDo.push(newToDo); 
        else {
            let newArr = [];
            ToDo.map(todo => {
                if (todo.id === whichEl) {
                    todo.title = newToDo.title;
                } 
                newArr.push(todo);
            })
            ToDo = newArr;
            isEdit = false;
            whichEl = null;
            input.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add'
        }
        WriteTodos();
        form.reset();
    } else alert("Fill the gap!");
}

form2.onsubmit = (e) => {
    e.preventDefault();
    let newToDo = {
        id: Date.now(),
        title: e.target[0].value
    };
    if (newToDo.title !== "") {
        if(!isEdit) ndCardList.push(newToDo); 
        else {
            let newArr = [];
            ndCardList.map(todo => {
                if (todo.id === whichEl) {
                    todo.title = newToDo.title;
                } 
                newArr.push(todo);
            })
            ndCardList = newArr;
            isEdit = false;
            whichEl = null;
            input2.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add'
        }
        WriteTodos2();
        form2.reset();
    } else alert("Fill the gap!");
}

form3.onsubmit = (e) => {
    e.preventDefault();
    let newToDo = {
        id: Date.now(),
        title: e.target[0].value
    };
    if (newToDo.title !== "") {
        if(!isEdit) rdCardList.push(newToDo); 
        else {
            let newArr = [];
            rdCardList.map(todo => {
                if (todo.id === whichEl) {
                    todo.title = newToDo.title;
                } 
                newArr.push(todo);
            })
            rdCardList = newArr;
            isEdit = false;
            whichEl = null;
            input3.nextElementSibling.innerHTML = '<i class="bi bi-plus"></i> Add'
        }
        WriteTodos3();
        form3.reset();
    } else alert("Fill the gap!");
}

const DeleteToDo = (id) => {
    let confirmation = window.confirm("Are you sure to delete this todo?")
    if(confirmation) ToDo = ToDo.filter(todo => todo.id !== id)   
    WriteTodos();
}
const DeleteToDo2 = (id) => {
    let confirmation = window.confirm("Are you sure to delete this todo?")
    if(confirmation) ndCardList = ndCardList.filter(todo => todo.id !== id)   
    WriteTodos2();
}
const DeleteToDo3 = (id) => {
    let confirmation = window.confirm("Are you sure to delete this todo?")
    if(confirmation) rdCardList = rdCardList.filter(todo => todo.id !== id)   
    WriteTodos3();
}

const EditToDo = (id) => {
    isEdit = true;
    whichEl = id;
    ToDo.map(todo => {
        if (todo.id === id) {
            input.value = todo.title;
        }
    })
    input.nextElementSibling.innerHTML = '<i class="bi bi-pencil-square"></i> Edit'
}

const EditToDo2 = (id) => {
    isEdit = true;
    whichEl = id;
    ndCardList.map(todo => {
        if (todo.id === id) {
            input2.value = todo.title;
        }
    })
    input2.nextElementSibling.innerHTML = '<i class="bi bi-pencil-square"></i> Edit'
}

const EditToDo3 = (id) => {
    isEdit = true;
    whichEl = id;
    rdCardList.map(todo => {
        if (todo.id === id) {
            input3.value = todo.title;
        }
    })
    input3.nextElementSibling.innerHTML = '<i class="bi bi-pencil-square"></i> Edit'
}

// drag and drop
const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
let draggableTodo = null;

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
  });
  
  function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
      this.style.display = "none";
    }, 0);
    console.log("dragStart");
  }
  
  function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
      this.style.display = "block";
    }, 0);
    console.log("dragEnd");
  }
  
  all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
  });
  
  function dragOver(e) {
    e.preventDefault();
    //   console.log("dragOver");
  }
  
  function dragEnter() {
    this.style.border = "1px dashed #ccc";
    console.log("dragEnter");
  }
  
  function dragLeave() {
    this.style.border = "none";
    console.log("dragLeave");
  }
  
  function dragDrop() { 
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("dropped");
  }
console.log(localStorage)

window.onload = () => WriteTodos(), WriteTodos2(), WriteTodos3() 