let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

let timer = 0;
let timerInterval = null;


// NAVIGATION
function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateProgress();
}


// SAVE DATA
function saveData() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}


// RUNNING
function saveRunning() {

    let distance = Number(document.getElementById("runDistance").value);
    let time = Number(document.getElementById("runTime").value);
    let calories = Number(document.getElementById("runCalories").value);

    if (!distance || !time) {
        alert("Please enter distance and time.");
        return;
    }

    let pace = time / distance;

    workouts.push({
        type: "Running",
        distance: distance,
        minutes: time,
        calories: calories
    });

    saveData();
    updateProgress();

    document.getElementById("runningResult").innerHTML =
        `🏃 Run saved!<br>
        Distance: ${distance} km<br>
        Time: ${time} minutes<br>
        Pace: ${pace.toFixed(2)} min/km<br>
        Calories: ${calories} kcal`;
}


// WEIGHT LIFTING
function saveLifting() {

    let exercise = document.getElementById("liftExercise").value;
    let sets = Number(document.getElementById("sets").value);
    let reps = Number(document.getElementById("reps").value);
    let weight = Number(document.getElementById("weight").value);

    if (!sets || !reps || !weight) {
        alert("Please complete all fields.");
        return;
    }

    workouts.push({
        type: "Weight Lifting",
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight,
        minutes: 0,
        calories: 0
    });

    saveData();
    updateProgress();

    document.getElementById("liftingResult").innerHTML =
        `🏋️ Workout saved!<br>
        ${exercise}<br>
        ${sets} sets × ${reps} reps<br>
        Weight: ${weight} kg`;
}


// BASIC EXERCISES
function saveBasic(exercise, inputId) {

    let reps = Number(document.getElementById(inputId).value);

    if (!reps) {
        alert("Please enter the number.");
        return;
    }

    workouts.push({
        type: exercise,
        reps: reps,
        minutes: 0,
        calories: 0,
        distance: 0
    });

    saveData();
    updateProgress();

    alert(`${exercise} saved!`);
}


// WALKING
function saveWalking() {

    let steps = Number(document.getElementById("steps").value);
    let distance = Number(document.getElementById("walkDistance").value);
    let time = Number(document.getElementById("walkTime").value);

    if (!steps || !distance || !time) {
        alert("Please complete all fields.");
        return;
    }

    let calories = Math.round(steps * 0.04);

    workouts.push({
        type: "Walking",
        steps: steps,
        distance: distance,
        minutes: time,
        calories: calories
    });

    saveData();
    updateProgress();

    document.getElementById("walkingResult").innerHTML =
        `🚶 Walk saved!<br>
        Steps: ${steps}<br>
        Distance: ${distance} km<br>
        Time: ${time} minutes<br>
        Calories: ${calories} kcal`;
}


// STRETCHING
function saveStretching() {

    workouts.push({
        type: "Stretching",
        minutes: 10,
        calories: 30,
        distance: 0
    });

    saveData();
    updateProgress();

    alert("🧘 Stretching completed!");
}


// CYCLING
function saveCycling() {

    let distance = Number(document.getElementById("cycleDistance").value);
    let time = Number(document.getElementById("cycleTime").value);
    let speed = Number(document.getElementById("cycleSpeed").value);

    if (!distance || !time) {
        alert("Please complete the fields.");
        return;
    }

    let calories = Math.round(distance * 25);

    workouts.push({
        type: "Cycling",
        distance: distance,
        minutes: time,
        speed: speed,
        calories: calories
    });

    saveData();
    updateProgress();

    alert("🚴 Cycling workout saved!");
}


// PROGRESS
function updateProgress() {

    let totalDistance = 0;
    let totalMinutes = 0;
    let totalCalories = 0;

    workouts.forEach(workout => {

        totalDistance += Number(workout.distance) || 0;
        totalMinutes += Number(workout.minutes) || 0;
        totalCalories += Number(workout.calories) || 0;

    });

    document.getElementById("totalWorkouts").textContent =
        workouts.length;

    document.getElementById("totalDistance").textContent =
        totalDistance.toFixed(1) + " km";

    document.getElementById("totalMinutes").textContent =
        totalMinutes + " min";

    document.getElementById("totalCalories").textContent =
        totalCalories + " kcal";

    updateGoal();
}


// FITNESS GOAL
function setGoal() {

    let goal = Number(document.getElementById("goal").value);

    if (!goal) {
        alert("Enter a goal.");
        return;
    }

    localStorage.setItem("fitnessGoal", goal);

    updateGoal();
}


function updateGoal() {

    let goal = Number(localStorage.getItem("fitnessGoal"));

    if (!goal) {
        return;
    }

    let completed = workouts.length;

    let percentage =
        Math.min((completed / goal) * 100, 100);

    document.getElementById("goalResult").innerHTML =
        `🎯 Goal: ${goal} workouts<br>
        Completed: ${completed}<br>
        Progress: ${percentage.toFixed(0)}%`;
}


// TIMER
function updateTimerDisplay() {

    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    document.getElementById("timerDisplay").textContent =
        `${minutes}:${seconds}`;
}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        timer++;

        updateTimerDisplay();

    }, 1000);
}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timer = 0;

    updateTimerDisplay();
}


// LOAD DATA
updateProgress();
updateTimerDisplay();