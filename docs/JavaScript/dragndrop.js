        //DRAG-N-DROP: Sørger for at arbeider-tekst blir kopiert
    function handleDragover(event){
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        
    }
    
        //DRAG-N-DROP: henter inn unik id til tasken man dropper worker, samt teksten fra elementet man dropper
    function handleOndrop(event){
        var taskListId = event.path[0].id;
        var teamMemberNameEl = event.dataTransfer.getData("text/plain");
        handleDragDropWorker(teamMemberNameEl, taskListId);
    }
    
        //DRAG-N-DROP: Vi bruker dataen på dragndrop og vi plasserer de i localStorage
    function handleDragDropWorker(teamMemberNameEl, taskListId){
        let projectAndPosition = taskListId.split("-");
        let taskList = JSON.parse(window.localStorage.getItem(projectAndPosition[0] + " TaskList")) || [];
        var taskWorker = document.querySelector("[id='"+ taskListId +"']");
        
        let taskPosition = parseInt(projectAndPosition[1]);
    
        // Ternary operator - sjekker om det eksisterer noe allerede i workers, og legger til komma hvis det stemmer
        let workerString = taskList[taskPosition].taskWorker ? taskList[taskPosition].taskWorker + ', ' + teamMemberNameEl : teamMemberNameEl;
    
        taskWorker.innerText = workerString;
        taskList[taskPosition].taskWorker = workerString;
        window.localStorage.setItem(projectAndPosition[0] + " TaskList", JSON.stringify(taskList));
    }