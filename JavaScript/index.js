
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
    
    var teamMemberNameEl = event.dataTransfer.getData("text/plain");
    console.log("handleOnDrop", teamMemberNameEl);
    handleDragDropWorker(teamMemberNameEl);
}

function handleDragDropWorker(teamMemberNameEl){
    
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    var taskWorker = document.querySelector("[id='task-worker']");
    
    taskWorker.innerText = teamMemberNameEl;
    
    projectList = projectList ? projectList.split(','):[];
    
    projectList.push(teamMemberNameEl);
    window.localStorage.setItem("projectList", projectList.toString());
    
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

function addTaskToProject(taskInput){ 
    //Man kan her evt sende inn projectName som parameter for å lage egen liste med unikt navn til prosjektets tasks
    taskInput.preventDefault();

    var projectName = document.querySelector("[id='project-name']").innerHTML;
    var taskName = document.querySelector("[id='taskName']").value;
    var taskDescription = document.querySelector("[id='taskDescription']").value;
    var taskStartDate = document.querySelector("[id='taskStartDateInput']").value;
    var taskDueDate = document.querySelector("[id='taskDueDateInput']").value;
    // var taskPriority = document.querySelector("[id='taskStartDateInput']").value;
    //priority må fikses senere med dropdown meny

    const taskData = {taskName,taskDescription,taskStartDate,taskDueDate};

    //Her bestemmes navn på listen over tasks. Må ta stilling til dette senere, enten prosjektnavn som vi passer som parameter eller noe annet unikt
    var taskListName = projectName + " " + "TaskList";
    
    var taskArray = JSON.parse(window.localStorage.getItem(taskListName)) || []; //henter ut data fra localstorage ved gitt navn (og putter i midlertidig var taskArray) eller skaper nytt array
    taskArray.push(taskData); //pusher ny data inn i array
    window.localStorage.setItem(taskListName, JSON.stringify(taskArray)); //sender oppdatert array tilbake til localstorage

    taskInput.target.reset();
}

function generateTaskAdderDiv(projectName){
    document.getElementById("task-adder").innerHTML = `
    <h2 class="subHeaders">Add task</h2>
                <form onsubmit="addTaskToProject(event)">
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
                        <!-- fikse at dropdown og velging av riktig prioritet senere her -->

                        <button id = "addTaskBtn" class = "btns" type="submit">Add task to project</button>
                    </div>
                </form>
                <button id = "addTaskBtnDone" class = "btns" onclick="removeTaskAdderDiv()">Done</button>
                `;
    
    document.getElementById("project-name").style.display = "none";
    document.getElementById("task-adder").style.display = "inline";
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
        projectEl.innerHTML +=
            `<h1 id="projectNameStyle">${projectName}</h1>
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
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>${startDate}</td>
                        <td>${dueDate}</td>
                        <td id="task-worker" ondragover="handleDragover(event)" ondrop="handleOndrop(event)"></td>
                        <td>
                            <div class="dropdown">
                                <div class="dropdown-btn" id="status-btn"><h1 id="status">No status</h1></div>
                                    <ul class="dropdown-ul" id="status-ul">
                                        <li><a href="#" id="status-working">Working on it</a></li>
                                        <li><a href="#" id="status-stuck">Stuck</a></li>
                                        <li><a href="#" id="status-done">Done</a></li>
                                    </ul>
                                </div>
                        </td>
                        <td>
                            <div class="dropdown2">
                                <div class="dropdown-btn" id="priority-btn"><h1>No priority</h1></div>
                                <ul class="dropdown-ul" id="priority-ul">
                                    <li><a href="#" id="priority-urgent">Urgent</a></li>
                                    <li><a href="#" id="priority-medium">Medium</a></li>
                                    <li><a href="#" id="priority-low">Low</a></li>
                                </ul> 
                            </div> 
                        </td>
                        <td></td>
                    </tr>
                </table>`;
        tableList.appendChild(projectEl);
        changeStatus(event);
        changePriority(event);
    }
}
function renderTaskAdderDiv(){
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    let tableList = document.getElementById("table-list");
    
    const projectEl = document.createElement("div");
    tableList.innerHTML = "";
    for(const projectData of projectList){
        var{projectName, startDate, dueDate} = projectData;
        projectEl.innerHTML +=
            `<h1 id="projectNameStyle">${projectName}</h1>
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
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>${startDate}</td>
                        <td>${dueDate}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>`;
        tableList.appendChild(projectEl);
    }
}
function changeStatus(event){
            var statusBtn = document.getElementById("status-btn");
        
            var newStatus = document.querySelector(".dropdown");
        
            newStatus.addEventListener("click", changeStatus);
            
            var status = document.querySelector("[id='status']").value; 
             

            var clickedStatus = event.target.id;
            
            var existing = localStorage.getItem("projectList");
            existing = existing ? existing.split(',') : [];

            if (clickedStatus === "status-working"){
                statusBtn.innerHTML = `<h1 id="status">Working on it</h1>`;
                statusBtn.style.backgroundColor="aqua";
                existing.push('status');
                localStorage.setItem('projectList', JSON.stringify(existing));
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


