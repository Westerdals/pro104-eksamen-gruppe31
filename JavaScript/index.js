//Henter counter til task-id fra localStorage for å unngå at flere får samme ved reload av side.
//Funksjonen setter igang telleren på 1 eller henter ut eksisterende
function initializeTaskIdCounter(){
    let taskIdCounter = JSON.parse(window.localStorage.getItem("taskIdCounter")) || 1;
    window.localStorage.setItem("taskIdCounter", JSON.stringify(taskIdCounter));
}

//Funksjon for å øke telleren i localstorage. Denne brukes hver gang en task legges til i localStorage
function incrementTaskIdCounter(){
    let taskIdCounter = JSON.parse(window.localStorage.getItem("taskIdCounter")); //Henter ut string fra localStorage og omgjør til tall
    parseInt(taskIdCounter); //Parser til int, failsafe hvis taskIdCounter noen gang skulle bli lagret som string
    taskIdCounter++;
    window.localStorage.setItem("taskIdCounter", JSON.stringify(taskIdCounter)); //Lagrer tilbake i localStorage (overwriter gamle objektet)
}

//Funksjon for å la bruker legge til nytt team-medlem til drag-n-drop div
function createNewTeamMember(memberInfo){
    memberInfo.preventDefault(); //Forhindrer at form sender info via adresse-linjen

    var teamMemberName = document.querySelector("[id='workerName']").value; //henter info fra form
    var jobTitle = document.querySelector("[id='workerTitle']").value;

    var memberData = {teamMemberName, jobTitle}; //

    var memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    
    if(teamMemberName.length === 0){ //Sørger for at bruker ikke kan fylle inn tomt på navn
        alert("Please fill in worker name")
    }else{
    memberList.push(memberData);
    window.localStorage.setItem("memberList", JSON.stringify(memberList));
    }
    
    renderWorkerList();

    memberInfo.target.reset(); //Resetter input feltene i formen
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

    //DRAG-N-DROP: Plukker opp navnet til en arbeider
function handleOndragstart(event){
    
    var teamMemberNameEl = event.target.querySelector("h4").innerText;
    event.dataTransfer.setData("text/plain", teamMemberNameEl);
    
}

    //DRAG-N-DROP: Sørger for at arbeider-tekst blir kopiert
function handleDragover(event){
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    
}

    //DRAG-N-DROP: henter inn unik id til tasken man dropper worker, samt teksten fra elementet man dropper
function handleOndrop(event){
    var taskListId = event.path[0].id;
    var teamMemberNameEl = event.dataTransfer.getData("text/plain");
    console.log("handleOnDrop", teamMemberNameEl);
    handleDragDropWorker(teamMemberNameEl, taskListId);
}

    //DRAG-N-DROP: Vi bruker dataen på dragndrop og vi plasserer de i localStorage
function handleDragDropWorker(teamMemberNameEl, taskListId){
    let projectAndPosition = taskListId.split("-");
    let taskList = JSON.parse(window.localStorage.getItem(projectAndPosition[0] + " TaskList")) || [];
    var taskWorker = document.querySelector("[id='"+ taskListId +"']");
    
    let taskPosition = parseInt(projectAndPosition[1]);

    // Ternary operator - sjekker om det eksisterer noe allerede i workers, og legger til komma hvis det stemmer
    let workerString = taskList[taskPosition].taskWorker ? taskList[taskPosition].taskWorker + ', ' + teamMemberNameEl : teamMemberNameEl;

    taskWorker.innerText = workerString;
    taskList[taskPosition].taskWorker = workerString;
    window.localStorage.setItem(projectAndPosition[0] + " TaskList", JSON.stringify(taskList));
    
}
    
    //Funksjon for å behandle data-input fra bruker og lagre det i localStorage.
function createNewProject(event){ //Passer et form som parameter
    event.preventDefault();

    var projectName = document.querySelector("[id='projectNameInput']").value;
    var startDate = document.querySelector("[id='projectStartDateInput']").value;
    var dueDate = document.querySelector("[id='projectDueDateInput']").value;
    
    var projectData = {projectName,startDate,dueDate};
    
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];

    if(projectName.length === 0){ //Sørger for at bruker må gi prosjektet et navn
        alert("Please fill in project name");
    }else{
    projectList.push(projectData);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    }
    
    renderTaskManager(); //Oppdaterer siden

    event.target.reset();
}

    //Funksjon som tar
function addTaskToProject(){ 

    var projectName = document.querySelector("[id='project-name']").innerHTML;
    var taskName = document.querySelector("[id='taskName']").value;
    var taskDescription = document.querySelector("[id='taskDescription']").value;
    var taskStartDate = document.querySelector("[id='taskStartDateInput']").value;
    var taskDueDate = document.querySelector("[id='taskDueDateInput']").value;
    var taskStatus = document.querySelector("[id='status-btn']").textContent;
    var taskPriority = document.querySelector("[id='priority-btn']").textContent;
    var taskId = JSON.parse(window.localStorage.getItem("taskIdCounter"));

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
    incrementTaskIdCounter();
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
    document.getElementById("project-adder").style.transform = "translate(0px, 0px)";
    document.getElementById("worker-adder").style.transform = "translate(0px, 0px)";

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
            <td id="${projectName}-${[i]}" ondragover="handleDragover(event)" ondrop="handleOndrop(event)">${taskList[i].taskWorker ? taskList[i].taskWorker : ""}</td>
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
                        <td></td>
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

function deleteProject(projectName){
    var confirmDeletion = prompt("Are you sure? The Project and all its tasks will be lost. Write yes to confirm deletion of the project.").toLowerCase();
    console.log(confirmDeletion);

    var projectList = JSON.parse(window.localStorage.getItem("projectList"));

    console.log(projectList);

    if(confirmDeletion == "yes"){
        for(var i = 0;i<projectList.length;i++){
            if(projectList[i].projectName == projectName){
                projectList.splice([i], 1);
            }
        }
        window.localStorage.removeItem(`${projectName} TaskList`);
    }
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    renderTaskManager();
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

    //Dropdown-meny: Event click gir gitt status med farge og oppdaterer dette
function changeStatus(event){
            var statusBtn = document.getElementById("status-btn");
        
            var newStatus = document.querySelector(".dropdown");
        
            newStatus.addEventListener("click", changeStatus);

            var clickedStatus = event.target.id;
            
            if (clickedStatus === "status-stuck"){
                statusBtn.innerHTML = `<h1>Stuck</h1>`;
                statusBtn.style.backgroundColor="red";
             }    
             if (clickedStatus === "status-progress"){
                statusBtn.innerHTML = `<h1>In progress</h1>`;
                statusBtn.style.backgroundColor="yellow";
           
            } 
            if (clickedStatus === "status-done"){
                statusBtn.innerHTML = `<h1>Done</h1>`;
                statusBtn.style.backgroundColor="greenyellow";
            }
            
        }

    //Dropdown-meny: Event click gir gitt prioritet med farge og oppdaterer dette
function changePriority(event){
        var priorityBtn = document.getElementById("priority-btn");
        var newPriority = document.querySelector(".dropdown2");

        newPriority.addEventListener("click", changePriority);
        var clickedPriority = event.target.id;

            if(clickedPriority === "priority-urgent"){
                   priorityBtn.innerHTML = "<h1>Urgent</h1>";
                   priorityBtn.style.backgroundColor = "red";
               }
               if(clickedPriority ==="priority-medium"){
                   priorityBtn.innerHTML = "<h1>Medium</h1>";
                   priorityBtn.style.backgroundColor= "yellow";

               }
               if(clickedPriority === "priority-low"){
                   priorityBtn.innerHTML = "<h1>Low</h1>";
                   priorityBtn.style.backgroundColor = "greenyellow";
               }

        }

    //Kaller på funksjoner
renderWorkerList();
renderTaskManager();
initializeTaskIdCounter();
