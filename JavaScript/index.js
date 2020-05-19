function createNewTeamMember(memberInfo){
    memberInfo.preventDefault();

    const teamMemberName = document.querySelector("[id='workerName']").value;
    const jobTitle = document.querySelector("[id='workerTitle']").value;

    const memberData = {teamMemberName, jobTitle};

    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    memberList.push(memberData);
    window.localStorage.setItem("memberList", JSON.stringify(memberList));

    // renderMemberList(); fikse senere

    memberInfo.target.reset();

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