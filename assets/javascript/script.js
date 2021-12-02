let taskIdCounter = 0;

let formEl = document.querySelector("#task-form")
let tasksToDoEl = document.querySelector("#tasks-to-do")
let tasksInProgressEl = document.querySelector("#tasks-in-progress")
let tasksCompletedEl = document.querySelector("#tasks-completed")

let pageContentEl = document.querySelector("#page-content")

const taskFormHandler = (event) => {
    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeSelect = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeSelect) {
        alert("you left something blank");
        return;
    }

    let isEdit = formEl.hasAttribute("data-task-id");



    if(isEdit){
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput,taskTypeSelect,taskId);
    }else{
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeSelect
        }
        createTaskEl(taskDataObj);
    }


    formEl.reset();
}

const createTaskEl = (taskDataObj) => {
    //create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3> <span class="task-type">${taskDataObj.type}</span>`;

    //append the div to the li
    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);

    listItemEl.appendChild(taskActionsEl);

    //append  the li to the ul
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++;
}

const createTaskActions = (taskId) => {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.className = "btn edit-btn";
    editButtonEl.textContent = "Edit";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    let statusChoices = ["To Do", "In Progress", "Completed"];
    for (let choice of statusChoices) {
        let optionEl = document.createElement("option");
        optionEl.textContent = choice;
        optionEl.setAttribute("value", choice);
        statusSelectEl.appendChild(optionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}


const taskButtonHandler = (event) => {
    console.log(event.target)
    if (event.target.matches(".delete-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }

    if (event.target.matches(".edit-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
}

const deleteTask = (taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
    taskSelected.remove();
}

const editTask = (taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;



    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Update Task";
    formEl.setAttribute("data-task-id", taskId);
}

const completeEditTask = (taskName, taskType, taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

const taskStatusChangeHandler = (event) => {
    let taskId = event.target.getAttribute("data-task-id")

    let statusValue = event.target.value.toLowerCase()

    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    if(statusValue ==="to do"){
        tasksToDoEl.appendChild(taskSelected);
    }

    if(statusValue ==="in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    }

    if(statusValue ==="completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
}


formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);