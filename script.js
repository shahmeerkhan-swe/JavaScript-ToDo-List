// Retrieve ToDo from local storage/initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];

// Initialize 
document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const todoCount = document.getElementById("todoCount");
    const addButton = document.getElementById("addButton")
    const deleteButton = document.getElementById("deleteButton")

    if (addButton) {
        addButton.addEventListener("click", addTask);
    }
    
    if (todoInput) {
        todoInput.addEventListener('keydown', function (event) {
            if (event.key == "Enter") {
                event.preventDefault();
                addTask();
            }
        });
    }
   
    if (deleteButton) {
        deleteButton.addEventListener("click", deleteAllTasks)
    }

    displayTasks();
   
});

function addTask() {
    const newTask = todoInput.value.trim();

    if (newTask !== "") {
        todo.push({
            text: newTask, 
            disabled: false, 
        }); 
        saveToLocalStorage(); 
        todoInput.value = ""; 
        displayTasks();
    }
}

function deleteAllTasks() {
    console.log("Delete test");
}

function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p")
        p.innerHTML = `
        <div class="todo-container">
            <input type="checkbox" class="todo-checkbox"
            id="input-${index}" ${
                item.disabled ? "checked" : ""
            }>
                <p id="todo${index}" class="${item.disabled ?
                "disabled" : ""
            }" onclick="editTask(${index})">${item.text}</p>
        </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener
        ("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    });
        todoCount.textContent = todo.length; 
}

function editTask(index) {
    const todoItem = document.getElementById(`todo${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");
    
    inputElement.value = existingText; 
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
} 

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage(); 
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}