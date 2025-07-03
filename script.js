const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const body = document.querySelector('body');
const inputbox = document.querySelectorAll('input');
const tabicon = document.getElementById('favicon');

// Theme switch
if (!isDarkMode) {
    body.classList.add("light-theme");
    tabicon.href = 'light.png';
    inputbox.forEach(input => {
        input.style.border = "1px solid black";
    });
} else {
    body.classList.add("dark-theme");
    tabicon.href = 'dark.png';
}

// Add task logic
const button = document.querySelector('.button');

button.addEventListener('click', function () {
    let title = document.getElementById('title').value.trim();
    let description = document.getElementById('description').value.trim();

    if (title && description) {
        let tasks = JSON.parse(localStorage.getItem('formData')) || [];

        const newTask = {
            title: title,
            description: description
        };

        tasks.push(newTask);
        localStorage.setItem('formData', JSON.stringify(tasks));

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';

        displayTasks(); 
    } else {
        alert("Please fill the entries!");
    }
});

function addTaskToDOM(titleText, descriptionText, index) {
    const taskList = document.createElement('div');
    taskList.classList.add('task-list');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const h1 = document.createElement('h1');
    h1.textContent = titleText;

    const p = document.createElement('p');
    p.textContent = descriptionText;

    contentDiv.appendChild(h1);
    contentDiv.appendChild(p);

    const operationDiv = document.createElement('div');
    operationDiv.classList.add('operation');

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash');
    trashIcon.setAttribute('aria-hidden', 'true');
    trashIcon.setAttribute('id', 'delete');

    // ✅ Delete task using index
    trashIcon.addEventListener('click', () => {
        let tasks = JSON.parse(localStorage.getItem('formData')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(tasks));
        displayTasks(); // refresh UI
    });

    operationDiv.appendChild(trashIcon);
    taskList.appendChild(contentDiv);
    taskList.appendChild(operationDiv);

    const listItemsContainer = document.querySelector('.list-items');
    listItemsContainer.appendChild(taskList);
}

function displayTasks() {
    const listItemsContainer = document.querySelector('.list-items');
    listItemsContainer.innerHTML = ''; // clear previous entries

    const tasks = JSON.parse(localStorage.getItem('formData')) || [];
    tasks.forEach((task, index) => {
        addTaskToDOM(task.title, task.description, index);
    });
}

// Initial load
window.onload = displayTasks;
