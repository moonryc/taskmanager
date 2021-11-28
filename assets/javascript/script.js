let buttonEl = document.querySelector("#save-task")
let tasksToDoEl = document.querySelector("#tasks-to-do")

const createTaskHandler = () => {
    let listItemEl = document.createElement("li");
    listItemEl.textContent = "Task to do";
    listItemEl.className = "task-item"
    tasksToDoEl.appendChild(listItemEl);
}


buttonEl.addEventListener("click", createTaskHandler);

