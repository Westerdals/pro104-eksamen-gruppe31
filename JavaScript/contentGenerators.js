
    //Funksjon ansvarlig for printing av prosjekter og radene (tasks) i hvert prosjekt
function renderTaskManager(){
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    let tableList = document.getElementById("table-list");
    
    const projectEl = document.createElement("div");
    tableList.innerHTML = "";

        // Loop for å hente hvert prosjekt
    for(const projectData of projectList){
        var{projectName, startDate, dueDate} = projectData;

        var tasksTempString = "";
        
        let taskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`)) || [];
        for(var i = 0;i<taskList.length;i++){ 
            // Loop som henter frem alle radene tilhørende et prosjekt, legges i en string som legges inn i sitt
        tasksTempString += `
        <tr>
            <td>${taskList[i].taskName}</td>
            <td>${taskList[i].taskDescription}</td>
            <td>${taskList[i].taskStartDate}</td>
            <td>${taskList[i].taskDueDate}</td>
            <td id="${projectName}-${[i]}" ondragover="handleDragover(event)" ondrop="handleOndrop(event)">${taskList[i].taskWorker ? taskList[i].taskWorker : ''}</td>
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
                                        <li><a href="javascript:updateStatusInLocalStorage('Stuck', '${projectName}', '${taskList[i].taskId}');" id="status-stuck">Stuck</a></li>
                                        <li><a href="javascript:updateStatusInLocalStorage('In progress', '${projectName}', '${taskList[i].taskId}');" id="status-progress">In progress</a></li>
                                        <li><a href="javascript:updateStatusInLocalStorage('Done', '${projectName}', '${taskList[i].taskId}');" id="status-done">Done</a></li>
                                    </ul>
                            </div>
                        </td>
                        <td><button class="smallTableBtn" onclick="remindMeIn1Day('${taskList[i].taskName}', '${taskList[i].taskDueDate}')">1 day alert</button></td>
                        <td class="remove-task-btn-container">
                            <button class="smallTableBtn" onclick="removeSelectedTask('${projectName}','${taskList[i].taskId}')">Remove</button>
                            <button class="smallTableBtn" onclick="generateEditTaskDiv('${projectName}', '${taskList[i].taskId}')">Edit</button>
                        </td>
                    
        </tr>`
        
        }
        // Her produseres prosjekt-tabellen (template literal string med alle tilhørende radene settes inn også her via variabelen tasksTempString)
        projectEl.innerHTML +=
            `<h1 id="projectNameStyle">${projectName} (${startDate}, ${dueDate})  <button class = "tableBtns" onclick="generateTaskAdderDiv('${projectName}')">Add task</button> <button class = "tableBtns" onclick="deleteProject('${projectName}')"> Delete project</button></h1>
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
                        <th>Tools</th>
                    </tr>

                    ${tasksTempString}

                </table>`;

        tableList.appendChild(projectEl);
       
    }
}

function remindMeIn1Day(taskName, taskDueDate){
    var userPhoneNumber = prompt("Write phonenumber to send alert");
    if(taskDueDate == ""){
        alert("Reminder to finish " + taskName + " will be sent to "  + userPhoneNumber + " in 1 day.");
        return;
    }
    alert("Reminder to finish " + taskName + " within " + taskDueDate + " will be sent to "  + userPhoneNumber + " in 1 day.");
}

    //Funksjon for å generere mulighet for user-input ved oppretning av ny task
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
                        <br>

                        
                        <p>Status:</p>
                        
                        <div class="dropdown" id="task-status">
                                <div class="dropdown-btn" id="status-btn"><h1>No status</h1></div>
                                    <ul class="dropdown-ul" id="status-ul">
                                    <li><a href="#" id="status-stuck">Stuck</a></li>
                                    <li><a href="#" id="status-progress">In progress</a></li>
                                        <li><a href="#" id="status-done">Done</a></li>
                                    </ul>
                        </div>
                        <br><br>
                        <button id = "addTaskBtn" class = "btns" onclick="addTaskToProject()">Add task to project</button>
                        <button id = "addTaskBtnDone" class = "btns" onclick="removeTaskAdderDiv()">Done</button>
                    </div>
                `;
                
    changeStatus(event);
    changePriority(event);
    document.getElementById("project-name").style.display = "none";
    
    document.getElementById("task-adder").style.display = "inline";
    
    document.getElementById("project-adder").style.transform = "translate(-220px, 220px)";
    
    document.getElementById("worker-adder").style.transform = "translate(-220px, 220px)";
    
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
                        <p id="edit-task-p">Status:</p>
                        <div class="dropdown" id="task-status">
                                <div class="dropdown-btn" id="status-btn"><h1>No status</h1></div>
                                    <ul class="dropdown-ul" id="status-ul">
                                    <li><a href="#" id="status-stuck">Stuck</a></li>
                                    <li><a href="#" id="status-progress">In progress</a></li>
                                    <li><a href="#" id="status-done">Done</a></li>
                                    </ul>
                        </div>
                        <br><br>
                        <button id = "addTaskBtnDone" class = "btns" onclick="updateTaskInLocalStorage()">Done</button>
                    </div>
                `;
        }
    }
    changeStatus(event);
    changePriority(event);
    document.getElementById("project-name").style.display = "none";
    document.getElementById("task-number").style.display = "none";
    document.getElementById("task-adder").style.display = "inline";
    document.getElementById("project-adder").style.transform = "translate(-220px, 220px)";
    
    document.getElementById("worker-adder").style.transform = "translate(-220px, 220px)";
}

    //DRAG-N-DROP: Plukker opp navnet til en arbeider (lagt her grunnet renderWorkerList)
function handleOndragstart(event){
    
    var teamMemberNameEl = event.target.querySelector("h4").innerText;
    event.dataTransfer.setData("text/plain", teamMemberNameEl);
    
}

//Funksjon for å printe ut/generere drag-n-drop boksen og team members fra localStorage
function renderWorkerList(){

    let memberList = JSON.parse(window.localStorage.getItem("memberList")) || []; //String array i localStorage for å holde team-workers
    let workerList = document.getElementById("worker-list"); //Henter div for å legge memberList
    workerList.innerHTML = "";
     
    for(memberData of memberList){ //Printer ut workers fra array
        const workerEl = document.createElement("div");
        workerEl.draggable = true;
        workerEl.ondragstart = handleOndragstart;
        
        var {teamMemberName, jobTitle} = memberData;
        workerEl.style.border = "2px solid black";
        workerEl.style.borderRadius="40%";
        workerEl.style.padding = "5px";
        workerEl.style.textAlign="center";
        workerEl.style.marginTop="2px";
        workerEl.style.color = "black";
        workerEl.style.backgroundColor="#ffcc99";
        workerEl.innerHTML = "<h4>" + teamMemberName + "</h4>" + "<p>" + jobTitle + "</p>";
        workerList.appendChild(workerEl);
            
        }
      
    }

//Kaller på funksjoner
renderWorkerList();
renderTaskManager();
    