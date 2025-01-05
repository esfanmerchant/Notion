let timer;
let minutes = 0;
let seconds = 0;
let isRunning = false;

function updateDisplay() {
    const timeDisplay = document.getElementById("time");
    timeDisplay.innerText = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 1000);
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    updateDisplay();
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
}
