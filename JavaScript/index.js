
function createNewTeamMember(memberInfo){
    memberInfo.preventDefault();

    const teamMemberName = document.querySelector("[id='workerName']").value;
    const jobTitle = document.querySelector("[id='workerTitle']").value;

    const memberData = {teamMemberName, jobTitle};

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    memberList.push(memberData);
    window.localStorage.setItem("memberList", JSON.stringify(memberList));
    
    renderWorkerList();
    
    // renderMemberList(); fikse senere

    memberInfo.target.reset();

}

function renderWorkerList(){
    
    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    const workerList = document.getElementById("worker-list");
    workerList.innerHTML = "";
    
    for(memberData of memberList){
        const workerEl = document.createElement("div");
        var {teamMemberName, jobTitle} = memberData;
        workerEl.style.border = "2px solid black";
        workerEl.style.borderRadius="50%";
        workerEl.style.textAlign="center";
        workerEl.style.backgroundColor="lightgreen";
        workerEl.innerHTML = "<h4>" + teamMemberName + "</h4>" + "<p>" + jobTitle + "</p>";
        workerList.appendChild(workerEl);
    }
    
}


 

function createNewProject(event){
    event.preventDefault();

    const projectName = document.querySelector("[id='projectNameInput']").value;
    var startDate = document.querySelector("[id='startDateInput']").value;
    var dueDate = document.querySelector("[id='dueDateInput']").value;


    const projectData = {projectName,startDate,dueDate};


    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    projectList.push(projectData);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    // renderTaskManager(); fikse denne senere

    event.target.reset();
}







