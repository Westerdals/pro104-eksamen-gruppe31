//Henter counter til task-id fra localStorage for å unngå at flere får samme ved reload av side.
//Funksjonen setter igang telleren på 1 eller henter ut eksisterende
function initializeTaskIdCounter(){
    let taskIdCounter = JSON.parse(window.localStorage.getItem("taskIdCounter")) || 1;
    window.localStorage.setItem("taskIdCounter", JSON.stringify(taskIdCounter));
}

//Funksjon for å øke telleren i localstorage. Denne brukes hver gang en task legges til i localStorage
function incrementTaskIdCounter(){
    let taskIdCounter = JSON.parse(window.localStorage.getItem("taskIdCounter")); //Henter ut string fra localStorage og omgjør til tall
    parseInt(taskIdCounter); //Parser til int, failsafe hvis taskIdCounter noen gang skulle bli lagret som string
    taskIdCounter++;
    window.localStorage.setItem("taskIdCounter", JSON.stringify(taskIdCounter)); //Lagrer tilbake i localStorage (overwriter gamle objektet)
}

//Kaller på funksjoner
initializeTaskIdCounter();