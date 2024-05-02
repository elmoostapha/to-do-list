const tasksDiv = document.getElementById("tasks");

let tasks = [];
// local storage 
function SaveDataINStorage(){
    const storedTasks = localStorage.getItem("tasks");
    tasks = JSON.parse(storedTasks);
}
SaveDataINStorage();

document.getElementById("add-button").addEventListener("click" , () => {
    let taskName = prompt("fill in here your task")
    if (taskName.length > 0 && taskName != null){
        tasks.push({
            body: taskName,
            isDone: false
        })
        document.getElementById("tasks").innerHTML = "";
        storedTasksInStorage();
        readData()
    }else{
        alert("You must add value")
    }

})
function readData(){
    let index = 0;
    for (task of tasks){
        tasksDiv.innerHTML += `
        <div class="task ${task.isDone ? "done" : ""}">
            <h4>${task.body}</h4>
            <div>
                <button id="delete" onclick="deleteData(${index})"><span class="material-symbols-outlined">delete</span></button>
                ${task.isDone ? 
                    `
                    <button id="close" onclick="taskNotDone(${index})"><span class="material-symbols-outlined">close</span></button>               
                    ` 
                :
                    `
                    <button id="done" onclick="taskDone(${index})"><span class="material-symbols-outlined">done</span></button>
                    `
                }
                <button id="edit" onclick="editData(${index})"><span class="material-symbols-outlined">edit</span></button>
            </div>
        </div>
        `
        index++;
    }
}
readData();

function deleteData(element){
    let indexToRemove = element;
    tasks.splice(indexToRemove, 1);
    tasksDiv.innerHTML = "";
    storedTasksInStorage()
    readData()
}   

function editData(element){
    let newData = prompt("editing ...")
    if (newData != "" && newData != null){
        tasks[element].body = newData;
        tasksDiv.innerHTML = "";
        storedTasksInStorage()
        readData();

    }else{
        alert("you must add value")
    }
}

function taskDone(i){
    tasks[i].isDone = true;
    tasksDiv.innerHTML = "";
    storedTasksInStorage()
    readData(); 
}

function taskNotDone(i){
    tasks[i].isDone = false;
    tasksDiv.innerHTML = "";
    storedTasksInStorage()
    readData(); 
}


// Local Storage

function storedTasksInStorage(){
    localStorage.setItem("tasks" , JSON.stringify(tasks))
}