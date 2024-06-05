let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startPauseBtn.textContent = 'Pause';
    isRunning = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = 'Start';
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    startPauseBtn.textContent = 'Start';
    isRunning = false;
    laps.innerHTML = '';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.innerHTML = `<img src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?fit=crop&w=20&q=80" alt="Lap Icon"> <span>${lapTime}</span>`;
    laps.appendChild(lapElement);
}
