function removeTaskAdderDiv(){
    document.getElementById("task-adder").style.display = "none";
    document.getElementById("project-adder").style.transform = "translate(0px, 0px)";
    document.getElementById("worker-adder").style.transform = "translate(0px, 0px)";

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