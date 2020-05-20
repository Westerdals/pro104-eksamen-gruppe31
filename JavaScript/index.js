
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
    
    const memberList = JSON.parse(window.localStorage.getItem("memberList")) || [];
    const workerList = document.getElementById("worker-list");
    workerList.innerHTML = "";
        
    if (memberList == undefined){
        memberList = [];
    } 
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

    const projectName = document.querySelector("[id='projectNameInput']").value;
    var startDate = document.querySelector("[id='startDateInput']").value;
    var dueDate = document.querySelector("[id='dueDateInput']").value;
    var status = document.querySelector("[id='status]").value


    const projectData = {projectName,startDate,dueDate,status};


    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    projectList.push(projectData);
    window.localStorage.setItem("projectList", JSON.stringify(projectList));
    renderTaskManager();

    event.target.reset();
}

function renderTaskManager(){
    const projectList = JSON.parse(window.localStorage.getItem("projectList")) || [];
    const tableList = document.getElementById("table-list");
    
    const projectEl = document.createElement("div");
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
                        <td contenteditable='true'>${startDate}</td>
                        <td contenteditable='true'>${startDate}</td>
                        <td contenteditable='true'>${startDate}</td>
                        <td contenteditable='true'>${dueDate}</td>
                        <td contenteditable='true'>${startDate}</td>
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
                        <td contenteditable='true'>${startDate}</td> 
                    </tr>
                </table>`;
        tableList.appendChild(projectEl);
        changeStatus(event);
        changePriority(event);
    }
}
function changeStatus(event){
            var statusBtn = document.getElementById("status-btn");
        
            var newStatus = document.querySelector(".dropdown");
        
            newStatus.addEventListener("click", changeStatus)

            var clickedStatus = event.target.id;

            if (clickedStatus === "status-working"){
                statusBtn.innerHTML = `<h1 id="status">Working on it</h1>`;
                statusBtn.style.backgroundColor="aqua";
            }
            if (clickedStatus === "status-stuck"){
                statusBtn.innerHTML = `<h1 id="status">Stuck</h1>`;
                statusBtn.style.backgroundColor="brown";
            } 
            if (clickedStatus === "status-done"){
                statusBtn.innerHTML = `<h1 id="status">Done</h1>`;
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

renderTaskManager();
renderWorkerList();






