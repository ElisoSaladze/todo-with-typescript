"use strict";
const todoInput = document.querySelector("#taskInput");
const submitButton = document.querySelector(".main-btn");
const tasks = document.querySelector(".tasks");
const totalTodos = [];
const completedTodos = [];
const addTodo = (event) => {
    event.preventDefault();
    if (todoInput?.value === "") {
        alert("please write task");
    }
    else {
        const newTask = {
            text: todoInput?.value,
            id: totalTodos.length + 1,
            completed: false
        };
        totalTodos.push(newTask);
        displayTodosOnScreen(newTask);
        console.log(totalTodos);
    }
    updateNumberOfTodos(totalTodos, ".counter");
};
const displayWholeList = (arr) => arr.forEach(task => displayTodosOnScreen(task));
const addToCompletedLists = (event) => {
    const checkbox = event.target;
    const todoId = parseInt(checkbox.id.replace("todo", ""));
    const completedTodo = totalTodos.find((todo) => todo.id === todoId);
    if (completedTodo && checkbox.checked) {
        completedTodo.completed = true;
        completedTodos.push(completedTodo);
        console.log(completedTodos);
    }
    else {
        const index = completedTodos.findIndex((todo) => todo.id === todoId);
        if (index !== -1) {
            completedTodos.splice(index, 1);
            console.log(completedTodos);
        }
    }
    updateNumberOfTodos(completedTodos, ".counter2");
};
const displayTodosOnScreen = (todo) => {
    const item = document.createElement("li");
    item.classList.add("task");
    item.innerHTML = `
    <div>
        <input type="checkbox" class="checkbox" id="todo${todo.id}">
        <label for="todo${todo.id}">${todo.text}</label>
    </div>
    <button class="trash"><img  src="./assets/Layer 2.svg"></button>
  `;
    tasks?.appendChild(item);
    const button = item.querySelector(".trash");
    button.addEventListener("click", deleteTodo);
    const checkbox = item.querySelector("input");
    checkbox.addEventListener("change", addToCompletedLists);
    checkTasks();
};
const updateNumberOfTodos = (arr, counterClass) => {
    const totalElement = document.querySelector(counterClass);
    totalElement.textContent = String(arr.length);
};
const deleteTodo = (event) => {
    const deleteButton = event.target;
    const item = deleteButton.parentElement?.parentElement;
    if (item) {
        const taskId = parseInt(item.querySelector("input").id.replace("todo", ""));
        const taskIndex = totalTodos.findIndex((todo) => todo.id === taskId);
        item.remove();
        if (taskIndex !== -1) {
            totalTodos.splice(taskIndex, 1);
            console.log(totalTodos);
            const completedTaskIndex = completedTodos.findIndex((todo) => todo.id === taskId);
            if (completedTaskIndex !== -1) {
                completedTodos.splice(completedTaskIndex, 1);
                console.log(completedTodos);
            }
        }
    }
    updateNumberOfTodos(totalTodos, ".counter");
    updateNumberOfTodos(completedTodos, ".count2");
};
const checkTasks = () => {
    const reminder = document.querySelector(".heh");
    if (totalTodos.length === 0) {
        reminder?.classList.add("show");
        reminder?.classList.remove("hide");
    }
    else {
        reminder?.classList.add("hide");
        reminder?.classList.remove("show");
    }
};
checkTasks();
submitButton?.addEventListener("click", addTodo);
