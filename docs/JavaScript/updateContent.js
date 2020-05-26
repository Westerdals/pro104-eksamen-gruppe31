function updateTaskInLocalStorage(){
    var projectName = document.querySelector("[id='project-name']").innerHTML;
    var taskId = document.querySelector("[id='task-number']").innerHTML;
    var taskName = document.querySelector("[id='taskName']").value;
    var taskDescription = document.querySelector("[id='taskDescription']").value;
    var taskStartDate = document.querySelector("[id='taskStartDateInput']").value;
    var taskDueDate = document.querySelector("[id='taskDueDateInput']").value;
    var taskStatus = document.querySelector("[id='status-btn']").textContent;
    var taskPriority = document.querySelector("[id='priority-btn']").textContent;

    if(taskName.trim() == ""){
        alert("Please fill in task name");
        return;
    }

    const taskData = {taskName,taskDescription,taskStartDate,taskDueDate,taskStatus,taskPriority,taskId};

    var taskListName = projectName + " " + "TaskList";
    
    var taskArray = JSON.parse(window.localStorage.getItem(taskListName)) || []; //henter ut data fra localstorage ved gitt navn (og putter i midlertidig var taskArray) eller skaper nytt array
    
    for(var i = 0;i<taskArray.length;i++){
        if(taskArray[i].taskId == taskId){
            taskArray.splice([i], 1, taskData); //Erstatter objektet i index-plass med telleren i, med variabelen taskData
        }
    }
    window.localStorage.setItem(taskListName, JSON.stringify(taskArray)); //sender oppdatert array tilbake til localstorage
    
    removeTaskAdderDiv();
    renderTaskManager();
}



function updatePriorityInLocalStorage(newPriority,projectName,taskNumber){
    let selectedProjectTaskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`));
    for(var i=0;i<selectedProjectTaskList.length;i++){
        if(taskNumber == selectedProjectTaskList[i].taskId){
            selectedProjectTaskList[i].taskPriority = newPriority;
        }
    }
    window.localStorage.setItem(`${projectName} TaskList`, JSON.stringify(selectedProjectTaskList));
    renderTaskManager();
}

function updateStatusInLocalStorage(newStatus,projectName,taskNumber){
    let selectedProjectTaskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`));
    for(var i=0;i<selectedProjectTaskList.length;i++){
        if(taskNumber == selectedProjectTaskList[i].taskId){
            selectedProjectTaskList[i].taskStatus = newStatus;
        }
    }
    window.localStorage.setItem(`${projectName} TaskList`, JSON.stringify(selectedProjectTaskList));
    renderTaskManager();
}