
function createNewTeamMember(memberInfo){
    memberInfo.preventDefault();

    var teamMemberName = document.querySelector("[id='workerName']").value;
    var jobTitle = document.querySelector("[id='workerTitle']").value;

    var memberData = {teamMemberName, jobTitle};

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    
    memberList.push(memberData);
    window.localStorage.setItem("memberList", JSON.stringify(memberList));
    
    renderWorkerList();

    memberInfo.target.reset();

}

function renderWorkerList(){

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    const workerList = document.getElementById("worker-list");
    workerList.innerHTML = "";
        
     
    for(memberData of memberList){
        const workerEl = document.createElement("div");
        
        workerEl.draggable = true;
        
        var {teamMemberName, jobTitle} = memberData;
        workerEl.style.border = "2px solid black";
        workerEl.style.borderRadius="50%";
        workerEl.style.textAlign="center";
        workerEl.style.marginTop="2px";
        workerEl.style.backgroundColor="lightgreen";
        workerEl.innerHTML = "<h4>" + teamMemberName + "</h4>" + "<p>" + jobTitle + "</p>";
        workerList.appendChild(workerEl);
            
        }
        
        
    }
    

function createNewProject(event){
    event.preventDefault();

    var projectName = document.querySelector("[id='projectNameInput']").value;
    var startDate = document.querySelector("[id='projectStartDateInput']").value;
    var dueDate = document.querySelector("[id='projectDueDateInput']").value;

    const projectData = {projectName,startDate,dueDate};


    var projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    projectList.push(projectData);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    // renderTaskManager(); fikse denne senere

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








