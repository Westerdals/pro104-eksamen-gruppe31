    //Dropdown-meny: Event click gir gitt status med farge og oppdaterer dette
    function changeStatus(event){
        var statusBtn = document.getElementById("status-btn");
    
        var newStatus = document.querySelector(".dropdown");
    
        newStatus.addEventListener("click", changeStatus);

        var clickedStatus = event.target.id;
        
        if (clickedStatus === "status-stuck"){
            statusBtn.innerHTML = `<h1>Stuck</h1>`;
            statusBtn.style.backgroundColor="red";
         }    
         if (clickedStatus === "status-progress"){
            statusBtn.innerHTML = `<h1>In progress</h1>`;
            statusBtn.style.backgroundColor="yellow";
       
        } 
        if (clickedStatus === "status-done"){
            statusBtn.innerHTML = `<h1>Done</h1>`;
            statusBtn.style.backgroundColor="greenyellow";
        }
        
    }

//Dropdown-meny: Event click gir gitt prioritet med farge og oppdaterer dette
function changePriority(event){
    var priorityBtn = document.getElementById("priority-btn");
    var newPriority = document.querySelector(".dropdown2");

    newPriority.addEventListener("click", changePriority);
    var clickedPriority = event.target.id;

        if(clickedPriority === "priority-urgent"){
               priorityBtn.innerHTML = "<h1>Urgent</h1>";
               priorityBtn.style.backgroundColor = "red";
           }
           if(clickedPriority ==="priority-medium"){
               priorityBtn.innerHTML = "<h1>Medium</h1>";
               priorityBtn.style.backgroundColor= "yellow";

           }
           if(clickedPriority === "priority-low"){
               priorityBtn.innerHTML = "<h1>Low</h1>";
               priorityBtn.style.backgroundColor = "greenyellow";
           }

    }