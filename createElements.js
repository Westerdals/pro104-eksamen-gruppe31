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

    //Funksjon som tar input fra bruker, sender disse til localStorage og nullstiller feltene
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


    
    
