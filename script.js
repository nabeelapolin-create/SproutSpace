
const startButton = document.querySelector(".start-button");
const welcomeScreen = document.querySelector("#welcome-screen");
const workspace = document.querySelector("#workspace");

const homeButton = document.querySelector("#home-button");
const tasksButton = document.querySelector("#tasks-button");
const plannerButton = document.querySelector("#planner-button");
const notesButton = document.querySelector("#notes-button");
const goalsButton = document.querySelector("#goals-button");
const focusButton = document.querySelector("#focus-button");
const lofiButton = document.querySelector("#lofi-button");

startButton.addEventListener("click", function () {
    welcomeScreen.hidden = true;
    workspace.hidden = false;

    setActiveButton(homeButton);
    showHomeDashboard();
});


function showSection(label, title, message) {
    const dashboard = document.querySelector("#home-section");

    dashboard.innerHTML = `
        <p class="section-label">${label}</p>
        <h1>${title}</h1>
        <p>${message}</p>
    `;
}

function showHomeDashboard() {
    const dashboard = document.querySelector("#home-section");

    dashboard.innerHTML = `
        <p class="section-label">YOUR HOME</p>
        <h1>Good morning! 🌿</h1>
        <p>A little progress is still progress. Take today at your own pace.</p>

        <div class="home-summary">
            <div class="summary-card tasks-summary">
                <h3>✓ Tasks</h3>
                <p class="summary-number">0</p>
                <p>Tasks completed</p>
            </div>

            <div class="summary-card planner-summary">
                <h3>▦ Planner</h3>
                <p class="summary-highlight">Today</p>
                <p>Your schedule</p>
            </div>
        </div>

        <div class="home-panel">
            <h2>Today's priorities</h2>
            <p>Your important tasks will appear here.</p>
            <p class="priority-placeholder">＋ Add your first task</p>
        </div>

        <div class="home-panel goals-panel">
            <h2>♡ Your goals</h2>
            <p>Small steps lead to meaningful progress.</p>
        </div>
    `;
}

tasksButton.addEventListener("click", function () {
    setActiveButton(tasksButton);
    showTasksSection();
});

homeButton.addEventListener("click", function () {
    setActiveButton(homeButton);
    showHomeDashboard();
});

function showTasksSection() {
    const dashboard = document.querySelector("#home-section");

    dashboard.innerHTML = `
        <p class="section-label">YOUR SPACE</p>
        <h1>Tasks</h1>
        <p>Keep track of the things you need to do.</p>

        <div class="tasks-container">
            <h2>My tasks</h2>

            <form id="task-form">
                <input
                    type="text"
                    id="task-title"
                    placeholder="What do you need to do?"
                    required
                >

                <input
                    type="date"
                    id="task-date"
                    aria-label="Task due date"
                >

                <button type="submit">+ Add task</button>
            </form>

            <div id="task-list">
                <p>Your tasks will appear here.</p>
            </div>
        </div>
    `;

    setupTaskForm();
    displayTasks();
}

let tasks = JSON.parse(localStorage.getItem("sproutspaceTasks")) || [];

function displayTasks() {
    const taskList = document.querySelector("#task-list");

    if (!taskList) {
        return;
    }

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>Your tasks will appear here.</p>";
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        const taskName = document.createElement("span");
        taskName.textContent = task.title;
        taskItem.appendChild(taskName);

        if (task.date) {
            const taskDate = document.createElement("p");
            taskDate.textContent = "Due: " + task.date;
            taskItem.appendChild(taskDate);
        }

        taskList.appendChild(taskItem);
    });
}

function setupTaskForm() {
    const taskForm = document.querySelector("#task-form");
    const taskTitle = document.querySelector("#task-title");
    const taskDate = document.querySelector("#task-date");

    if (!taskForm) {
        return;
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = taskTitle.value.trim();

        if (title === "") {
            return;
        }

tasks.push({
    title: title,
    date: taskDate.value,
    completed: false
});

localStorage.setItem("sproutspaceTasks", JSON.stringify(tasks));

displayTasks();
        taskForm.reset();
    });
}



plannerButton.addEventListener("click", function () {
    setActiveButton(plannerButton);
    showSection(
        "YOUR SPACE",
        "Planner",
        "Organise your schedule and plan your days."
    );
});

notesButton.addEventListener("click", function () {
    setActiveButton(notesButton);
    showSection(
        "YOUR SPACE",
        "Notes",
        "Keep your thoughts and important information in one place."
    );
});

goalsButton.addEventListener("click", function () {
    setActiveButton(goalsButton);
    showSection(
        "YOUR SPACE",
        "Goals",
        "Set meaningful goals and celebrate your progress."
    );
});

focusButton.addEventListener("click", function () {
    setActiveButton(focusButton);
    showSection(
        "YOUR SPACE",
        "Focus",
        "Take a deep breath and give yourself time to concentrate."
    );
});

const lofiPlayer = document.querySelector("#lofi-player");
const closeLofiButton = document.querySelector("#close-lofi");

lofiButton.addEventListener("click", function () {
    lofiPlayer.hidden = !lofiPlayer.hidden;
});

closeLofiButton.addEventListener("click", function () {
    lofiPlayer.hidden = true;
});

function setActiveButton(activeButton) {
    const navButtons = document.querySelectorAll(".sidebar nav button");

    navButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    activeButton.classList.add("active");
}