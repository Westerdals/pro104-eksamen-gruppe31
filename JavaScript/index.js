let taskIdCounter = 1;

function createNewTeamMember(memberInfo){
    memberInfo.preventDefault();

    var teamMemberName = document.querySelector("[id='workerName']").value;
    var jobTitle = document.querySelector("[id='workerTitle']").value;

    var memberData = {teamMemberName, jobTitle};

    var memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    
    if(teamMemberName.length === 0){
        alert("Please fill in worker name")
    }else{
    memberList.push(memberData);
    window.localStorage.setItem("memberList", JSON.stringify(memberList));
    }
    
    renderWorkerList();

    memberInfo.target.reset();
    

}

function renderWorkerList(){

    let memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    let workerList = document.getElementById("worker-list");
    workerList.innerHTML = "";
    
    if (memberList == undefined){
        memberList = [];
    }
     
    for(memberData of memberList){
        const workerEl = document.createElement("div");
        workerEl.draggable = true;
        workerEl.ondragstart = handleOndragstart;
        
        var {teamMemberName, jobTitle} = memberData;
        workerEl.style.border = "2px solid black";
        workerEl.style.borderRadius="30%";
        workerEl.style.padding = "5px";
        workerEl.style.textAlign="center";
        workerEl.style.marginTop="2px";
        workerEl.style.backgroundColor="lightgreen";
        workerEl.innerHTML = "<h4>" + teamMemberName + "</h4>" + "<p>" + jobTitle + "</p>";
        workerList.appendChild(workerEl);
            
        }
      
    }

function handleOndragstart(event){
    
    var teamMemberNameEl = event.target.querySelector("h4").innerText;
    event.dataTransfer.setData("text/plain", teamMemberNameEl);
    
}


function handleDragover(event){
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    
}

function handleOndrop(event){
    var taskListId = event.path[0].id;
    var teamMemberNameEl = event.dataTransfer.getData("text/plain");
    console.log("handleOnDrop", teamMemberNameEl);
    handleDragDropWorker(teamMemberNameEl, taskListId);
}

function handleDragDropWorker(teamMemberNameEl, taskListId){
    let projectAndPosition = taskListId.split("-");
    let taskList = JSON.parse(window.localStorage.getItem(projectAndPosition[0] + " TaskList")) || [];
    var taskWorker = document.querySelector("[id='"+ taskListId +"']");
    
    let taskPosition = parseInt(projectAndPosition[1]);
    // this is a ternary operator
    let workerString = taskList[taskPosition].taskWorker ? taskList[taskPosition].taskWorker + ', ' + teamMemberNameEl : teamMemberNameEl;
    taskWorker.innerText = workerString;
    taskList[taskPosition].taskWorker = workerString;
    window.localStorage.setItem(projectAndPosition[0] + " TaskList", JSON.stringify(taskList));
    
}
    

function createNewProject(event){
    event.preventDefault();

    var projectName = document.querySelector("[id='projectNameInput']").value;
    var startDate = document.querySelector("[id='projectStartDateInput']").value;
    var dueDate = document.querySelector("[id='projectDueDateInput']").value;
    
    var projectData = {projectName,startDate,dueDate};
    
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];

    if(projectName.length === 0){
        alert("Please fill in project name");
    }else{
    projectList.push(projectData);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    }
    
    renderTaskManager();

    event.target.reset();
}

function addTaskToProject(){ 
    //Man kan her evt sende inn projectName som parameter for å lage egen liste med unikt navn til prosjektets tasks
    //taskInput.preventDefault();

    var projectName = document.querySelector("[id='project-name']").innerHTML;
    var taskName = document.querySelector("[id='taskName']").value;
    var taskDescription = document.querySelector("[id='taskDescription']").value;
    var taskStartDate = document.querySelector("[id='taskStartDateInput']").value;
    var taskDueDate = document.querySelector("[id='taskDueDateInput']").value;
    var taskStatus = document.querySelector("[id='status-btn']").textContent;
    var taskPriority = document.querySelector("[id='priority-btn']").textContent;
    var taskId = taskIdCounter;

    if(taskName.trim() == ""){
        alert("Please fill in task name");
        return;
    }

    const taskData = {taskName,taskDescription,taskStartDate,taskDueDate,taskStatus,taskPriority,taskId};

    //Her bestemmes navn på listen over tasks. Må ta stilling til dette senere, enten prosjektnavn som vi passer som parameter eller noe annet unikt
    var taskListName = projectName + " " + "TaskList";
    
    var taskArray = JSON.parse(window.localStorage.getItem(taskListName)) || []; //henter ut data fra localstorage ved gitt navn (og putter i midlertidig var taskArray) eller skaper nytt array
    taskArray.push(taskData); //pusher ny data inn i array
    window.localStorage.setItem(taskListName, JSON.stringify(taskArray)); //sender oppdatert array tilbake til localstorage

    // Fjerner her innholdet i input-fields manuelt grunnet trøbbel med form og flere knapper (alle fungerer som submit)
    document.querySelector("[id='taskName']").value = "";
    document.querySelector("[id='taskDescription']").value = "";
    document.querySelector("[id='taskStartDateInput']").value = "";
    document.querySelector("[id='taskDueDateInput']").value = "";
    document.querySelector("[id='status-btn']").setAttribute('style', 'backgroundColor: lightgray');
    document.querySelector("[id='status-btn']").innerHTML = "<h1>No status</h1>"
    document.querySelector("[id='priority-btn']").setAttribute('style', 'backgroundColor: lightgray');
    document.querySelector("[id='priority-btn']").innerHTML = "<h1>No priority</h1>";

    renderTaskManager();
    taskIdCounter++;
}

function generateEditTaskDiv(projectName, taskNumber){
    let selectedProjectTaskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`));
    for(let i = 0;i<selectedProjectTaskList.length;i++){
        if(taskNumber == selectedProjectTaskList[i].taskId){
            document.getElementById("task-adder").innerHTML = `
    <h2 class="subHeaders">Edit task</h2>
                    <div id="tInputs-div">
                        <p id="project-name">${projectName}</p>
                        <p id="task-number">${taskNumber}</p>
                        <p>Task name:</p>
                        <input type="text" id="taskName" class="inputs" value="${selectedProjectTaskList[i].taskName}">

                        <p>Task description:</p>
                        <input type="text" id="taskDescription" class="inputs" value="${selectedProjectTaskList[i].taskDescription}">

                        <p>Start date:</p>
                        <input type ="date" id="taskStartDateInput" class="inputs" value="${selectedProjectTaskList[i].taskStartDate}">

                        <p>Due date:</p>
                        <input type ="date" id="taskDueDateInput" class="inputs" value="${selectedProjectTaskList[i].taskDueDate}">
                        
                        <p>Priority:</p>
                        <div class="dropdown2" id="task-priority">
                                <div class="dropdown-btn" id="priority-btn"><h1>No priority</h1></div>
                                <ul class="dropdown-ul" id="priority-ul">
                                    <li><a href="#" id="priority-urgent">Urgent</a></li>
                                    <li><a href="#" id="priority-medium">Medium</a></li>
                                    <li><a href="#" id="priority-low">Low</a></li>
                                </ul> 
                            </div>
                        <br>
                        <p>Status:</p>
                        <div class="dropdown" id="task-status">
                                <div class="dropdown-btn" id="status-btn"><h1>No status</h1></div>
                                    <ul class="dropdown-ul" id="status-ul">
                                        <li><a href="#" id="status-working">Working on it</a></li>
                                        <li><a href="#" id="status-stuck">Stuck</a></li>
                                        <li><a href="#" id="status-done">Done</a></li>
                                    </ul>
                        </div>
                        <br><br>
                        <button id = "addTaskBtnDone" class = "btns" onclick="updateTaskInLocalStorage()">Done</button>
                    </div>
                `;
        }
    }
    
    changeStatus();
    changePriority(event);
    document.getElementById("project-name").style.display = "none";
    document.getElementById("task-number").style.display = "none";
    document.getElementById("task-adder").style.display = "inline";

}

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

function generateTaskAdderDiv(projectName){
    document.getElementById("task-adder").innerHTML = `
    <h2 class="subHeaders">Add task</h2>
                    <div id="tInputs-div">
                        <p id="project-name">${projectName}</p>
                        <p>Task name:</p>
                        <input type="text" id="taskName" class="inputs">

                        <p>Task description:</p>
                        <input type="text" id="taskDescription" class="inputs">

                        <p>Start date:</p>
                        <input type ="date" id="taskStartDateInput" class="inputs">

                        <p>Due date:</p>
                        <input type ="date" id="taskDueDateInput" class="inputs">
                        
                        <p>Priority:</p>
                        <div class="dropdown2" id="task-priority">
                                <div class="dropdown-btn" id="priority-btn"><h1>No priority</h1></div>
                                <ul class="dropdown-ul" id="priority-ul">
                                    <li><a href="#" id="priority-urgent">Urgent</a></li>
                                    <li><a href="#" id="priority-medium">Medium</a></li>
                                    <li><a href="#" id="priority-low">Low</a></li>
                                </ul> 
                            </div>
                        <br>
                        <p>Status:</p>
                        <div class="dropdown" id="task-status">
                                <div class="dropdown-btn" id="status-btn"><h1>No status</h1></div>
                                    <ul class="dropdown-ul" id="status-ul">
                                        <li><a href="#" id="status-working">Working on it</a></li>
                                        <li><a href="#" id="status-stuck">Stuck</a></li>
                                        <li><a href="#" id="status-done">Done</a></li>
                                    </ul>
                        </div>
                        <br><br>
                        <button id = "addTaskBtn" class = "btns" onclick="addTaskToProject()">Add task to project</button>
                        <button id = "addTaskBtnDone" class = "btns" onclick="removeTaskAdderDiv()">Done</button>
                    </div>
                `;
    changeStatus();
    changePriority(event);
    document.getElementById("project-name").style.display = "none";
    document.getElementById("task-adder").style.display = "inline";
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

function removeTaskAdderDiv(){
    document.getElementById("task-adder").style.display = "none";

}

function renderTaskManager(){
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    let tableList = document.getElementById("table-list");
    
    const projectEl = document.createElement("div");
    tableList.innerHTML = "";
    for(const projectData of projectList){
        var{projectName, startDate, dueDate} = projectData;

        var tasksTempString = "";
        
        let taskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`)) || [];
        for(var i = 0;i<taskList.length;i++){ //Her produsers alle radene til en string som senere puttes inn i en tabell
        tasksTempString += `
        <tr>
            <td>${taskList[i].taskName}</td>
            <td>${taskList[i].taskDescription}</td>
            <td>${taskList[i].taskStartDate}</td>
            <td>${taskList[i].taskDueDate}</td>
            <td id="${projectName}-${[i]}" ondragover="handleDragover(event)" ondrop="handleOndrop(event)">${taskList[i].taskWorker}</td>
                        <td>
                            <div class="dropdown2-table-row">
                                <div class="dropdown-btn" id="priority-btn">
                                <h1 class='priority-${taskList[i].taskPriority}'>${taskList[i].taskPriority}</h1>
                                </div>
                                <ul class="dropdown-ul" id="priority-ul">
                                    <li><a href="javascript:updatePriorityInLocalStorage('Urgent', '${projectName}', '${taskList[i].taskId}');" class="priority-urgent-row-li">Urgent</a></li>
                                    <li><a href="javascript:updatePriorityInLocalStorage('Medium', '${projectName}', '${taskList[i].taskId}');" class="priority-medium-row-li">Medium</a></li>
                                    <li><a href="javascript:updatePriorityInLocalStorage('Low', '${projectName}', '${taskList[i].taskId}');" class="priority-low-row-li">Low</a></li>
                                </ul> 
                            </div> 
                        </td>
                        <td>
                            <div class="dropdown-table-row">
                                <div class="dropdown-btn" id="status-btn">
                                    <h1 class='status-${taskList[i].taskStatus}'>${taskList[i].taskStatus}</h1>
                                </div>
                                <ul class="dropdown-ul" id="status-ul">
                                        <li><a href="javascript:updateStatusInLocalStorage('Working on it', '${projectName}', '${taskList[i].taskId}');" id="status-working">Working on it</a></li>
                                        <li><a href="javascript:updateStatusInLocalStorage('Stuck', '${projectName}', '${taskList[i].taskId}');" id="status-stuck">Stuck</a></li>
                                        <li><a href="javascript:updateStatusInLocalStorage('Done', '${projectName}', '${taskList[i].taskId}');" id="status-done">Done</a></li>
                                    </ul>
                            </div>
                        </td>
                        <td></td>
                        <td class="remove-task-btn-container">
                            <button class="remove-task-btn" onclick="removeSelectedTask('${projectName}','${taskList[i].taskId}')">Remove</button>
                            <button class="edit-task-btn" onclick="generateEditTaskDiv('${projectName}', '${taskList[i].taskId}')">Edit</button>
                        </td>
                    
        </tr>`
        
        }
        // Her produseres prosjekt-tabellen (template literal string med alle tilhørende radene settes inn også her via variabelen tasksTempString)
        projectEl.innerHTML +=
            `<h1 id="projectNameStyle">${projectName} (${startDate}, ${dueDate})  <button onclick="generateTaskAdderDiv('${projectName}')">Add task</button></h1>
                <table>
                    <tr>
                        <th>Task</th>
                        <th id="task-description">Task description</th>
                        <th>Start date</th>
                        <th>Due date</th>
                        <th>Workers</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Reminder</th>
                        <th>Remove Task</th>
                    </tr>

                    ${tasksTempString}

                </table>`;
        tableList.appendChild(projectEl);
    }
}

function removeSelectedTask(projectName, taskNumber){
    let selectedProjectTaskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`));
    for(var i = 0;i<selectedProjectTaskList.length;i++){
        if(taskNumber == selectedProjectTaskList[i].taskId){
            selectedProjectTaskList.splice([i], 1);
        }
    }
    window.localStorage.setItem(`${projectName} TaskList`, JSON.stringify(selectedProjectTaskList));
    renderTaskManager();
}


function removeAllWorkers(memberList){
    
    let removeWorkers = document.getElementById("remove-workers");
    
    let workersList = JSON.parse(window.localStorage.getItem("memberList"));
    
    for(var i=0; i<workersList.length; i++){
        workersList.splice[i];
    }
    window.localStorage.setItem("memberList", JSON.stringify(removeWorkers));
    renderWorkerList();
    
}


function changeStatus(){
            var statusBtn = document.getElementById("status-btn");
        
            var newStatus = document.querySelector(".dropdown");
        
            newStatus.addEventListener("click", changeStatus);

            var clickedStatus = event.target.id;
            

            if (clickedStatus === "status-working"){
                statusBtn.innerHTML = `<h1>Working on it</h1>`;
                statusBtn.style.backgroundColor="aqua";
            }
            if (clickedStatus === "status-stuck"){
                statusBtn.innerHTML = `<h1>Stuck</h1>`;
                statusBtn.style.backgroundColor="brown";
            } 
            if (clickedStatus === "status-done"){
                statusBtn.innerHTML = `<h1>Done</h1>`;
                statusBtn.style.backgroundColor="greenyellow";
            }
            
        }


function changePriority(event){
        var priorityBtn = document.getElementById("priority-btn");
        var newPriority = document.querySelector(".dropdown2");

        newPriority.addEventListener("click", changePriority);
        var clickedPriority = event.target.id;

            if(clickedPriority === "priority-urgent"){
                   priorityBtn.innerHTML = "<h1>Urgent</h1>";
                   priorityBtn.style.backgroundColor = "orangered";
               }
               if(clickedPriority ==="priority-medium"){
                   priorityBtn.innerHTML = "<h1>Medium</h1>";
                   priorityBtn.style.backgroundColor= "mediumpurple";

               }
               if(clickedPriority === "priority-low"){
                   priorityBtn.innerHTML = "<h1>Low</h1>";
                   priorityBtn.style.backgroundColor = "deepskyblue";
               }

        }
renderWorkerList();
renderTaskManager();
