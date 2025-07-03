const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const body = document.querySelector('body');
const inputbox = document.querySelectorAll('input');
const tabicon = document.getElementById('favicon');



//theme switch

if(!isDarkMode){
    body.classList.add("light-theme");
    tabicon.href = 'light.png';
    inputbox.forEach(input => {
        input.style.border = "1px solid black";
    });
}else{
    body.classList.add("dark-theme");
     tabicon.href = 'dark.png';
}

//add task logic

const button = document.querySelector('.button');

button.addEventListener('click', function(){
    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();

    if(title && description){

        let task = JSON.parse(localStorage.getItem('formData')) || [];

        const newTask = {
        title: title,
        description: description
    }
    task.push(newTask);
    console.log(task);
    localStorage.setItem('formData', JSON.stringify(task));
    document.getElementById('title').value ='';
    document.getElementById('description').value = '';
    displayTasks();
    }else{
        alert("please fill the entries!")
    }
})

function addTaskToDOM(titleText, descriptionText) {
    // Create main task-list div
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    // Create content div with title and description
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const h1 = document.createElement('h1');
    h1.textContent = titleText;

    const p = document.createElement('p');
    p.textContent = descriptionText;

    contentDiv.appendChild(h1);
    contentDiv.appendChild(p);

    // Create operation div with trash icon
    const operationDiv = document.createElement('div');
    operationDiv.classList.add('operation');

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash');
    trashIcon.setAttribute('aria-hidden', 'true');
    trashIcon.setAttribute('id', 'delete');

    // Optional: Add delete functionality
    trashIcon.addEventListener('click', () => {
        taskList.remove(); // remove this task from the DOM
    });

    trashIcon.addEventListener('click', () => {
            let tasks = JSON.parse(localStorage.getItem('formData')) || [];
            tasks.splice(index, 1); // delete from array
            localStorage.setItem('formData', JSON.stringify(tasks)); // update localStorage
            displayTasks(); // re-render list
        });

    operationDiv.appendChild(trashIcon);

    // Combine content and operation into task-list
    taskList.appendChild(contentDiv);
    taskList.appendChild(operationDiv);

    // Append task-list to the .list-items container
    const listItemsContainer = document.querySelector('.list-items');
    listItemsContainer.appendChild(taskList);
}

function displayTasks() {
    const listItemsContainer = document.querySelector('.list-items');
    listItemsContainer.innerHTML = ''; // clear previous entries

    const tasks = JSON.parse(localStorage.getItem('formData')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.title, task.description);
    });
}



window.onload = displayTasks();
