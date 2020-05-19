function createNewTeamMember(memberInfo){
    memberInfo.preventDefault();

    const teamMemberName = document.querySelector("[id='workerName']").value;
    const jobTitle = document.querySelector("[id='workerTitle']").value;

    const memberData = {teamMemberName, jobTitle};

    const memberList = JSON.parse(window.localStorage.getItem("memberlist")) || [];
    memberList.push(memberData);
    window.localStorage.setItem("memberlist", JSON.stringify(memberList));

    // renderMemberList(); fikse senere

    memberInfo.target.reset();

}

function createNewProject(event){
    event.preventDefault();

    const projectName = document.querySelector("[id='projectNameInput']").value;
    const taskInput = document.querySelector("[id='taskInput']").value;
    const taskDescription = document.querySelector("[id='descriptionInput']").value;
    const startDate = document.querySelector("[id='startDateInput']").value;
    const dueDate = document.querySelector("[id='dueDateInput']").value;


    const project = {projectName,taskInput,taskDescription,startDate,dueDate};


    const taskList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    taskList.push(project);
    window.localStorage.setItem("project", JSON.stringify(project));
    // renderTaskManager(); fikse denne senere

    event.target.reset();
}