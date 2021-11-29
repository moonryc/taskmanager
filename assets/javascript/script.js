let formEl = document.querySelector("#task-form")
let tasksToDoEl = document.querySelector("#tasks-to-do")

const taskFormHandler = (event) => {
    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeSelect = document.querySelector("select[name='task-type']").value;

    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeSelect
    }

    createTaskEl(taskDataObj);

}

const createTaskEl = (taskDataObj) => {
    //create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3>${taskDataObj.name}</h3> <span class="task-type">${taskDataObj.type}</span>`;

    //append the div to the li
    listItemEl.appendChild(taskInfoEl);

    //append  the li to the ul
    tasksToDoEl.appendChild(listItemEl);
}


formEl.addEventListener("submit", taskFormHandler);

