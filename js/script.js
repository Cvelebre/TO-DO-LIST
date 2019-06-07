
// Prikaz sata 
var displayClock = function displayClock() {
    var now = new Date();
    var clock = document.querySelector("#clock");
    var hours = now.getHours() % 12;
    var minutes = now.getMinutes();
    var dayOrNight = '';

    if (hours.toString().length < 2) {
        hours = '0' + hours;
    }

    if (minutes.toString().length < 2) {
        minutes = '0' + minutes;
    }

    if (now.getHours() <= 12) {
        dayOrNight = 'AM';
    } else {
        dayOrNight = 'PM';
    }

    var clockOutput = hours + ' : ' + minutes + ' ' + dayOrNight;
    clock.textContent = clockOutput;

};

window.onload = clockFunction = function clockFunction() {
    displayClock();
    setInterval(displayClock, 1000);
};



//Upisivanje elemenata u varijable
var newTask = document.querySelector('#new-task');
var addTaskBtn = document.querySelector('#addTask');

var toDoUl = document.querySelector(".todo-list ul");
var completeUl = document.querySelector(".complete-list ul");



//Pravljenje liste za unos
var createNewTask = function (task) {

    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");

    label.innerText = task;
    checkBox.type = "checkbox";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    return listItem;
};



//Novi zadatak - nezavrsene obaveze
var addTask = function () {
    var listItem = createNewTask(newTask.value);
    toDoUl.appendChild(listItem);
    newTask.value = "";

    bindIncompleteItems(listItem, completeTask);
};


var completeTask = function () {

    var listItem = this.parentNode;
    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Избриши";
    deleteBtn.className = "delete";
    listItem.appendChild(deleteBtn);
    var checkBox = listItem.querySelector("input[type=checkbox]");
    checkBox.remove();
    completeUl.appendChild(listItem);
    bindCompleteItems(listItem, deleteTask);

};


//Brisanje obaveze
var deleteTask = function () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    ul.removeChild(listItem);
};


//Povezivanje neizvrsenih elmenata

var bindIncompleteItems = function (taskItem, checkBoxClick) {
    var checkBox = taskItem.querySelector("input[type=checkbox]");
    checkBox.onchange = checkBoxClick;
};


//Povezivanje izvrsenih elmenata
var bindCompleteItems = function (taskItem, deleteButtonPress) {
    var deleteButton = taskItem.querySelector(".delete");
    deleteButton.onclick = deleteButtonPress;
};


for (var i = 0; i < toDoUl.children.length; i++) {
    bindIncompleteItems(toDoUl.children[i], completeTask);
}

for (var i = 0; i < completeUl.children.length; i++) {
    bindCompleteItems(completeUl.children[i], deleteTask);
}


addTaskBtn.addEventListener("click", addTask);