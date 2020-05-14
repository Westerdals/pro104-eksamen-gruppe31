function renderProjectManager() {
    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];

    if (projectList == undefined) {
        projectList = [];
    }

    const listOfProject = document.getElementById("projectList");
    listOfProject.innerHTML = "";
    for (const project of projectList) {
        const projectDiv = document.createElement("div");
        projectDiv.setAttribute('class', 'project-divs');
        const { teamWorker, projectDescription } = project;
        projectDiv.innerHTML = `<h4>${teamWorker}</h4> 
                            <div>${ projectDescription}</div> `;
        listOfProject.appendChild(projectDiv);
    }
}

function renderWorkerList() {
    const workerListLocal = JSON.parse(window.localStorage.getItem("workerlist")) || [];

    if (workerListLocal == undefined) {
        workerListLocal = [];
    }

    const listOfWorkers = document.getElementById("team-worker-list");
    listOfWorkers.innerHTML = "";
    for (const workers of workerListLocal) {
        const workerDiv = document.createElement("div");
        workerDiv.setAttribute('class', 'worker-divs');
        const { teamWorkerName, jobTitle } = workers;
        workerDiv.innerHTML = `<h4>${teamWorkerName}</h4> 
                            <div>${ jobTitle}</div> `;
        listOfWorkers.appendChild(workerDiv);
    }
}


function createNewTask(event) {
    event.preventDefault();

    const teamWorker = document.querySelector("[name='name']").value;
    const projectDescription = document.querySelector("[name='description']").value;

    const project = { teamWorker, projectDescription };


    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    projectList.push(project);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    renderProjectManager();

    event.target.reset();
}

function createNewTeamWorker(workerInfo) {
    workerInfo.preventDefault();

    const teamWorkerName = document.querySelector("[name='teamworker-name']").value;
    const jobTitle = document.querySelector("[name='job-title']").value;

    const workerData = { teamWorkerName, jobTitle };

    const workerList = JSON.parse(window.localStorage.getItem("workerlist")) || [];
    workerList.push(workerData);
    window.localStorage.setItem("workerlist", JSON.stringify(workerList));

    renderWorkerList();

    workerInfo.target.reset();
}

renderProjectManager();
renderWorkerList();

window.addEventListener("storage", function (event) {
    if (event.key === "projectList") {
        renderProjectManager();
    }
});
function clearlist() {
    localStorage.clear();
}