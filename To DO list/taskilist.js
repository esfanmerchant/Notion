// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            createTaskElement(task.text, task.completed);
        });
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach((taskItem) => {
            const text = taskItem.querySelector("span").textContent;
            const completed = taskItem.classList.contains("completed");
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a task element
    function createTaskElement(taskText, completed = false) {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        if (completed) taskItem.classList.add("completed");

        // Add task text
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;
        taskItem.appendChild(taskSpan);

        // Add buttons for update, complete, and remove
        const taskButtons = document.createElement("div");
        taskButtons.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.innerHTML = "✔";
        completeButton.addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        const updateButton = document.createElement("button");
        updateButton.innerHTML = "✎";
        updateButton.addEventListener("click", () => {
            const newTask = prompt("Update task:", taskSpan.textContent);
            if (newTask) {
                taskSpan.textContent = newTask.trim();
                saveTasks();
            }
        });

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "✖";
        removeButton.addEventListener("click", () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(updateButton);
        taskButtons.appendChild(removeButton);
        taskItem.appendChild(taskButtons);

        taskList.appendChild(taskItem);
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = "";
    }

    // Event Listeners
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    // Initial load
    loadTasks();
});
