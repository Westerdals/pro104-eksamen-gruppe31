
function createNewTeamMember(memberInfo){
    memberInfo.preventDefault();

    var teamMemberName = document.querySelector("[id='workerName']").value;
    var jobTitle = document.querySelector("[id='workerTitle']").value;

    var memberData = {teamMemberName, jobTitle};

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    
    if(teamMemberName.length === 0){
        alert("Please fill in member")
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
        workerEl.ondragstart = handleWorkerDrag;
        
        var {teamMemberName, jobTitle} = memberData;
        workerEl.style.border = "2px solid black";
        workerEl.style.borderRadius="50%";
        workerEl.style.textAlign="center";
        workerEl.style.marginTop="2px";
        workerEl.style.backgroundColor="lightgreen";
        workerEl.innerHTML = "<h4 id = teamMemberNameId>" + teamMemberName + "</h4>" + "<p>" + jobTitle + "</p>";
        workerList.appendChild(workerEl);
            
        }
        
        
    }
    

function createNewProject(event){
    event.preventDefault();

    var projectName = document.querySelector("[id='projectNameInput']").value;
    var startDate = document.querySelector("[id='projectStartDateInput']").value;
    var dueDate = document.querySelector("[id='projectDueDateInput']").value;
    var teamMemberName = document.querySelector("[id='workersTableEl']").value;

    const projectData = {projectName, startDate, dueDate, teamMemberName};


    var projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    projectList.push(projectData);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
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
    renderTaskManager();
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
    renderTaskManager();

}

function workDragOver(event){
    event.preventDefault();
}

function workerDrop(event){
    let teamMemberName = event.dataTransfer.getData("text");
}

function handleWorkerDrag(event){
    let teamMemberName = event.target.querySelector("h4").innerText;
    event.dataTransfer.setData("text", teamMemberName);
}

function renderTaskManager(){
    let projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    let tableList = document.getElementById("table-list");
    
    const projectEl = document.createElement("div");
    tableList.innerHTML = "";
    var projectTemp; //String som skal holde alle radene med tasks
    for(const projectData of projectList){ //Denne loopen er ansvarlig for printing av prosjekter og tasks inne i hvert prosjekt
        var{projectName, startDate, dueDate, teamMemberName} = projectData;

        var tasksTempString = "";

        let taskList = JSON.parse(window.localStorage.getItem(`${projectName} TaskList`)) || [];
        for(var i = 0;i<taskList.length;i++){ //Her produsers alle radene til en string som senere puttes inn i en tabell
        tasksTempString += `
        <tr>
            <td>${taskList[i].taskName}</td>
            <td>${taskList[i].taskDescription}</td>
            <td>${taskList[i].taskStartDate}</td>
            <td>${taskList[i].taskDueDate}</td>
            <td id="workersTableEl" ondragover="workDragOver(event)" ondrop="workerDrop(event)"></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        `;}

        //Selve tabellen produseres her
        projectEl.innerHTML +=
            `<h1 id="projectNameStyle">${projectName}  <button onclick="generateTaskAdderDiv('${projectName}')">Add task</button></h1>
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

                    ${tasksTempString}
        
        </table>`;
        tableList.appendChild(projectEl);
        }
}

renderTaskManager();
renderWorkerList();
workDragOver();
handleWorkerDrag();


