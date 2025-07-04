const body = document.querySelector('body');
const inputbox = document.querySelectorAll('input');
const tabicon = document.getElementById('favicon');


// Function to apply theme
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        tabicon.href = 'icons/dark.png';

        document.querySelectorAll('.task-list h1, .task-list p').forEach(el => {
            el.style.color = 'white';
        });

    } else {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        tabicon.href = 'icons/light.png';
        inputbox.forEach(input => {
            input.style.border = "1px solid black";
        });

        document.querySelectorAll('.task-list h1, .task-list p').forEach(el => {
            el.style.color = 'black';
        });

    }
}

// Initial theme based on system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
applyTheme(prefersDark.matches);

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
    applyTheme(e.matches);
});


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
         const inputbox = document.getElementById('title')
         const intputbox2 = document.getElementById('description')
         inputbox.classList.add('alert');
         intputbox2.classList.add('alert');
         inputbox.placeholder = "please enter title";
         intputbox2.placeholder = "Please enter description"
         setTimeout(function(){
            location.reload();
         },1000);
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
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

}

// Initial load
window.onload = displayTasks;
