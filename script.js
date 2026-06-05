const form = document.getElementById('add-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

function addTask(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete-button';

    //Click the test to amrk done
    span.addEventListener('click', function() {
        li.classList.toggle('done');
    });

    //Click the x to remove the task
    deleteButton.addEventListener('click', function() {
        li.remove();        
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    list.appendChild(li);
}
//Listen for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading
    const text = input.value.trim();
    if (text === '') return;   // do not add empty tasks
    
    addTask(text);
    input.value = ''; // Clear the input field
    input.focus(); // Focus the input field for the next task
});

//save all tasks to local storage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            done: li.classList.contains('done')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage 
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (!saved) return; // No tasks to load
    JSON.parse(saved).forEach(function (task) {
        addTask(task.text);
        if (task.done) {
            list.lastChild.classList.add('done');
        }
     });
   }
     //call saveTasks whenever a task is added, marked done, or deleted
     list.addEventListener('click', saveTasks);
     form.addEventListener('submit', saveTasks);

     // Load tasks when the page loads
     loadTasks();


    